<?php


class sfSofavDatabase extends sfDatabase {
/**
   * Connect to the database.
   *
   * @throws <b>sfDatabaseException</b> If a connection could not be created.
   */
  public function connect()
  {
  	echo 'asdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfadsf';exit;
    try
    {

    	$res	= $this->getParameterHolder();

    	print_r($res);exit;

      // determine how to get our settings
      $method = $this->getParameter('method', 'normal');

      switch ($method)
      {
        case 'normal':
          // get parameters normally, and all are required
          $database = $this->getParameter('database', null);
          $hostspec = $this->getParameter('hostspec') ? $this->getParameter('hostspec') : ($this->getParameter('host') ? $this->getParameter('hostspec') : null);
          $password = $this->getParameter('password', null);
          $phptype  = $this->getParameter('phptype',  null);
          $username = $this->getParameter('username', null);
          $port     = $this->getParameter('port',     null);
          $encoding = $this->getParameter('encoding', null);

          $dsn = array('database' => $database,
                       'hostspec' => $hostspec,
                       'password' => $password,
                       'phptype'  => $phptype,
                       'username' => $username,
                       'port'     => $port,
                       'encoding' => $encoding);
          break;

        case 'dsn':
          $dsn = $this->getParameter('dsn');

          if ($dsn == null)
          {
            // missing required dsn parameter
            $error = 'Database configuration specifies method "dsn", but is missing dsn parameter';

            throw new sfDatabaseException($error);
          }

          break;

        case 'server':
          // construct a DSN connection string from existing $_SERVER values
          $dsn =& $this->loadDSN($_SERVER);

          break;

        case 'env':
          // construct a DSN connection string from existing $_ENV values
          $dsn =& $this->loadDSN($_ENV);

          break;

        default:
          // who knows what the user wants...
          $error = 'Invalid CreoleDatabase parameter retrieval method "%s"';
          $error = sprintf($error, $method);

          throw new sfDatabaseException($error);
      }

      // get creole class path
      $classPath = $this->getParameter('classpath');

      // include the creole file
      if ($classPath == null)
      {
        require_once('creole/Creole.php');
      }
      else
      {
        require_once($classPath);
      }

      // set our flags
      $noAssocLower = $this->getParameter('no_assoc_lower', false);
      $persistent   = $this->getParameter('persistent', false);
      $compatAssocLower  = $this->getParameter('compat_assoc_lower', false);
      $compatRtrimString = $this->getParameter('compat_rtrim_string', false);

      $flags  = 0;
      $flags |= ($noAssocLower)      ? Creole::NO_ASSOC_LOWER : 0;
      $flags |= ($persistent)        ? Creole::PERSISTENT : 0;
      $flags |= ($compatAssocLower)  ? Creole::COMPAT_ASSOC_LOWER : 0;
      $flags |= ($compatRtrimString) ? Creole::COMPAT_RTRIM_STRING : 0;

      // do the duuuurtay work, right thurr
      if ($flags > 0)
      {
        $this->connection = Creole::getConnection($dsn, $flags);
      }
      else
      {
        $this->connection = Creole::getConnection($dsn);
      }

      // get our resource
      $this->resource = $this->connection->getResource();
    }
    catch (SQLException $e)
    {
      // the connection's foobar'd
      throw new sfDatabaseException($e->toString());
    }
  }

  /**
   * Execute the shutdown procedure
   *
   * @return void
   *
   * @throws <b>sfDatabaseException</b> If an error occurs while shutting down this database
   */
  public function shutdown()
  {
    if ($this->connection != null)
    {
      @mysql_close($this->connection);
    }
  }
}


require_once(dirname(__FILE__) . '/SofavDB_AutoLoad.php');
