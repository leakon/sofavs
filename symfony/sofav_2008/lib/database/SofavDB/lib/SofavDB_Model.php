<?php

/**
 * Model
 *
 * @package     SofavDB
 * @subpackage  Model
 * @link        www.leakon.com
 * @version     2008-05-14
 * @author      Leakon <leakon@gmail.com>
 */
abstract class SofavDB_Model {

	protected
		$id			= null,		// id is inner property, can not be set through __set()
		$tableName		= '',
		$arrFields		= array(),
		$arrModifiedFields	= array();


/*
	// implement in sub class
	public function setUp() {

		$this->tableName	= 'users';

		$this->arrFields[]	= 'created_time';
		$this->arrFields[]	= 'username';
		$this->arrFields[]	= 'password';
		$this->arrFields[]	= 'nickname';
		$this->arrFields[]	= 'email';
	}
*/
	abstract function setUp();


	/**
	 * Get table name.
	 *
	 * It's useful when you have data stored on multiple table, like data_0, data_1, ..., data_15
	 * You can redefine your hash logic which get the real table to handle.
	 */
	protected function getTableName() {
		return	$this->tableName;
	}


	public function __construct($id = null) {

		$this->setUp();

		if ($id) {
			$this->findOne("id = %s", $id);
		}

		return	$this;
	}


	/**
	 * Find one record
	 *
	 * Example:
	 *		$user	= new User();
	 *		$user->findOne("id = %s AND username LIKE '%s%s%s'", 26, '%', 'leakon', '%');
	 		// equals to "id = 26 AND username LIKE '%leakon%'"
	 *		print_r($user);
	 *
	 * Notice:
	 		It's not necessary to escape the value.
	 		The value will be escaped in SofavDB_Sql.
	 *
	 */
	public function findOne() {

		$q	= new SofavDB_Sql();

		$q->select('*')->from($this->getTableName());

		$args	= func_get_args();

		call_user_func_array(array($q, 'addWhere'), $args);

		$arrOneRecored	= $q->execute()->fetchOne();

		if (!empty($arrOneRecored['id'])) {
			$this->hydrate($arrOneRecored);
		}

		return	$this;
	}


	public function findAll() {

		$q	= new SofavDB_Sql();

		$q->select('*')->from($this->getTableName());

		$args	= func_get_args();

		call_user_func_array(array($q, 'addWhere'), $args);

		return	$q->execute()->fetchAll();
	}


	public function findAllObj() {

	#	$className	= __CLASS__;
		$className	= get_class($this);

		$arrRet	= array();
		$args	= func_get_args();
		$arr	= call_user_func_array(array($this, 'findAll'), $args);

		foreach ((array) $arr as $oneArray) {
			$oneObj	= new $className();
			if (!empty($oneArray['id'])) {
				$arrRet[]	= $oneObj->hydrate($oneArray);
			}
		}

		return	$arrRet;
	}


	public function isModified() {
		return	count($this->arrModifiedFields);
	}


	protected function doInsert() {

		$arrSet	= array();

		foreach ($this->arrFields as $key) {
			if (isset($this->$key)) {
				$arrSet[$key] = $this->$key;
			}
		}

		if (in_array('created_time', $this->arrFields)) {
			$arrSet['created_time']	= time();
		}

		$q		= new SofavDB_Sql();

		$q->insert($this->getTableName())->addSet($arrSet);

		$ret		= $q->execute();
		$insertId	= $q->getInsertId();

		if ($insertId) {
			$this->id	= $insertId;
		}

		return	$ret;
	}


	protected function doUpdate() {

		if (!$this->isModified()) {
			return;
		}

		foreach ($this->arrModifiedFields as $key => $true) {
			$arrSet[$key] = $this->$key;
		}

		$q	= new SofavDB_Sql();

		$q->update($this->getTableName())->addSet($arrSet)->addWhere("id = %d", $this->id);

		return	$q->execute();
	}


	public function save() {
		return	empty($this->id) ? $this->doInsert() : $this->doUpdate();
	}


	public function delete() {

		if ($this->id) {

			$q	= new SofavDB_Sql();

			$q->delete($this->getTableName())->addWhere("id = %d", $this->id);

			return	$q->execute();
		}

		return	false;
	}


	public function toArray() {
		$ret	= array();
		foreach ($this->arrFields as $key) {
			$ret[$key]	= $this->$key;
		}
		return	$ret;
	}

	// Hydrate
	public function hydrate($arr) {
		if (isset($arr['id'])) {
			$this->id	= $arr['id'];
		}
		foreach ($this->arrFields as $key) {
			if (isset($arr[$key])) {
				$this->$key	= $arr[$key];
			}
		}
		return	$this;
	}


	/* Following are magic method */

	public function __set($n, $v) {
		if (in_array($n, $this->arrFields)) {
			$this->arrModifiedFields[$n] = true;
			$this->$n = $v;
		}
		return	$v;
	}

	public function __get($n) {
		return	isset($this->$n) ? $this->$n : null;
	}


}