<?php

// use SimpleUser instead of sfBasicSecurityUser

class myUser extends SimpleUser {

	protected
		$passportName	= 'spp',		// sofav passport
		$passportToken	= 'SofavPassPortTK';

	public function getUserInfo($userId) {

	#	$userInfo	= UsersPeer::getSessionInfo($userId);

		$arrUsers	= Doctrine_Query::create()->from('User')->addWhere('id = ?', array($userId))->execute()->toArray();
		$userInfo	=& $arrUsers[0];

		return	$userInfo;

	}

}
