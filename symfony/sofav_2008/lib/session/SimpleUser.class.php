<?php

/**
 * Leakon
 *
 * @package    Symfony
 * @author     Leakon <leakon@gmail.com>
 * @version    2008-05-06 22:40
 *
 * Common user interface for Symfony PHP Framework
 */

abstract class SimpleUser extends sfBasicSecurityUser {

	// default protected member is default value,
	// change them for your apps.
	protected
		$nameSpace	= 'member',
		$passportName	= 'sofav',
		$passportToken	= 'SofavPassPortTK',
		$version	= '2008-05-06';

	// need to be implemented in child class
	// @return array	$arrRet['id'] and $arrRet['username']
	abstract function getUserInfo($userId);

	// constructor
	public function initialize($context, $parameters = null) {

		// initialize parent
		parent::initialize($context, $parameters);

		$session	= $this->isAuthenticated() ? 1 : 0;	// 2 ^ 0
		$passport	= $this->validatePassport() ? 2 : 0;	// 2 ^ 1

		$status		= $session + $passport;

		$GLOBALS['simple_user_status']	= $status;

		switch ($status) {

			case	0 :		// session and passport are both invalid
				$this->clearSession();
				break;

			case	1 :		// session is OK but passport is invalid
				$this->setPassport();
				break;

			case	2 :		// passport is OK but session is invalid
				$this->relaySession();
				break;

			case	3 :		// session and passport are both OK
				break;

		}

		return	$context;

	}

	// call me when user has just successfully loged in
	public function setLoggedIn($userId) {

		$userInfo	= $this->getUserInfo($userId);

		if (!empty($userInfo['id']) && !empty($userInfo['username'])) {

			// set user login status
			$this->setAuthenticated(true);

			// set credential, member is default
			$this->addCredential($this->nameSpace);

			$this->setAttribute('id', $userInfo['id'], $this->nameSpace);
			$this->setAttribute('username', $userInfo['username'], $this->nameSpace);

			$this->setPassport();

			return	true;

		}

		return	false;

	}

	// clear session and passport
	public function clearSession() {
		$response	= $this->getContext()->getResponse();
		$response->setCookie($this->passportName, '', 0);	// 0 = 1970-01-01
		$this->setAuthenticated(false);
		$this->clearCredentials();
		$this->clearAttributes();
		return	true;
	}

	// clear session but reserve passport (leave the chance to get username from cookie)
	public function logOut() {
		$response	= $this->getContext()->getResponse();
		$userId		= $this->getId();
		$response->setCookie($this->passportName, substr(md5(rand(0, 999)), 0, 16) . $userId, 1577808000);	// 1577808000 = 2020-01-01
		$this->setAuthenticated(false);
		$this->clearCredentials();
		$this->clearAttributes();
		return	true;
	}

	public function getId() {
		return	$this->getAttribute('id', 0, $this->nameSpace);
	}

	public function getUsername() {
		return	$this->getAttribute('username', '', $this->nameSpace);
	}

	// following are private method

	private function setPassport() {

		$randString	= rand(0, 99999) . $_SERVER['REQUEST_TIME'] . $_SERVER['REMOTE_ADDR'] . $_SERVER['HTTP_USER_AGENT'];
		$firstPart	= substr(md5($randString), 0, 8);

		$fromString	= $this->getId() . $firstPart . $this->passportToken;
		$secondPart	= substr(md5($fromString), 0, 8);

		$setString	= $firstPart . $secondPart . $this->getId();

		$response	= $this->getContext()->getResponse();
		$response->setCookie($this->passportName, $setString, 1577808000);	// 1577808000 = 2020-01-01

	}

	// validate passport cookie, return userId if it is valid
	private function validatePassport() {

		$request	= $this->getContext()->getRequest();
		$passport	= $request->getCookie($this->passportName, '');

		if (strlen($passport) > 16) {

			$firstPart	= substr($passport, 0, 8);
			$secondPart	= substr($passport, 8, 8);
			$userId		= intval(substr($passport, 16, 8));

			if ($secondPart == substr(md5($userId . $firstPart . $this->passportToken), 0, 8)) {
				return	$userId;
			}
		}

		return	false;
	}

	// validate passport from cookie when session is timeout, get user info by id and reset passport
	private function relaySession() {

		if ($userId = $this->validatePassport()) {
			return	$this->setLoggedIn($userId);
		}

		return	false;
	}

	// clear id and username from session
	private function clearAttributes() {
		$this->setAttribute('id', 0, $this->nameSpace);
		$this->setAttribute('username', '', $this->nameSpace);
		return	true;
	}

}
