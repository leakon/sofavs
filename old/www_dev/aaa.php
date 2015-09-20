<?php
//ini_set("display_errors",1);
//ini_set("error_reporting",E_ALL&~E_NOTICE);
//session_cache_expire(30);
//session_start();

header( "Content-Type: text/html; charset=utf-8" );
define( "ENV_LOCAL",		"win" == substr( strtolower( PHP_OS ), 0, 3 ) );

if( ENV_LOCAL ) {	// ���ػ���
	define( "CHAR_RETURN", 		"\r\n" );
	define( "WINDOWS_PATH",		"D:/My Programs/xampp/htdocs/kk/" );
	define( "PATH_ABS_HOME",	WINDOWS_PATH . "code/leakon/sofav/" );		// ��������·��
	define( "PATH_ABS_BASE",	WINDOWS_PATH . "inc/" );			// ���ð���·��
	define( "PATH_ABS_INC",		PATH_ABS_HOME . "inc/" );			// ��Ŀ����·��
	define( "PATH_ABS_SMARTY_LIB",	WINDOWS_PATH . "app/smarty/libs/" );		// ģ�����·��
	
	define( "PATH_CLASS",		WINDOWS_PATH . "inc/" );
	
	
} else {  		// ����������
	define( "CHAR_RETURN", 		"\n" );
	define( "UNIX_PATH",		"/usr/home/leakon/" );
	define( "PATH_ABS_HOME",	UNIX_PATH );				// ��������·��
	define( "PATH_ABS_BASE",	PATH_ABS_HOME . "ver_1/inc/" );			// ���ð���·��
	define( "PATH_ABS_INC",		PATH_ABS_BASE );				// ��Ŀ����·��
	define( "PATH_ABS_SMARTY_LIB",	PATH_ABS_HOME . "smarty/libs/" );		// ģ�����·��
	
	define( "PATH_CLASS",		UNIX_PATH . "htdocs/inc/" );
	
}
	
/*
require_once( PATH_ABS_BASE . "leakon.php" );				// ȫ�ֺ���
require_once( PATH_ABS_BASE . "page.inc.php" );				// ��ҳ����
require_once( PATH_ABS_INC . "define.inc.php" );			// ��Ŀ�궨��
require_once( PATH_ABS_INC . "func.inc.php" );				// ��Ŀ����
require_once( PATH_ABS_INC . "show.inc.php" );				// ��Ŀ��ʾ
require_once( PATH_ABS_INC . "module.inc.php" );			// ��Ŀģ��
require_once( PATH_ABS_SMARTY_LIB . "Smarty.class.php" );		// ģ��������

require_once( PATH_ABS_INC . "DB/MDB2.php" );
require_once( PATH_ABS_INC . "DB/myQueryTool.php" );
require_once( PATH_ABS_INC . "database.inc.php" );

*/

require_once( PATH_CLASS . "leakon.php" );				// ȫ�ֺ���
require_once( PATH_CLASS . "class/simpleerror.class.php" );
require_once( PATH_CLASS . "class/simpledb.class.php" );

/*
$tpl			= createSmartyInstance( PATH_ABS_SMARTY_HTML, PATH_ABS_SMARTY_CACHE );
$self			= get_php_self();
$req			= $_REQUEST;
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