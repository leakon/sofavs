<?php

/**
 * Sql
 *
 * @package     SofavDB
 * @subpackage  Sql
 * @link        www.leakon.com
 * @version     2008-05-14
 * @author      Leakon <leakon@gmail.com>
 */
/**
 *
 * Example 1	SELECT * FROM user WHERE username LIKE '%leakon%' AND email <> ''
 * Statment 1	$q = new SofavDB_Sql()->select('*')->table('users')->addWhere("username LIKE '%leakon%'")
 *
 */
/**
 * Table join is not supported
 *
 */
class SofavDB_Sql {

	private

		$arrSqls		= array(),
		$mainTask		= '',
		$sql			= '',
		$specifiedMethod	= null,
		$conn			= null,
		$resource		= null,
		$lastInsertId		= null;

	private static

		$arrMultipleMethods	= array('addWhere', 'addOrderBy', 'addLimit'),
		$arrSingleMethods	= array('insert', 'update', 'delete'),
		$arrTotalDefinedMethod	= array(
						'insert'	=> true,
						'select'	=> true,
						'update'	=> true,
						'delete'	=> true,
						'from'		=> true,
						'addWhere'	=> true,
						'addOrderBy'	=> true,
						'addLimit'	=> true,
						'addSet'	=> true,
						);

	public static function e($str, $connName = 0) {

		static	$magicQuote_SofavDB_Sql = null;

		if (empty($magicQuote_SofavDB_Sql)) {
			$magicQuote_SofavDB_Sql	= get_magic_quotes_gpc();
		}

	#	return	$magicQuote_SofavDB_Sql ? $str : mysql_real_escape_string($str, SofavDB_Connection::get($connName));
		return	mysql_real_escape_string($str, SofavDB_Connection::get($connName));
	}

	public function __construct() {

		$this->conn	= SofavDB_Connection::get();
		return	$this;
	}

	public function __call($method, $args) {

		// specified method, normally is [from]
		if (!empty($this->specifiedMethod)) {

			if ($this->specifiedMethod != $method) {
				die(sprintf("The [%s] method is expected!", $this->specifiedMethod));
			}

			$this->specifiedMethod	= null;

		}

		if ('addSet' == $method) {
			// add set
			$arrSet			= array();

			foreach ((array) $args[0] as $key => $val) {
				$arrSet[]	= sprintf("%s = '%s'", $key, self::e($val));
			}

			$this->arrSqls[$method]	= implode(', ', $arrSet);


		} else if ('select' == $method) {

			// [select] should be followed by [from]
			$this->arrSqls			= array();

			$this->specifiedMethod		= 'from';
			$this->mainTask			= 'SELECT';
			$this->arrSqls['select']	= $args[0];


		} else if ('from' == $method) {

			$this->arrSqls['table']		= $args[0];


		} else if (in_array($method, self::$arrSingleMethods)) {
			// single

			$this->arrSqls			= array();

			$this->mainTask			= strtoupper($method);
			$this->arrSqls['table']		= $args[0];


		} else if (in_array($method, self::$arrMultipleMethods)) {
			// multiple, 'addWhere', 'addOrderBy', 'addLimit'
			// should escape input value

			$len	= count($args);
			for ($i = 1; $i < $len; ++$i) {
				$args[$i]	= self::e($args[$i]);
			}

			$this->arrSqls[$method]	= call_user_func_array('sprintf', $args);


		}

		// undefined
		if (!isset(self::$arrTotalDefinedMethod[$method])) {
			die(sprintf("Call undefined method [%s] of SofavDB_Sql, file: %s, line:%s", $method, __FILE__, __LINE__));
		}

		return	$this;

	}

	private function composeSql() {

		if ('SELECT' == strtoupper($this->mainTask)) {
			$this->sql	= $this->composeSelect();
		} else {
			$this->sql	= $this->composeUpdate();
		}

		return	$this->sql;
	}

	private function composeSelect() {

		$arrSql			= array();
		$arrSql['select']	= 'SELECT';
		$arrSql['fields']	= $this->arrSqls['select'];
		$arrSql['from']		= 'FROM';
		$arrSql['table']	= $this->arrSqls['table'];

		$arrSql['where']	= isset($this->arrSqls['addWhere']) ? sprintf("WHERE %s", $this->arrSqls['addWhere']) : '';
		$arrSql['order']	= isset($this->arrSqls['addOrderBy']) ? sprintf("ORDER BY %s", $this->arrSqls['addOrderBy']) : '';;
		$arrSql['limit']	= isset($this->arrSqls['addLimit']) ? sprintf("LIMIT %s", $this->arrSqls['addLimit']) : '';;

		return			implode(' ', $arrSql);
	}

	private function composeUpdate() {

		$arrSql			= array();
		$arrSql['task']		= $this->mainTask;
		$arrSql['into']		= 'INSERT' == strtoupper($this->mainTask) ? 'INTO' : '';
		$arrSql['from']		= 'DELETE' == strtoupper($this->mainTask) ? 'FROM' : '';
		$arrSql['table']	= $this->arrSqls['table'];

		$arrSql['set']		= isset($this->arrSqls['addSet']) ? sprintf("SET %s", $this->arrSqls['addSet']) : '';
		$arrSql['where']	= isset($this->arrSqls['addWhere']) ? sprintf("WHERE %s", $this->arrSqls['addWhere']) : '';

		return			implode(' ', $arrSql);
	}

/*
	public static function query($sql) {
		return	mysql_query($sql, self::get());
	}
*/


	public function rawSql($sql) {

	#	var_dump($sql);
		$this->resource		= mysql_query($sql, $this->conn);
	#	var_dump($this->conn);
	#	var_dump($this->resource);

		return	$this;
	}


	public function execute() {

		if (empty($this->resource)) {

		#	$this->lastInsertId	= null;

			$this->composeSql();

		#	var_dump($this->sql);
		#	$this->resource	= SofavDB_Connection::query($this->sql);

			$this->resource		= mysql_query($this->sql, $this->conn);
			$this->lastInsertId	= mysql_insert_id($this->conn);
		}

		return	$this;
	}

	public function fetchAll() {

		$arrRows	= array();
		if (!empty($this->resource)) {
			while ($row = mysql_fetch_assoc($this->resource)) {
				$arrRows[]	= $row;
			}
		}

		return	$arrRows;
	}

	public function fetchOne() {
		return	empty($this->resource) ? array() : mysql_fetch_assoc($this->resource);
	}

	public function affectRows() {
		return	mysql_affected_rows($this->resource);
	}

	public function getInsertId() {
		return	$this->lastInsertId;
	}

}
