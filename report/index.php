<?php
/**
* HTML report, with HTTP error code (500) to indicate test failure.
*
* @author Nick Freear, 15 January 2015.
* @copyright © 2015 The Open University.
*/
error_reporting( E_ALL );
ini_set( 'display_errors', 1 );
//header( 'Content-Type: text/html; charset=utf-8' );


$report_file = '../_out/report.json';
$report_html = 'spec.html';


$report_json = file_get_contents( $report_file );
$report = json_decode( $report_json );
if ($report && isset( $report->stats->passes )) {
  //$n_fail = count($report->failures);
  $n_fail = $report->stats->failures;
  $n_pass = $report->stats->passes;

  if ($n_fail) {
    header( 'HTTP/1.1 500 Internal Server Error' );
  }
  header( 'X-test-failures: '. $n_fail );
  header( 'X-test-passes: '. $n_pass );
  header( 'X-test-end: '   . $report->stats->end );
  header( 'X-test-stats: ' . json_encode( $report->stats ));
  header( 'X-test-json-file: ' . $report_file );
}
else {
  header( 'HTTP/1.1 503 Service Unavailable');
}


if (isset($_GET[ 'format' ]) && 'json' == $_GET[ 'format' ]) {
  @header( 'Content-Type: text/json; charset=utf-8' );
  echo $report_json;
}
else {
  require_once $report_html;
}

#End.
