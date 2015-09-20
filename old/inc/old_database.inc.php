<?php

$GLOBALS['db_conf'][1000]	= array( 'host' => 'localhost', 'user' => 'root', 'pass' => '123456', 'db' => 'sofav' );
$GLOBALS['db_conf'][2000]	= array( 'host' => 'localhost', 'user' => 'leakon', 'pass' => 'leakon', 'db' => 'leakon_fav' );

class database {
	
	/** @var string Internal variable to hold the query sql */
	var $_sql = '';
	/** @var Internal variable to hold the connector resource */
	var $_resource = '';
	/** @var Internal variable to hold the last query cursor */
	var $_cursor = null;
	/** @var Internal variable to specify the mysql_fetch_array result type */
	var $_arrayType = MYSQL_ASSOC;
	/** @var int Internal variable to hold the database error number */
	var $_errorNum=0;
	/** @var string Internal variable to hold the database error message */
	var $_errorMsg='';
	/** @var boolean Debug option */
	var $_debug=0;
	/** @var int A counter for the number of queries performed by the object instance */
	var $_ticker=0;
	/** @var array A log of queries */
	var $_log=null;
	
	function database( $host = 'localhost', $user, $pass, $db ) {
		
		// perform a number of fatality checks, then die gracefully
		if ( !function_exists( 'mysql_connect' ) ) {
			die( 'FATAL ERROR: MySQL support not available.  Please check your configuration.' );
			exit();
		}
		
		if ( !( $this->_resource = @mysql_connect( $host, $user, $pass ) ) ) {
			die( 'FATAL ERROR: Connection to database server failed.' );
			exit();
		}
		
		if ( !mysql_select_db( $db ) ) {
			die( "FATAL ERROR: Database not found. Operation failed with error: " . mysql_error() );
			exit();
		}
		
		
	}
	
	function setQuery( $sql ) {
		$this->_sql = $sql;
	}
	
	function getQuery() {
		return "<pre>" . htmlspecialchars( $this->_sql ) . "</pre>\n";
	}
	
	function query() {
		if ( $this->_debug ) {
			$this->_ticker++;
	  		$this->_log[] = $this->_sql;
		}
		$this->_errorNum = 0;
		$this->_errorMsg = '';
		$this->_cursor = mysql_query( $this->_sql, $this->_resource );
		if ( !$this->_cursor ) {
			$this->_errorNum = mysql_errno( $this->_resource );
			$this->_errorMsg = mysql_error( $this->_resource )." SQL=$this->_sql";
			if ( $this->_debug ) {
				trigger_error( mysql_error( $this->_resource ), E_USER_NOTICE );
				//echo "<pre>" . $this->_sql . "</pre>\n";
				if (function_exists( 'debug_backtrace' )) {
					foreach( debug_backtrace() as $back ) {
					    if ( @$back['file'] ) {
						    echo '<br />'.$back['file'].':'.$back['line'];
						}
					}
				}
			}
			return false;
		}
		return $this->_cursor;		
	}
	
	function setArrayType( $type ) {
		if ( $type == MYSQL_ASSOC ||
		$type == MYSQL_NUM ||
		$type == MYSQL_BOTH )
			$this->_arrayType = $type;
	}
	
	function loadResultArray() {
		if ( !( $cur = $this->query() ) ) {
			return null;
		}
		$array = array();
		while ( $row = mysql_fetch_array( $cur, $this->_arrayType ) ) {
			$array[] = $row;
		}
		mysql_free_result( $cur );
		return $array;
	}
	
	function loadArrayResult() {
		return $this->loadResultArray();
	}
	
}

/*
 * 创建数据库实例，$config为参数数组，包含以下元素：['host'] / ['user'] / ['pass'] / ['db']
 */
function createDatabaseInstance( $config ) {
	return new database( $config['host'], $config['user'], $config['pass'], $config['db'] );
}

// 定义通用数据库执行函数
function db_query( &$mdb2, $sql ) {
	//echo	$sql . "<br>\n";
	$result	= $mdb2->query( $sql );
	while ( ( $row = $result->fetchRow() ) ) {
		$ret[]	= $row;
	}
	$result->free();
	if( is_array( $ret ) ) {
		return $ret;
	} else {
		return array();
	}
}

function db_exec( &$mdb2, $sql ) {
	$ret	= &$mdb2->exec($sql);
	return	$ret;
}

?>