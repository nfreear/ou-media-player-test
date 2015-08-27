<?php
/**
* HTML report, with HTTP error code (500) to indicate test failure.
*
* @author Nick Freear, 15 January 2015.
* @copyright © 2015 The Open University.
*/

require_once 'TestReportParser.php';


$parser = new \Nfreear\Open_Media_Player_Test\TestReportParser();

$parser->parse_test_spec( REPORT_FILE );


if ('json' == $parser->get( 'format' ) && isset( $report_json )) {
  header( 'Content-Type: text/json; charset=utf-8' );
  echo $report_json;
}
else {
  require_once REPORT_HTML;
}

//End.
