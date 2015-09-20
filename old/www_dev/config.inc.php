<?php

define( 'ENVIRONMENT_DEVELOP',			-1 );	//	开发环境
define( 'ENVIRONMENT_ONLINE',			0 );	//	正式环境
define( 'ENVIRONMENT_BETA',			1 );	//	测试环境

require_once( 'env.inc.php' );				//	环境

if( CURRENT_ENVIRONMENT === ENVIRONMENT_DEVELOP ) {	//	开发环境
	
	define( 'PATH_ROOT',			'D:/My Programs/xampp/htdocs/kk/' );
	define( 'PATH_BASE_INC',		PATH_ROOT	. 'inc/' );			//	基础库路径
	define( 'PATH_BASE_CLASS',		PATH_BASE_INC	. 'class/' );			//	基础类路径
	define( 'PATH_SMARTY_LIBS',		PATH_ROOT	. 'app/smarty/libs/' );		//	Smarty库路径
	
	define( 'PATH_HOME',			PATH_ROOT	. 'code/leakon/sofav/' );	//	项目路径
	define( 'PATH_HOME_INC',		PATH_HOME	. 'inc/' );			//	项目库路径
	define( 'PATH_FILES',			PATH_HOME	. 'files/' );			//	资源文件路径
	define( 'PATH_HOME_INC_LOG',		PATH_HOME_INC	. 'log/' );			//	日志路径
	
	define( 'PATH_SMARTY_TPL',		PATH_HOME	. 'templates/' );		//	模板路径
	define( 'PATH_SMARTY_HTML',		PATH_SMARTY_TPL	. 'dev_html/' );		//	模板HTML路径
	define( 'PATH_SMARTY_COMPILE',		PATH_SMARTY_TPL	. 'dev_compile/' );		//	模板编译路径
	define( 'PATH_SMARTY_CACHE',		PATH_SMARTY_TPL . 'dev_cache/' );		//	模板缓存路径
	
	define( 'DOMAIN',			'http://www.sofav.com/' );			//	域名
	define( 'DOMAIN_FILES',			'http://files.sofav.com/' );			//	资源文件域名
	
}

require_once( PATH_SMARTY_LIBS	. 'Smarty.class.php' );		//	模板类
require_once( PATH_HOME_INC	. 'database.inc.php' );		//	数据库类

require_once( PATH_BASE_INC	. 'leakon.php' );		//	全局函数
require_once( PATH_BASE_INC	. 'page.inc.php' );		//	翻页函数
require_once( PATH_HOME_INC	. 'define.inc.php' );		//	项目宏定义
require_once( PATH_HOME_INC	. 'func.inc.php' );		//	项目函数
require_once( PATH_HOME_INC	. 'show.inc.php' );		//	项目显示
require_once( PATH_HOME_INC	. 'module.inc.php' );		//	项目模块

require_once( PATH_HOME_INC	. 'sofav.class.php' );
require_once( PATH_HOME_INC	. 'sofav_error.class.php' );

$database_config[ENVIRONMENT_DEVELOP]['host']	= 'localhost';
$database_config[ENVIRONMENT_DEVELOP]['user']	= 'root';
$database_config[ENVIRONMENT_DEVELOP]['pass']	= '123456';
$database_config[ENVIRONMENT_DEVELOP]['db']	= 'sofav';
$database_config[ENVIRONMENT_DEVELOP]['char_set']	= 'utf8';
//$database_config[ENVIRONMENT_DEVELOP]['debug_mode']	= true;		//	显示 SQL

?>