<?php
require_once( "sofav.inc.php" );

$assign			= array();
$assign['index']	= "show_index";
$assign['search']	= "show_add";
$assign['myfav']	= "show_add";
$assign['add']		= "show_add";
$assign['import']	= "show_add";
$assign['export']	= "show_add";
$assign['option']	= "show_add";
if( !isset($assign[$info[F_TASK]]) ) {
	$info[F_TASK]		= "index";
}

$info[TPL_MAIN]				= "main.html";
$info['nav_curr'][$info[F_TASK]]	= ' class="nav_curr"';
$call_func				= $assign[$info[F_TASK]];

$info					= call_user_func_array( $call_func, array( $info, $req, $options ) );
require_once( "foot.inc.php" );
?>