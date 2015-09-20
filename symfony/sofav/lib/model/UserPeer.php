<?php

/**
 * Subclass for performing query and update operations on the 'users' table.
 *
 *
 *
 * @package lib.model
 */
class UserPeer extends BaseUserPeer {

	// 保存用户信息（insert / update）
	public static function saveUser(&$actionRef) {

		$sessionUser = $actionRef->getUser();
		$userId = $sessionUser->getId();

		if ($userId) {
			$user = self::retrieveByPk($userId);
		} else {
			$user = new User();
			$user->setUsername($actionRef->getRequestParameter('username'));
		}

		$password = SofavSecurity::encryptKey($actionRef->getRequestParameter('password'));
		$user->setPassword($password);

		if ($user->save()){
			return $user;
		} else {
			return null;
		}
	}

	// 登录模块
	public static function loginUser(&$actionRef) {

		// handle the form submission
		$username = $actionRef->getRequestParameter('username');

		// 用户提交的原始密码
		$submitedPassword = $actionRef->getRequestParameter('password');
		// 经过加密的密文
		$encryptedPassword = SofavSecurity::encryptKey($submitedPassword);

		return self::checkLogin($username, $encryptedPassword);
	}

	/**
	 * 根据用户名和密码登录
	 *
	 * @param string $username		用户名
	 * @param string $encryptedPassword	对原始密码进行加密后的密文
	 * @return object / null
	 */
	public static function checkLogin($username, $encryptedPassword) {

		$c = new Criteria();
		$c->add(UserPeer::USERNAME, $username);
		$user = UserPeer::doSelectOne($c);

		// if user is valid, return $user
		if ($user && $user->getPassword() == $encryptedPassword) {
			return $user;
		} else {
			return null;
		}
	}

}
