<?php
require_once(dirname(__FILE__) . '/../SofavDB_AutoLoad.php');
$configDir	= dirname(__FILE__) . '/../config/';
$replacement	= 'PATH_OF_CURRENT_DIR';
$key		= 'build_model';
define('BASE_MODEL',	'SofavDB_Model');
define('BASE_TABLE',	'SofavDB_TABLE');

/**
 * Useage:
 *		php build_model.php sofav2008
 *
 */

$configName	= isset($argv[1]) ? trim($argv[1]) : false;
if (false === $configName) {
	die(sprintf("\nNeed config name."));
}

$configFile	= $configDir . $configName . '.ini';
if (!file_exists($configFile)) {
	die(sprintf("\nCan not find config file."));
}

$arrConf	= parse_ini_file($configFile, false);

$dsn		= isset($arrConf['dsn']) ? trim($arrConf['dsn']) : false;
$model_dir	= isset($arrConf['model_dir']) ? trim($arrConf['model_dir']) : false;

if (false === $dsn || false === $model_dir) {
	die(sprintf("\nValue of dsn or model_dir is not valid."));
}

$model_dir	= str_replace($replacement, dirname(__FILE__) . '/../config', $model_dir);
$modelDirName	= realpath($model_dir);

if (false === $modelDirName) {
	die(sprintf("\nThe value of model_dir is not valid."));
}

SofavDB_Manage::addDsn($key, $dsn);

$q	= new SofavDB_Sql();
$res	= $q->rawSql(sprintf("show tables"))->fetchAll();

foreach ((array) $res as $record) {

	foreach ($record as $key => $tableName) {

		$className	= ucfirst($tableName);


		$resDesc	= $q->rawSql(sprintf("desc %s", $tableName))->fetchAll();
		$arrColumns	= array();

		foreach ((array) $resDesc as $idx => $colItem) {
			$arrColumns[]	= $colItem['Field'];
		}

		$strBaseClass	= makeBaseClass($tableName, $className, $arrColumns);
		$strClass	= makeClass($className, $className);
		$strPeer	= makePeer($className);

		$fileClass	= sprintf("%s/%s.php", $modelDirName, $className);
		$filePeer	= sprintf("%s/%sPeer.php", $modelDirName, $className);
		$fileBaseClass	= sprintf("%s/base/%sBase.php", $modelDirName, $className);

		if (!file_exists($fileClass)) {
			file_put_contents($fileClass, $strClass);
			print_r($fileClass . "\n");
		}

		file_put_contents($fileBaseClass, $strBaseClass);
		print_r($fileBaseClass . "\n");

		if (!file_exists($filePeer)) {
			file_put_contents($filePeer, $strPeer);
			print_r($filePeer . "\n");
		}


	#	print_r($str1);
	#	print_r($str2);



	}

}



function makeBaseClass($tableName, $className, $arrColumns) {

	$arrPHP		= array();

	$arrPHP[]	= "<?php\n";
	$arrPHP[]	= sprintf("class %sBase extends %s {\n", $className, BASE_MODEL);
	$arrPHP[]	= sprintf("	public function setUp() {\n");

	foreach ((array) $arrColumns as $key => $colName) {
		$arrPHP[]	= sprintf("		\$this->arrFields[]	= '%s';", $colName);
	}

	$arrPHP[]	= sprintf("\n		\$this->tableName	= '%s';\n", $tableName);
	$arrPHP[]	= sprintf("	}\n}");

	return		implode("\n", $arrPHP);

}


function makeClass($className) {

	$arrPHP		= array();

	$arrPHP[]	= "<?php\n";
	$arrPHP[]	= sprintf("class %s extends %sBase {\n", $className, $className);
	$arrPHP[]	= sprintf("}");

	return		implode("\n", $arrPHP);
}


function makePeer($className) {

	$arrPHP		= array();

	$arrPHP[]	= "<?php\n";
	$arrPHP[]	= sprintf("class %sPeer extends %s {\n", $className, BASE_TABLE);
	$arrPHP[]	= sprintf("}");

	return		implode("\n", $arrPHP);
}
