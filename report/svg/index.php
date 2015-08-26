<?php
/**
* SVG badge.
*
* @author Nick Freear, 26 August 2015.
* @copyright © 2015 The Open University.
*
* @link https://img.shields.io/badge/integration-passing-brightgreen.svg
* @link https://img.shields.io/badge/integration-failing-red.svg
*/

require_once '../TestReportParser.php';


$parser = new \Nfreear\Open_Media_Player_Test\TestReportParser( $is_html = false );

$stats = $parser->parse_test_spec( REPORT_FILE );


header( 'Content-Type: image/svg+xml; charset=utf-8' );
//Content-Encoding:gzip


if ($stats->failures):
    ?>
<svg xmlns="http://www.w3.org/2000/svg" width="115" height="20">
<linearGradient id="b" x2="0" y2="100%"><stop offset="0" stop-color="#bbb" stop-opacity=".1"/><stop offset="1" stop-opacity=".1"/></linearGradient>
<mask id="a"><rect width="115" height="20" rx="3" fill="#fff"/></mask>
<g mask="url(#a)">
<path fill="#555" d="M0 0h71v20H0z"/><path fill="#e05d44" d="M71 0h44v20H71z"/><path fill="url(#b)" d="M0 0h115v20H0z"/></g>
<g fill="#fff" text-anchor="middle" font-family="DejaVu Sans,Verdana,Geneva,sans-serif" font-size="11"><text x="35.5" y="15" fill="#010101" fill-opacity=".3">integration</text>
<text x="35.5" y="14">integration</text><text x="92" y="15" fill="#010101" fill-opacity=".3">failing</text><text x="92" y="14">failing</text></g>
</svg>
<?php

else: // "Passing"

    ?>
<svg xmlns="http://www.w3.org/2000/svg" width="124" height="20">
<linearGradient id="b" x2="0" y2="100%"><stop offset="0" stop-color="#bbb" stop-opacity=".1"/><stop offset="1" stop-opacity=".1"/></linearGradient>
<mask id="a"><rect width="124" height="20" rx="3" fill="#fff"/></mask>
<g mask="url(#a)">
<path fill="#555" d="M0 0h71v20H0z"/><path fill="#4c1" d="M71 0h53v20H71z"/><path fill="url(#b)" d="M0 0h124v20H0z"/></g>
<g fill="#fff" text-anchor="middle" font-family="DejaVu Sans,Verdana,Geneva,sans-serif" font-size="11"><text x="35.5" y="15" fill="#010101" fill-opacity=".3">integration</text>
<text x="35.5" y="14">integration</text><text x="96.5" y="15" fill="#010101" fill-opacity=".3">passing</text><text x="96.5" y="14">passing</text></g>
</svg>
<?php

endif;

//End.
