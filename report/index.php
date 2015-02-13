<?php
/**
* HTML report, with HTTP error code (500) to indicate test failure.
*
* @author Nick Freear, 15 January 2015.
* @copyright © 2015 The Open University.
*/

#$report_file = '../_out/report.json';
define( 'REPORT_FILE', '../_out/report-spec.txt' );
define( 'REPORT_HTML', 'spec.html' );


function _parse_test_spec( $report_file ) {
  $stats = _init_stats( $report_file );
  $report_spec = file_get_contents( $report_file );

  preg_match( '/(?<pass>\d+) passing \((?<time>\d+)s/', $report_spec, $m_pass );
  preg_match( '/(?<fail>\d+) failing/', $report_spec, $m_fail );

  if ($m_pass) {

    $stats->passes   = $m_pass[ 'pass' ];
    $stats->failures = isset($m_fail[ 'fail' ]) ? $m_fail[ 'fail' ] : 0;
    $stats->duration = $m_pass[ 'time' ] * 1000;
    $stats->test = $stats->passes + $stats->failures;

    _test_spec_headers( $stats, $report_file );

  } else {
    header( 'HTTP/1.1 500 Internal Server Error' );

    _test_spec_headers( $stats );
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

function _test_spec_headers( $stats, $report_file = null ) {
  if ($stats->failures) {
    header( 'HTTP/1.1 503 Service Unavailable' );
  }
  header( 'X-test-passes: '  . _int( $stats->passes ));
  header( 'X-test-failures: '. _int( $stats->failures ));
  header( 'X-test-end: '  . _str( $stats->end ));  //Date.
  header( 'X-test-stats: '. json_encode( $stats ));
  header( 'X-test-file: ' . _str( $report_file ));

  header( 'Access-Control-Allow-Origin: *' );
}

function _init_stats( $report_file ) {
  $fstat = stat( $report_file );

  return (object) array(
    'passes' => null,
    'failures' => null,
    'duration' => null,
    'end' => date( 'c', $fstat[ 'mtime' ]),
    'test' => null,
  );
}


_parse_test_spec( REPORT_FILE );


if ('json' == _get( 'format' ) && isset( $report_json )) {
  header( 'Content-Type: text/json; charset=utf-8' );
  echo $report_json;
}
else {
  require_once REPORT_HTML;
}



function _get( $key, $default = null ) {
  $value = filter_input( INPUT_GET, $key, FILTER_SANITIZE_STRING );
  return $value ? $value : $default;
}
function _int( $value ) {
  return filter_var( $value, FILTER_VALIDATE_INT );
}
function _str( $value ) {
  return filter_var( $value, FILTER_SANITIZE_STRING );
}

#End.
