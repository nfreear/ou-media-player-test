<?php
/**
* HTML report, with HTTP error code (500) to indicate test failure.
*
* @author Nick Freear, 15 January 2015.
* @copyright © 2015 The Open University.
*/
#error_reporting( E_ALL );
#ini_set( 'display_errors', 1 );
#header( 'Content-Type: text/html; charset=utf-8' );
header( 'Access-Control-Allow-Origin: *' );


#$report_file = '../_out/report.json';
$report_file = '../_out/report-spec.txt';
$report_html = 'spec.html';


function _parse_spec( $report_file ) {
  $stats = null;
  $report_spec = file_get_contents( $report_file );

  preg_match( '/(?<pass>\d+) passing \((?<time>\d+)s/', $report_spec, $m_pass );
  preg_match( '/(?<fail>\d+) failing/', $report_spec, $m_fail );

  if ($m_pass) {
    $fstat = stat( $report_file );

    $stats = (object) array(
      'passes' => $m_pass[ 'pass' ],
      'failures' => isset($m_fail[ 'fail' ]) ? $m_fail[ 'fail' ] : 0,
      'duration' => $m_pass[ 'time' ] * 1000,
      'end' => date( 'c', $fstat[ 'mtime' ]),
    );

    if ($stats->failures) {
      header( 'HTTP/1.1 503 Service Unavailable' );
    }
    header( 'X-test-stats: '. json_encode( $stats ));
    header( 'X-test-file: ' . $report_file );
  } else {
    header( 'HTTP/1.1 500 Internal Server Error' );
  }
  return $stats;
}


$stats = _parse_spec( $report_file );


function _NOT_IN_USE_parse_json_spec( $report_file ) {

$report_json = file_get_contents( $report_file );
$report = json_decode( $report_json );
if ($report && isset( $report->stats->passes )) {
  //$n_fail = count($report->failures);
  $n_fail = $report->stats->failures;
  $n_pass = $report->stats->passes;

  if ($n_fail) {
    header( 'HTTP/1.1 503 Service Unavailable' );
  }
  header( 'X-test-failures: '. $n_fail );
  header( 'X-test-passes: '. $n_pass );
  header( 'X-test-end: '   . $report->stats->end );
  header( 'X-test-stats: ' . json_encode( $report->stats ));
  header( 'X-test-json-file: ' . $report_file );
}
else {
  header( 'HTTP/1.1 500 Internal Server Error' );
}

  return $report_json;
}


if ('json' == _get( 'format' ) && isset( $report_json)) {
  @header( 'Content-Type: text/json; charset=utf-8' );
  echo $report_json;
}
else {
  require_once $report_html;
}

function _get($key, $default = null) {
  return isset($_GET[ $key ]) ? $_GET[ $key ] : $default;
}

#End.


