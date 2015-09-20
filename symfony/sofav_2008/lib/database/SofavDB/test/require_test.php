<?php
require_once(dirname(__FILE__) . '/../SofavDB_AutoLoad.php');

define('DSN_SF_08', 'mysql://root:123456@localhost:3306/sofav_2008?encoding=utf8');

$strDataSourceList	= file_get_contents('test_manage.yml');
$arrDataSourceList	= SofavDB_Manage::loadDataSource($strDataSourceList);
SofavDB_Manage::setRecentDsn('second');

function hr() {
	echo	"\n------------------------------------------\n";
}

class UserBaseTest extends SofavDB_Model {

	public function setUp() {

		$this->arrFields[]	= 'created_time';
		$this->arrFields[]	= 'username';
		$this->arrFields[]	= 'password';
		$this->arrFields[]	= 'nickname';
		$this->arrFields[]	= 'email';

		$this->tableName	= 'users';
	}

}

class UserTest extends UserBaseTest {

}

