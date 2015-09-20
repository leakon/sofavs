<?php

/**
 * user actions.
 *
 * @package    sofav
 * @subpackage user
 * @author     Leakon
 * @version    2007-06-16
 */
class userActions extends sfActions {

	public function executeIndex() {
		$this->forward('user', 'login');
	}

	public function executeReg() {

		if ($this->getUser()->isAuthenticated()) {
			return sfView::ERROR;
		}

		if ($this->getRequest()->getMethod() == sfRequest::POST) {

			$user = UserPeer::saveUser($this);

			if ($user) {

				// loged in
				$this->getUser()->signIn($user);

				// redirect
				$this->redirect('user/reg');
			//	$this->redirect('@homepage');
			}
		}

		return sfView::SUCCESS;
	}

	public function handleErrorReg() {
		return sfView::SUCCESS;
	}

	public function executeLogin() {

		if ($this->getRequest()->getMethod() == sfRequest::POST) {

			$user = UserPeer::loginUser($this);
			if ($user) {
				$this->getUser()->signIn($user);
				$this->redirect('user/login');
			//	$this->redirect($this->getRequestParameter('referer', '@homepage'));
			}

			$this->loginInfo = array(
				'password_incorrect' => true
			);

		} else {

			// display the form
			$this->getRequest()->setAttribute('referer', $this->getRequest()->getReferer());

		}

		return sfView::SUCCESS;

	}

	public function handleErrorLogin() {
		return sfView::SUCCESS;
	}

	public function executeEdit() {

		if ($this->getRequest()->getMethod() == sfRequest::POST) {

			// 用户提交的旧密码原文
			$submittedOldPassword = $this->getRequestParameter('old_password');
			// 对密码原文进行加密编码
			$encryptedOldPassword = SofavSecurity::encryptKey($submittedOldPassword);

			// 旧密码加密编码后能匹配 session 中的密码，说明旧密码正确，可以进行密码更新
			if ($encryptedOldPassword == $this->getUser()->getPassword()) {

				$user = UserPeer::saveUser($this);

				// 修改过密码后，需要重新设置 session 和 cookie
				$this->getUser()->signIn($user);

				$this->redirect('user/edit');
			} else {

				$this->editInfo = array(
					'old_password_incorrect' => true
				);
			}

		} else {
			$user = $this->getUser();
			$editInfo = array();
			SofavSecurity::makeSignatureForEdit($user, $editInfo);
			$this->editInfo = $editInfo;
		}

		return sfView::SUCCESS;
	}

	public function handleErrorEdit() {
		return sfView::SUCCESS;
	}

	public function executeLogout() {
		$this->getUser()->signOut();
	}

}
