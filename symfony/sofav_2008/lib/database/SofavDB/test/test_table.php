<?php

require_once('require_test.php');

/*
	测试数据模型 SofavDB_Table
*/

/*
classxx UserBase extends SofavDB_Table {

	public function setUp() {
		$this->arrFields[]	= 'created_time';
		$this->arrFields[]	= 'username';
		$this->arrFields[]	= 'password';
		$this->arrFields[]	= 'nickname';
		$this->arrFields[]	= 'email';
	}

}

classxx User extends UserBase {

}
*/

echo time();
echo "\n";
for ($i = 0; $i < 800000; ++$i) {
	$strangeString	= "'";
	$res = SofavDB_Sql::e($strangeString, DSN_SF_08);
}
echo time();
var_dump($res);



$user	= new User();

$user->username = 'leakon_' . time() . '_' . rand(1000, 9999);
var_dump($user->username);
#print_r($user);



#$user->phone = '13800138000';
#var_dump($user->phone);


$user->save();
