<?php

/**
 * accounts actions.
 *
 * @package    sofav
 * @subpackage accounts
 * @author     Your name here
 * @version    SVN: $Id: actions.class.php 2692 2006-11-15 21:03:55Z fabien $
 */

class accountsActions extends sfActions {

	private function redirectRefer() {

		if ($refer = HelperView::getRefer()) {
			$this->redirect($refer);
		} else {
			$this->forward('accounts', 'login');
		}

		return	true;
	}

	public function executeIndex() {
		$this->setLayout(false);
		return $this->forward('accounts', 'login');
	}

	public function executeLogin() {

		if ($this->getRequest()->getMethod() == sfRequest::POST) {

			$reqUsername	= trim($this->getRequestParameter('username'));
			$reqPassword	= $this->getRequestParameter('password');


/*
			if (!empty($reqUsername) && UsersPeer::isValidUsername($reqUsername)) {

				$objUser	= UsersPeer::checkPassword($reqUsername, $reqPassword);

				if ($objUser) {

					$this->getUser()->setLoggedIn($objUser->getId());

					return	$this->redirectRefer();

				} else {

				}
			}
*/

			if (!empty($reqUsername) && UserPeer::isValidUsername($reqUsername)) {

				$objUser	= UsersPeer::checkPassword($reqUsername, $reqPassword);

				if ($objUser) {

					$this->getUser()->setLoggedIn($objUser->getId());

					return	$this->redirectRefer();

				} else {

				}
			}


			$this->passwordNotMatch	= true;

		} else {


		}
	}


	public function executeCreate() {

		if ($this->getRequest()->getMethod() == sfRequest::POST) {

			$objUser	= new Users();
			$objUser->setUsername($this->getRequestParameter('username'));
			$objUser->setPassword($this->getRequestParameter('password'));
			$objUser->setCreatedTime($_SERVER['REQUEST_TIME']);

			$boolSavedOK	= $objUser->save();

			if ($boolSavedOK) {

				// get user info, set it to user session
			 	$this->getUser()->setLoggedIn($objUser->getId());

			 	return	$this->redirectRefer();

			}


		} else {


		}

	}

	public function handleErrorCreate() {
		return sfView::SUCCESS;
	}

	public function executeSettings() {

		$this->objUser	= UsersPeer::userExists($this->getUser()->getUsername());

	}

	public function executeUpdateSettings() {

		if ($this->getRequest()->getMethod() == sfRequest::POST && $reqUsername = $this->getUser()->getUsername()) {

			$objUser	= UsersPeer::userExists($reqUsername);

			if ($reqPassword = $this->getRequestParameter('password')) {
				$objUser->setPassword($reqPassword);
			}

			if ($reqNickname = $this->getRequestParameter('nickname')) {
				$objUser->setNickname($reqNickname);
			}

			if ($reqEmail = $this->getRequestParameter('email')) {
				$objUser->setEmail($reqEmail);
			}

			$boolSavedOK	= $objUser->save();

			if ($objUser->isModified() && !$boolSavedOK) {

				echo	'Something wrong when updating settings.';
			}

		}

		$this->redirect('accounts/settings');

	}


	public function handleErrorUpdateSettings() {

		$this->setTemplate('settings');

		$this->executeSettings();

		return sfView::SUCCESS;
	}

	// symfony validator
	public function validateUpdateSettings() {

		$hasError	= false;

		if ($reqPassword = $this->getRequestParameter('password')) {

			// checkpoint 1		old password
			$oldPassword		= $this->getRequestParameter('oldpass');
			$userName		= sfContext::getInstance()->getUser()->getUsername();
			if (!UsersPeer::checkPassword($userName, $oldPassword)) {
				$this->getRequest()->setError('oldpass', '原始密码不正确');
				$hasError	= true;
			}

			// checkpoint 2		new password
			$reqPassword		= $this->getRequestParameter('password');
			if (strlen($reqPassword) < 4) {
				$this->getRequest()->setError('password', '为了您的帐户安全，密码最少需要 4 个字');
				$hasError	= true;
			}

			// checkpoint 3		confirm password
			$reqConfirm		= $this->getRequestParameter('confirm');
			if ($reqPassword != $reqConfirm) {
				$this->getRequest()->setError('confirm', '两次输入的密码不一致');
				$hasError	= true;
			}

		}

		return	$hasError ? false : true;
	}


	public function executeLogout() {

		$this->setLayout(false);

		$this->getUser()->clearSession();


		return	$this->redirectRefer();
	}


	public function executeLoginAuth() {

		$reqUsername	= trim($this->getRequestParameter('username'));
		$reqPassword	= $this->getRequestParameter('password');

		$objUser	= UsersPeer::checkPassword($reqUsername, $reqPassword);

		if ($objUser) {
			$this->getUser()->setLoggedIn($objUser->getId());
		}


	}





}
