<?php

/**
 * post actions.
 *
 * @package    sofav
 * @subpackage post
 * @author     Leakon
 * @version    2007-06-24
 */
class postActions extends sfActions {

	public function executeIndex() {
		return $this->forward('post', 'list');
	}

	public function executeList() {
		// 带翻页的列表
		$this->posts = PostPeer::getList($this->getRequestParameter('page', 1));
	}

	public function executeShow() {

//		$this->post = PostPeer::retrieveByPk($this->getRequestParameter('id'));
		$this->post = PostPeer::getSinglePost($this->getRequestParameter('id'));

		$this->forward404Unless($this->post);

	}

	public function executeCreate() {

		$this->post = new Post();
		$this->post->setProperties($this);

		$this->similar = PostPeer::findSimilar($this->post);

		$this->setTemplate('edit');

	}

	public function executeEdit() {
		$this->post = PostPeer::retrieveByPk($this->getRequestParameter('id'));

		$this->redirectUnlessAuthenticated($this->post);

		$this->forward404Unless($this->post);
	}

	public function executeUpdate() {

		$post = PostPeer::savePost($this);
//		$post = PostStorage::save($this);

//		$this->setTemplate('debug');

		$referer = $this->getRequestParameter('referer');
		if (!empty($referer)) {
			$this->redirect($referer);
		}

		return $this->redirect('post/show?id='.$post->getId());

	}

	public function executeDelete() {

		$post = PostPeer::retrieveByPk($this->getRequestParameter('id'));

		$this->redirectUnlessAuthenticated($post);

		$this->forward404Unless($post);

		$post->delete();

		return $this->redirect('post/list');
	}

	// 权限检查，如果当前 visitor 不是 post 的主人，跳转到列表页
	public function redirectUnlessAuthenticated($postRef) {
		if ($this->getUser()->getId() != $postRef->getUserId()) {
			return $this->forward('post', 'list');
		}
	}
}
