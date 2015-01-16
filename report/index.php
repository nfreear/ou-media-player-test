<?php
/**
* HTML report, with HTTP error code (500) to indicate test failure.
*
* @author Nick Freear, 15 January 2015.
* @copyright © 2015 The Open University.
*/

#$report_file = '../_out/report.json';
$report_file = '../_out/report-spec.txt';
$report_html = 'spec.html';


function _parse_test_spec( $report_file ) {
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
    $stats->test = $stats->passes + $stats->failures;

    _test_spec_headers( $stats, $report_file );

  } else {
    header( 'HTTP/1.1 500 Internal Server Error' );
  }
  return $stats;
}

function _NOT_IN_USE_parse_json_spec( $report_file ) {
  $stats = null;
  $report_json = file_get_contents( $report_file );
  $report = json_decode( $report_json );
  if ($report && isset( $report->stats->passes )) {

    _test_spec_headers( $report->stats, $report_file );

  } else {
    header( 'HTTP/1.1 500 Internal Server Error' );
  }
  return $report_json;
}

function _test_spec_headers( $stats, $report_file ) {
  if ($stats->failures) {
    header( 'HTTP/1.1 503 Service Unavailable' );
  }
  header( 'X-test-passes: '. $stats->passes );
  header( 'X-test-failures: '. $stats->failures );
  header( 'X-test-end: '   . $stats->end );
  header( 'X-test-stats: '. json_encode( $stats ));
  header( 'X-test-file: ' . $report_file );

  header( 'Access-Control-Allow-Origin: *' );
}


_parse_test_spec( $report_file );


if ('json' == _get( 'format' ) && isset( $report_json )) {
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
