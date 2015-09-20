<?php

require_once( "sofav.inc.php" );

$assign				= array();
$assign['mylist']		= "show_mylist";
$assign['post']			= "show_post";
$assign['batch_insert']		= "batch_insert";
$assign['batch_list']		= "batch_list";
if( !isset($assign[$info[SOFAV_TASK]]) ) {
	$info[SOFAV_TASK]	= "post";
}

$call_func		= $assign[$info[SOFAV_TASK]];
$info			= & call_user_func_array( $call_func, array( $info, $req, $options ) );

showSmarty( $template, $info, SOFAV_FRAME );

?>