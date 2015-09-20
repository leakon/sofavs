<?php

/**
 * Leakon
 *
 * @package    Symfony 1.1
 * @author     Leakon <leakon@gmail.com>
 * @version    2008-07-19 12:20
 *
 * Simple user interface for Symfony PHP Framework
 */

abstract class SimpleSymfonyUser extends sfBasicSecurityUser {

	// "member" is default credential of an registered user.
	protected
		$nameSpace	= 'member',
		$cookieName	= 'simCuki',		// SimpleCookie
		$cookieToken	= 'SimpleCookieTK',
		$version	= '2008-07-19 12:20';

	// public call methods begin:

	/**
	 * Get user info by intval userId.
	 * Need to be implemented in child class.
	 *
	 * @return:
		$arrRet	= array(
			'id'		=> 1234,
			'username'	=> 'leakon'
			)
	 */
	abstract function getUserInfo($userId);


	public function getId() {
		return	$this->getAttribute('id', 0, $this->nameSpace);
	}

	public function getUsername() {
		return	$this->getAttribute('username', '', $this->nameSpace);
	}


	// public call methods end.

	// Constructor, differ from Symfony 1.0
	public function initialize(sfEventDispatcher $dispatcher, sfStorage $storage, $options = array()) {

		// initialize parent
		parent::initialize($dispatcher, $storage, $options);

		$session	= $this->isAuthenticated() ? 1 : 0;	// 2 ^ 0

		$res		= $this->validateSessionId();
		$cookie		= $res['valid'] ? 2 : 0;		// 2 ^ 1

		$status		= $session + $cookie;
		$GLOBALS['simple_user_status']	= $status;

		switch ($status) {

		#	case	0 :		// Session: 0	Cookie: 0
			#	$this->clearSession();
			#	break;

			case	1 :		// Session: 1	Cookie: 0
				$this->setCookie();
				break;

			case	2 :		// Session: 0	Cookie: 1
				$this->relaySession();
				break;

		#	case	3 :		// Session: 1	Cookie: 1
		#		break;

		}

	}

	// Call me when user has just successfully logged in.
	public function setLoggedIn($userId) {

		$userInfo	= $this->getUserInfo($userId);

		if (!empty($userInfo['id']) && !empty($userInfo['username'])) {

			// set user login status
			$this->setAuthenticated(true);

			// set credential, member is default
			$this->addCredential($this->nameSpace);

		#	var_dump($userInfo);

			$this->setAttribute('id', $userInfo['id'], $this->nameSpace);
			$this->setAttribute('username', $userInfo['username'], $this->nameSpace);

			$this->setCookie();

			return	true;

		}
		return	false;
	}

	// clear session but preserve cookie (leave the chance to get username from cookie)
	public function setloggedOut() {
		$this->clearSession();
		$this->setCookie($broke = true);
	}

	// clear session and cookie
	public function clearSession() {
		$this->setAuthenticated(false);
		$this->clearCredentials();
		$this->clearAttributes();
	}



	/*
	 * Max UserId = 251658240	// 251658240 = 0xF000000, 7 hex chars.
	 */
	public function getSessionIdByUserId($intUserId) {

		$randString	= rand(0, 99999) . $_SERVER['REQUEST_TIME'] . $_SERVER['REMOTE_ADDR'] . $_SERVER['HTTP_USER_AGENT'];
		$randString	= md5($randString);

		// First, get 16 hex chars;
		$leftPart	= substr($randString, 0, 16);

		// Secend, use first 16 chars generate a new 16 hex chars;
		$rightPart	= substr(md5($leftPart . $this->cookieToken), 0, 16);

		// Third, make right 7 chars bigger than 0xF000000;
		$rightPart[9]	= 'f';

		// Fourth, hide UserId in rightPart
		$secretPart	= substr($rightPart, 9);
		$intSecret	= hexdec($secretPart);

		$intFinal	= $intSecret - $intUserId;
		$strFinal	= dechex($intFinal);

		// Final, return 32 chars.
		return	$leftPart . substr($rightPart, 0, 9) . $strFinal;

	}

	/**
	 * Vefify whether user cookie is valid and retrieve userId.
	 *
	 * @return:
		$arrRet	= array(
			'valid'	=> true,
			'id'	=> 1234
			)
	 */
	public function validateSessionId($strSessionId = false) {

		if (false === $strSessionId) {
			$strSessionId	= session_id();
		}

		$arrRet		= array(
					'valid'	=> false,
					'id'	=> 0,
				);

		// First, get 16 hex chars;
		$leftPart	= substr($strSessionId, 0, 16);

		// Secend, use first 16 chars generate a new 16 hex chars;
		$rightPart	= substr(md5($leftPart . $this->cookieToken), 0, 16);

		// Third, validate session id;
		if (substr($strSessionId, 16, 9) == substr($rightPart, 0, 9)) {
			$arrRet['valid']	= true;
		}

		// Fourth, make right 7 chars bigger than 0xF000000;
		$rightPart[9]	= 'f';
		$intTotal	= hexdec(substr($rightPart, 9));

		// Final, get right 7 hex chars and convert to int;
		$intCookieId	= hexdec(substr($strSessionId, 25));

		$intUserId	= $intTotal - $intCookieId;

		if ($intUserId > 0) {
			$arrRet['id']	= $intUserId;
		}

		return	$arrRet;
	}

	public function getbrokenSession($strSessionId) {
		return	substr_replace($strSessionId, rand(100000000, 999999999), 16, 9);
	}

	private function setCookie($brokeSession = false) {

		$sessionId	= $this->getSessionIdByUserId($this->getId());
		if ($brokeSession) {
			$sessionId	= $this->getbrokenSession($sessionId);
		}

		if (1) {
			session_id($sessionId);
		} else {
			$response	= sfContext::getInstance()->getResponse();
			$response->setCookie($this->cookieName, $sessionId, 1577808000);	// 1577808000 = 2020-01-01
		}

	}

	// validate cookie when session is timeout, get user info by id and reset cookie
	private function relaySession() {
		$res	= $this->validateSessionId();
		if ($res['id']) {
			$this->setLoggedIn($res['id']);
		}
	}

	// clear id and username from session
	private function clearAttributes() {
		$this->setAttribute('id', 0, $this->nameSpace);
		$this->setAttribute('username', '', $this->nameSpace);
	}

}
