<?php

require_once('require_test.php');

/*
	测试数据模型 SofavDB_Sql
*/


$q	= new SofavDB_Sql();

$q->select('*')
	->from('user')
	->addWhere("username LIKE '%s' AND email LIKE '%s'", "l'eakon", "gmail")
	->addOrderBy("username ASC, id DESC")
	->addLimit("%s, %s", 20, 10);

$q->execute();


$newArr		= array(

	'username'	=> "llk's book",
	'passowrd'	=> md5(time() . rand(0, 999999)),
	'age'		=> 23,

);

$q->update('user')
	->addSet($newArr)
	->addWhere("id = %d", rand(1, 100));

$q->execute();


$q->insert('user')
	->addSet($newArr);
$q->execute();



