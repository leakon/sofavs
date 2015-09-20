<?php

define( 'ENVIRONMENT_DEVELOP',			-1 );	//	��������
define( 'ENVIRONMENT_ONLINE',			0 );	//	��ʽ����
define( 'ENVIRONMENT_BETA',			1 );	//	���Ի���

require_once( 'env.inc.php' );				//	����

if( CURRENT_ENVIRONMENT === ENVIRONMENT_DEVELOP ) {	//	��������
	
	define( 'PATH_ROOT',			'D:/My Programs/xampp/htdocs/kk/' );
	define( 'PATH_BASE_INC',		PATH_ROOT	. 'inc/' );			//	������·��
	define( 'PATH_BASE_CLASS',		PATH_BASE_INC	. 'class/' );			//	������·��
	define( 'PATH_SMARTY_LIBS',		PATH_ROOT	. 'app/smarty/libs/' );		//	Smarty��·��
	
	define( 'PATH_HOME',			PATH_ROOT	. 'code/leakon/sofav/' );	//	��Ŀ·��
	define( 'PATH_HOME_INC',		PATH_HOME	. 'inc/' );			//	��Ŀ��·��
	define( 'PATH_FILES',			PATH_HOME	. 'files/' );			//	��Դ�ļ�·��
	define( 'PATH_HOME_INC_LOG',		PATH_HOME_INC	. 'log/' );			//	��־·��
	
	define( 'PATH_SMARTY_TPL',		PATH_HOME	. 'templates/' );		//	ģ��·��
	define( 'PATH_SMARTY_HTML',		PATH_SMARTY_TPL	. 'dev_html/' );		//	ģ��HTML·��
	define( 'PATH_SMARTY_COMPILE',		PATH_SMARTY_TPL	. 'dev_compile/' );		//	ģ�����·��
	define( 'PATH_SMARTY_CACHE',		PATH_SMARTY_TPL . 'dev_cache/' );		//	ģ�建��·��
	
	define( 'DOMAIN',			'http://www.sofav.com/' );			//	����
	define( 'DOMAIN_FILES',			'http://files.sofav.com/' );			//	��Դ�ļ�����
	
}

require_once( PATH_SMARTY_LIBS	. 'Smarty.class.php' );		//	ģ����
require_once( PATH_HOME_INC	. 'database.inc.php' );		//	���ݿ���

require_once( PATH_BASE_INC	. 'leakon.php' );		//	ȫ�ֺ���
require_once( PATH_BASE_INC	. 'page.inc.php' );		//	��ҳ����
require_once( PATH_HOME_INC	. 'define.inc.php' );		//	��Ŀ�궨��
require_once( PATH_HOME_INC	. 'func.inc.php' );		//	��Ŀ����
require_once( PATH_HOME_INC	. 'show.inc.php' );		//	��Ŀ��ʾ
require_once( PATH_HOME_INC	. 'module.inc.php' );		//	��Ŀģ��

require_once( PATH_HOME_INC	. 'sofav.class.php' );
require_once( PATH_HOME_INC	. 'sofav_error.class.php' );

$database_config[ENVIRONMENT_DEVELOP]['host']	= 'localhost';
$database_config[ENVIRONMENT_DEVELOP]['user']	= 'root';
$database_config[ENVIRONMENT_DEVELOP]['pass']	= '123456';
$database_config[ENVIRONMENT_DEVELOP]['db']	= 'sofav';
$database_config[ENVIRONMENT_DEVELOP]['char_set']	= 'utf8';
//$database_config[ENVIRONMENT_DEVELOP]['debug_mode']	= true;		//	��ʾ SQL

?>