<?php namespace Nfreear\Open_Media_Player_Test;
/**
* HTML report, with HTTP error code (500) to indicate test failure.
*
* @author Nick Freear, 15 January 2015.
* @copyright © 2015 The Open University.
*/


error_reporting( E_ALL );
ini_set( 'display_errors', 1);

#$report_file = '../_out/report.json';
define( 'REPORT_FILE', __DIR__ . '/../_out/report-spec.txt' );
define( 'REPORT_HTML', __DIR__ . '/spec.html' );


class TestReportParser {

  protected $is_html = true;
  protected $stats;

  public function __construct($is_html = true)
  {
    $this->is_html = $is_html;
  }

  public function has_passed()
  {
    $stats = $this->stats;
    return $stats && $stats->passes && ! $stats->failures;
  }

  public function parse_test_spec( $report_file ) {
    $stats = $this->init_stats( $report_file );
    $report_spec = file_get_contents( $report_file );

    preg_match( '/(?<pass>\d+) passing \((?<time>\d+)s/', $report_spec, $m_pass );
    preg_match( '/(?<fail>\d+) failing/', $report_spec, $m_fail );

    if ($m_pass) {

      $stats->passes   = $m_pass[ 'pass' ];
      $stats->failures = isset($m_fail[ 'fail' ]) ? $m_fail[ 'fail' ] : 0;
      $stats->duration = $m_pass[ 'time' ] * 1000;
      $stats->test = $stats->passes + $stats->failures;

      $this->test_spec_headers( $stats, $report_file );

    } else {
      if ($this->is_html) {
        header( 'HTTP/1.1 500 Internal Server Error' );
      }

      $this->test_spec_headers( $stats );
    }
    $this->stats = $stats;
    return $stats;
  }

  protected function NOT_IN_USE_parse_json_spec( $report_file ) {
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

  protected function test_spec_headers( $stats, $report_file = null ) {
    if ($stats->failures) {
      header( 'HTTP/1.1 503 Service Unavailable' );
    }
    header( 'X-test-passes: '  . $this->int( $stats->passes ));
    header( 'X-test-failures: '. $this->int( $stats->failures ));
    header( 'X-test-end: '  . $this->str( $stats->end ));  //Date.
    header( 'X-test-stats: '. json_encode( $stats ));
    header( 'X-test-file: ' . $this->str( $report_file ));

    header( 'Access-Control-Allow-Origin: *' );
  }

  protected function init_stats( $report_file ) {
    $fstat = stat( $report_file );

    return (object) array(
      'passes' => null,
      'failures' => null,
      'duration' => null,
      'end' => date( 'c', $fstat[ 'mtime' ]),
      'test' => null,
    );
  }


  public function get( $key, $default = null ) {
    $value = filter_input( INPUT_GET, $key, FILTER_SANITIZE_STRING );
    return $value ? $value : $default;
  }

  protected function int( $value ) {
    return filter_var( $value, FILTER_VALIDATE_INT );
  }

  protected function str( $value ) {
    return filter_var( $value, FILTER_SANITIZE_STRING );
  }
}
