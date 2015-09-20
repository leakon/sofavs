<?php
define('BASE_DIR_OF_SOFAVDB',	realpath( dirname(__FILE__) ) . '/');
function SofavDB_AutoLoader($className) {
	if (file_exists($file = BASE_DIR_OF_SOFAVDB . 'lib/' . $className . '.php')) {
		require_once($file);
	}
}
spl_autoload_register('SofavDB_AutoLoader');