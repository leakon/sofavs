<?php

/**
 * Manage
 *
 * @package     SofavDB
 * @subpackage  Manage
 * @link        www.leakon.com
 * @version     2008-05-14
 * @author      Leakon <leakon@gmail.com>
 */
class SofavDB_Manage {

	protected static
		$arrDataSources		= array(),
		$recentDsn		= null;


	// Get recently used database config
	public static function getConfig($dsn = null) {
		if (isset($dsn)) {
			return	self::$arrDataSources[$dsn] ? self::$arrDataSources[$dsn] : array();
		} else {
			return	self::$arrDataSources[self::$recentDsn];
		}
	}


	public static function getRecentDsn() {
		return	self::$recentDsn;
	}


	public static function setRecentDsn($dataSourceName) {
		if (isset(self::$arrDataSources[$dataSourceName])) {
			return	self::$recentDsn = $dataSourceName;
		} else {
			die(sprintf("Data source of [%s] does not exist!", $dataSourceName));
		}
	}


	public static function loadDataSource($strDataSource) {

		$strDataSource	= trim(str_replace("\r\n", "\n", $strDataSource));
		$arrTemp	= explode("\n", $strDataSource);

		$arrSource	= array();
		foreach ($arrTemp as $line) {

			// strip comments and space
			$line	= trim(preg_replace("/\#.*/i", "", $line));

			if (strlen($line)) {

				$source	= preg_match("/[\t\s]*([^\t\s]+)\:[\t\s]+([^\#\t\s]*\#*.*)/i", $line, $matches);

				if (isset($matches[1]) && isset($matches[2])) {
					$arrSource[$matches[1]]	= $matches[2];
				}
			}
		}

		if (count($arrSource)) {

			foreach ($arrSource as $key => $dsn) {
			#	self::$arrDataSources[$key]	= self::parseDsn($dsn);
				self::addDsn($key, $dsn);
			}

		#	self::$recentDsn	= $key;
		}

		return	self::$arrDataSources;
	}


	public static function addDsn($key, $dsn) {

		self::$arrDataSources[$key]	= self::parseDsn($dsn);
		self::setRecentDsn($key);
	#	self::$recentDsn		= $key;
	}


	// example	mysql://root:123456@localhost:3306/sofav_2008?encoding=utf8&persistent=off
	// return	host, port, user, pass, db, params[encoding]
	private static function parseDsn($dsn) {

		$parts		= @parse_url($dsn);
		$parts['db']	= str_replace('/', '', $parts['path']);
		@parse_str($parts['query'], $parts['params']);

		unset($parts['path']);
		unset($parts['query']);
		unset($parts['scheme']);
		unset($parts['fragment']);

		return $parts;
	}

}