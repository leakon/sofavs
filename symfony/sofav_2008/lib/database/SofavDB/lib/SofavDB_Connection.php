<?php

/**
 * Connection
 *
 * @package     SofavDB
 * @subpackage  Connection
 * @link        www.leakon.com
 * @version     2008-05-14
 * @author      Leakon <leakon@gmail.com>
 */
class SofavDB_Connection {

	private	static
		$arrConnections	= array();


	// get database connection
	public static function get($connName = 0) {

		if (empty(self::$arrConnections[$connName])) {

			// if not set connection name, use 0 as static index
			$dsn	= 0 === $connName ? SofavDB_Manage::getRecentDsn() : SofavDB_Manage::setRecentDsn($connName);

			$arrConf			= SofavDB_Manage::getConfig($dsn);

			$port				= empty($arrConf['port']) ? '3306' : $arrConf['port'];
			self::$arrConnections[$connName]	= mysql_connect($arrConf['host'].':'.$port, $arrConf['user'], $arrConf['pass']);

			if (!empty($arrConf['db'])) {
				mysql_select_db($arrConf['db']);
			}

			if (!empty($arrConf['params']['encoding'])) {
				mysql_query('SET NAMES ' . $arrConf['params']['encoding'], self::$arrConnections[$connName]);
			}

		}

		return	self::$arrConnections[$connName];
	}

	public static function query($sql) {
		return	mysql_query($sql, self::get());
	}

}