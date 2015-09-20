<?php

/**
 * Subclass for performing query and update operations on the 'tags' table.
 *
 *
 *
 * @package lib.model
 */
class TagPeer extends BaseTagPeer {

	const SEPARATOR = ',';

/*
	const TAG_STATUS = 'TagStatus';
	const TAG_STATUS_NEW = 1;
	const TAG_STATUS_DELETE = -1;
*/


	public static function getUserTag($userId) {

		$c = new Criteria();
		$c->add(parent::USER_ID, $userId);

		return parent::doSelect($c);
	}

	// 把 tag 进行索引编码，为了保证唯一性，先要全部转换成小写
	private static function buildIndex($tag) {
		return md5(strtolower(trim($tag)));
	}

	/**
	 * 保存 tag，根据用户已有的全部 tag 列表，只插入新 tag，并返回 tag 数组
	 *
	 * @param int $userId
	 * @param array $submittedTagArray	用户提交的 tag 数组
	 * @return array
	 */
	public static function saveUserTags($userId, $submittedTagArray) {

		if (empty($oldTagArray)) {
			$oldTagArray = array();
		}

		// 搜索该用户的全部 tag
		// $userTags is an Object Array
		$userTags = self::getUserTag($userId);

		// 对已存的全部 tag 建索引
		$indexedUserTagArray = array();
		foreach ($userTags as $tagObject) {
			$tagIndex = self::buildIndex($tagObject->getTag());
			$indexedUserTagArray[$tagIndex] = $tagObject->toArray();
		}

		// 消重，并生成 md5 形式的索引
		$submittedTagArray = self::toUniqueArray($submittedTagArray, true);

		$newTags = array();	// $newTags[0] = array(id, user_id, tag)
		// 遍历用户提交的 tag 数组
		foreach ($submittedTagArray as $tagIndex => $tag) {
			if (empty($indexedUserTagArray[$tagIndex])) {
				// 新 tag，插入数据库
				$tagObj = new Tag();
				$tagObj->setUserId($userId);	// user_id
				$tagObj->setTag($tag);		// tag
				$tagObj->save();
				$newTags[$tagIndex] = $tagObj->toArray();
			} else {
				// 用户以前保存过的旧 tag
				$newTags[$tagIndex] = $indexedUserTagArray[$tagIndex];
			}
		}

/*
		kk::pr($newTags);
		exit;
*/

		return $newTags;
	}

	// tag 数组消重，如果有相同项，则以最后一次输入的大小写形式为准
	public static function toUniqueArray($tagArray, $md5Index = false) {

		$uniqueArray = array();

		foreach ($tagArray as $tag) {
			$tag = trim($tag);
			$tagIndex = self::buildIndex($tag);
			$uniqueArray[$tagIndex] = $tag;
		}

		if ($md5Index) {
			return $uniqueArray;
		}

		$numberIndexArray = array();
		foreach ($uniqueArray as $tag) {
			$numberIndexArray[] = $tag;
		}

		return $numberIndexArray;
	}

	public static function filterTag($rawTagString) {

		// 把特殊符号替换成标准分隔符
		$stringTag = str_replace('　', ' ', trim($rawTagString));
		$stringTag = str_replace('；', self::SEPARATOR, $stringTag);
		$stringTag = str_replace('，', self::SEPARATOR, $stringTag);
		$stringTag = preg_replace('/[\`\'\"\;]/i', self::SEPARATOR, $stringTag);
		$stringTag = preg_replace('/\s+/i', ' ', $stringTag);						// 去掉连续的空格
		$stringTag = preg_replace('/' . self::SEPARATOR . '\s+/i', self::SEPARATOR, $stringTag);	// 去掉连续的空格
		$stringTag = preg_replace('/\s+' . self::SEPARATOR . '/i', self::SEPARATOR, $stringTag);	// 去掉连续的空格
		$stringTag = preg_replace('/' . self::SEPARATOR . '+/i', self::SEPARATOR, $stringTag);		// 去掉连续的分隔符
		$stringTag = preg_replace('/^' . self::SEPARATOR . '+/i', '', $stringTag);			// 去掉头部的分隔符
		$stringTag = preg_replace('/' . self::SEPARATOR . '+$/i', '', $stringTag);			// 去掉尾部的分隔符

		return $stringTag;
	}


	public static function arrayToString($userTagArray) {

		// ****HardcodeFieldNames****
		if (empty($userTagArray['Id'])) {
			$array = array();
			foreach ($userTagArray as $tagInfo) {
				$array[] = $tagInfo['Tag'];
			}
		} else {
			$array =& $userTagArray;
		}

//		kk::pr($userTagArray);exit;

		if (count($array)) {
			return implode(self::SEPARATOR, $array);
		} else {
			return '';
		}
	}


	public static function stringToArray($stringTag) {

		$retTagArray = array();

		$stringTag = self::filterTag($stringTag);

		if (strpos($stringTag, self::SEPARATOR) === false) {
			return array($stringTag);
		}

		$arrayTag = explode(self::SEPARATOR, $stringTag);
		// 消重
		$arrayTag = self::toUniqueArray($arrayTag);

		foreach($arrayTag as $tagWord) {
			if(!empty($tagWord)) {
				$retTagArray[] = $tagWord;
			}
		}

		return $tagArray;
	}

}
