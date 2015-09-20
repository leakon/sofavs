<?php

define('SF_ROOT_DIR',    realpath(dirname(__FILE__).'/..'));
define('SF_APP',         'front');
define('SF_ENVIRONMENT', 'cli');
define('SF_DEBUG',       false);

require_once(SF_ROOT_DIR.DIRECTORY_SEPARATOR.'apps'.DIRECTORY_SEPARATOR.SF_APP.DIRECTORY_SEPARATOR.'config'.DIRECTORY_SEPARATOR.'config.php');

# This is needed to initialize the db connections
sfContext::getInstance()->getDatabaseManager()->initialize();



$SQLSelect	= sprintf('select * from tags where id = %d', rand(1, 400000));
$res		= SimpleDB::fetchAll($SQLSelect);

$userTable = Doctrine::getTable('Tag');



$select = Doctrine_Query::create()
           ->from('Tag')
           ->addWhere('id = ?', array(rand(1, 400000)))->execute();



echo	"\n-------\nBegin\n";
$timeBegin	= time();
for ($j = 0; $j < 4000; $j++) {

/*
	$user = Doctrine_Query::create()
		->from('Tag')
		->addWhere('id = ?', array(rand(1, 400000)))->execute();
*/

#	$user = $userTable->find(rand(1, 400000))->toArray();

	$SQLSelect	= sprintf('select * from tags where id = %d', rand(1, 400000));
	$user		= SimpleDB::fetchAll($SQLSelect);

	unset($user);

}

$timeEnd	= time();

$i	= 1;
echo	"\nExecute " . ($i * $j) . " times, use " . ($timeEnd - $timeBegin) . " seconds.\n";
echo	"\nPerformance: " . intval(($i * $j) / ($timeEnd - $timeBegin)) . "/s \n";


#print_r($user);

