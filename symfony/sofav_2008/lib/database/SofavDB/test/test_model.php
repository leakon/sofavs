<?php

require_once('require_test.php');

/*
	测试数据模型 SofavDB_Model
*/

$user	= new User();

$user->username = 'leakon_' . time() . '_' . rand(1000, 9999);
$user->nickname	= "Leakon's Nick Name";
print_r($user);

#$user->phone = '13800138000';
#var_dump($user->phone);
$user->save();

print_r($user);

exit;

hr();
$user	= new User(20);
print_r($user);


hr();
$user	= new User();
$user->findOne("id = %s AND username LIKE '%s%s%s' ", 21, '%', 'k', '%');
print_r($user);


hr();
$user	= new User();
#$res		= $user->findAll("id = %s AND username LIKE '%s%s%s' ", 21, '%', 'k', '%');
$res		= $user->findAllObj("id = %s OR username LIKE '%s%s%s' ", 21, '%', 'dd', '%');
print_r($res);
