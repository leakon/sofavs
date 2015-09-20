<?php
//ini_set("display_errors",1);
//ini_set("error_reporting",E_ALL&~E_NOTICE);
//session_cache_expire(30);
//session_start();

require_once( 'config.inc.php' );

header( "Content-Type: text/html; charset=utf-8" );

$sofav			= & new Sofav( $info );

//pr( $sofav->tables );

$smarty['config']	= PATH_SMARTY_HTML;
$smarty['html']		= PATH_SMARTY_HTML;
$smarty['compile']	= PATH_SMARTY_COMPILE;
$smarty['cache']	= PATH_SMARTY_CACHE;
$smarty['left_delimiter']	= '<{';
$smarty['right_delimiter']	= '}>';
$template		= & makeSmarty( $smarty );


$req			= $_REQUEST;

$req['userid']		= SofavUser::get_user_id();
$req['finsttime']	= time();
$info[SOFAV_TASK]	= $req[SOFAV_TASK];
$info[MYSOFAV]		= $sofav;

//pr( $sofav );

/*
$self			= get_php_self();
$info[F_TASK]		= $req[F_TASK];
$info[F_ACT]		= default_len( $req[F_ACT], 0 );

$_SESSION[NAME_PRO]	= array(
	SESS_USER	=> array(
		SESS_ID		=> 20,
		SESS_NAME	=> "leakon"
	)
);

$req['userid']		= $_SESSION[NAME_PRO][SESS_USER][SESS_ID];


*/
?>