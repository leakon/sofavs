<?php

class myUser extends sfBasicSecurityUser {

	public function initialize($context, $parameters = null) {

		// initialize parent
		parent::initialize($context);
	//	$this->getParameterHolder()->add($parameters);

		$isValidCookie = $this->validateCookie();
		$isAuthenticated = $this->getContext()->getUser()->isAuthenticated();

		if ($isValidCookie && !$isAuthenticated) {
			$userName = $this->getContext()->getRequest()->getCookie('un');
			$encryptedPassword = $this->getContext()->getRequest()->getCookie('up');
			$user = UserPeer::checkLogin($userName, $encryptedPassword);

			if ($user) {
				$this->signIn($user);
			}
		}

		// valid_cookie
		$this->getContext()->getResponse()->setCookie('vc', intval($isValidCookie));

		return true;
	}

	public function getCookieTest() {
	//	return 23;
		return $this->getParameterHolder()->get('user_cookied');
	}


	public function signIn(&$user) {

		$this->setAttribute('user_id', $user->getId(), 'subscriber');
		$this->setAuthenticated(true);

		$this->addCredential('subscriber');
		$this->setAttribute('username', $user->getUserName(), 'subscriber');
		$this->setAttribute('password', $user->getPassword(), 'subscriber');

		// 设置 cookie
		$userName = $user->getUserName();
		$userSignature = SofavSecurity::encryptKey($userName);
		$userPassword = $user->getPassword();

		$currTimeStamp = $_SERVER['REQUEST_TIME'];
		$expirationSecond = $currTimeStamp + 2592000;	// 2592000 = 86400 * 30;

		$response = $this->getContext()->getResponse();
		$response->setCookie('un', $userName, $expirationSecond);
		$response->setCookie('us', $userSignature, $expirationSecond);
		$response->setCookie('up', $userPassword, $expirationSecond);

	}

	// 检验是否是有效的 cookie
	private function validateCookie() {

		$request = $this->getContext()->getRequest();
		$userName = $request->getCookie('un');
		$userSignature = $request->getCookie('us');
		$userPassword = $request->getCookie('up');

		$expectedSignature = SofavSecurity::encryptKey($userName);

		return (!empty($userPassword) && $userSignature == $expectedSignature);

	}

	public function signOut() {

		$this->getAttributeHolder()->removeNamespace('subscriber');

		$this->setAuthenticated(false);
		$this->clearCredentials();

		// 退出登录同时要注销 Cookie 中的变量
		$response = $this->getContext()->getResponse();
		$response->setCookie('un', '', 0);
		$response->setCookie('us', '', 0);
		$response->setCookie('up', '', 0);

	}

	public function getId() {
		return $this->getAttribute('user_id', '', 'subscriber');
	}

	public function getUsername() {
		return $this->getAttribute('username', '', 'subscriber');
	}

	public function getPassword() {
		return $this->getAttribute('password', '', 'subscriber');
	}

}
