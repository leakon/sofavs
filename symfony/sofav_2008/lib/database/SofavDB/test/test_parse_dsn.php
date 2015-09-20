<?php

require_once('require_test.php');

/*
	测试数据库连接 SofavDB_Connection
*/


$arrDsn		= array(
	'mysql://pma@localhost:3306/sofav?encoding=utf8&persistent=off',
	'mysql://root:123456@localhost:3306/sofav_2008?encoding=utf8&persistent=off',
);


foreach ($arrDsn as $dsn) {
	$res	= SofavDB_Connection::get($dsn);
#	var_dump($res);
}