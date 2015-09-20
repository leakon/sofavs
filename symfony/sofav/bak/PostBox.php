<?php

class PostBox {

	private
		$userId, $title, $url, $tags, $body, $isPrivate;

	public function __construct() {

	}

	public function loadProperty( &$actionRef ) {

		$this->userId		= $actionRef->getUser()->getId();
		$this->title		= trim($actionRef->getRequestParameter('title'));
		$this->url		= trim($actionRef->getRequestParameter('url'));
		$this->tags		= trim($actionRef->getRequestParameter('tags'));
		$this->body		= trim($actionRef->getRequestParameter('body'));
		$this->isPrivate	= intval($actionRef->getRequestParameter('is_private'));

		return true;

	}

	public function getTagString() {

		$tagString = implode(';', $this->getTagArray());

		if (!empty($tagString)) {
			$tagString .= ';';
		}

		return $tagString;
	}

	public function getTagArray() {

		$tag = $this->tags;
		$tag = str_replace('　', ' ', $tag);
		$tag = str_replace('；', ';', $tag);
		$tag = str_replace('，', ';', $tag);
		$tag = preg_replace('/[\`\'\"\,]/i', ';', $tag);
		$tag = preg_replace('/\s+/i', ' ', $tag);
		$tag = preg_replace('/\;+/i', ';', $tag);

		if (strpos($tag, ';') === false) {
			return array($tag);
		}

		$array = explode(';', $tag);

		$tagArray = array();
		foreach($array as $tagWord) {
			$tagWord = trim($tagWord);
			if($tagWord) {
				$tagArray[] = $tagWord;
			}
		}

		return $tagArray;
	}

	public function getUserId() {
		return $this->userId;
	}

	public function getTitle() {
		return $this->title;
	}

	public function getUrl() {
		return $this->url;
	}

	public function getBody() {
		return $this->body;
	}

	public function getIsPrivate() {
		return $this->isPrivate;
	}

}