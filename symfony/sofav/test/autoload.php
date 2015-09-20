<?php

function __autoload($className) {

	ini_set('include_path', ini_get('include_path') . PATH_SEPARATOR . '/opt/lampp/lib/php/symfony/vendor/');
	ini_set('include_path', ini_get('include_path') . PATH_SEPARATOR . dirname(__FILE__).'/../');

	$classMapping = require_once(dirname(__FILE__).'/../cache/front/dev/config/config_autoload.yml.php');

	if ('Propel' == $className) {
		require_once('/opt/lampp/lib/php/symfony/vendor/propel/Propel.php');
		return;
	}

	if (!empty($classMapping[$className])) {
		require_once($classMapping[$className]);
	}
}