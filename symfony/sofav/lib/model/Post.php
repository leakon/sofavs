<?php

/**
 * Subclass for representing a row from the 'posts' table.
 *
 *
 *
 * @package lib.model
 */
class Post extends BasePost {

	private $isNewPost, $isModifiedPost;

	public function isNewPost() {
		return $this->isNewPost;
	}

	public function isModifiedPost() {
		return $this->isModifiedPost;
	}

	public function setProperties(&$actionRef) {

		$this->setId($actionRef->getRequestParameter('id'));
		$this->setUserId($actionRef->getUser()->getId());
		$this->setTitle(trim($actionRef->getRequestParameter('title')));
		$this->setUrl(trim($actionRef->getRequestParameter('url')));
		$this->setBody(trim($actionRef->getRequestParameter('body')));
		$this->setIsPrivate(intval($actionRef->getRequestParameter('is_private')));

		$this->setTags(TagPeer::filterTag($actionRef->getRequestParameter('tags')));

		// 对象是否为新的或是否修改过，只有在重新设置过属性后才会改变，save() 方法会重置这 2 个属性为 false
		$this->isNewPost = $this->isNew();
		$this->isModifiedPost = $this->isModified();

		return true;
	}

	// 获取 tag 数组
	public function getArrayTag() {

		static $staticTagArray, $staticTagString;

		if (empty($staticTagArray) || $staticTagString != $this->getTags()) {

			$staticTagString = $this->getTags();

			if (empty($staticTagString)) {
				$staticTagArray = array();
			} else {
				$staticTagArray = explode(TagPeer::SEPARATOR, $staticTagString);
			}
		}

		return $staticTagArray;
	}

}
