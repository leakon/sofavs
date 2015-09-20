<?php

/**
 * Subclass for performing query and update operations on the 'post_tag' table.
 *
 *
 *
 * @package lib.model
 */
class PostTagPeer extends BasePostTagPeer {

	const STATUS_EXIST	= 1;	// 已存在
	const STATUS_INSERT	= 2;	// 添加
	const STATUS_DELETE	= -1;	// 删除

	public static function getPostTag($postId) {

		$c = new Criteria();
		$c->add(self::POST_ID, $postId);

		return parent::doSelect($c);
	}

	public static function deletePostTag($postId, $tagId) {

		$criteria = new Criteria();
		$criteria->add(PostTagPeer::POST_ID, $postId);
		$criteria->add(PostTagPeer::TAG_ID, $tagId);

		self::doDelete($criteria);
	}

	public static function savePostTag($postId, $postTagInfoArray) {

		// 与 postId 对应的全部 tag
		$userPostTagArray = array();
		foreach (self::getPostTag($postId) as $obj) {
			$userPostTagArray[ $obj->getTagId() ] = self::STATUS_DELETE;	// 默认设置成删除标记
		}

		$tagIdArray = array();
		// ****HardcodeFieldNames****
		foreach ($postTagInfoArray as $tagIndex => $tagInfo) {
			$tagId = $tagInfo['Id'];

			if (empty($userPostTagArray[$tagId])) {
				// 新的对应关系，进行插入操作
				$userPostTagArray[$tagId] = self::STATUS_INSERT;
				$obj = new PostTag();
				$obj->setPostId($postId);
				$obj->setTagId($tagId);
				$obj->save();
			} else {
				// 对应关系已存在，只需重置标记
				$userPostTagArray[$tagId] = self::STATUS_EXIST;
			}
		}

		foreach ($userPostTagArray as $tagId => $status) {

			if (self::STATUS_DELETE == $status) {

				self::deletePostTag($postId, $tagId);

			}

		}

		return $userPostTagArray;
	}

}
