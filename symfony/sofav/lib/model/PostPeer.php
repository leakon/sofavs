<?php

/**
 * Subclass for performing query and update operations on the 'posts' table.
 *
 *
 *
 * @package lib.model
 */
class PostPeer extends BasePostPeer {

	// 显示带分页的文章列表
	public static function getList($page) {

		$pager = new sfPropelPager('Post', sfConfig::get('app_pager_post_list_size'));

		$c = new Criteria();

		// 设置查询条件
		// visitor 是注册用户
		if ($userId = sfContext::getInstance()->getUser()->getId()) {

			$cton1 = $c->getNewCriterion(self::IS_PRIVATE, 0);	// 共享的
			// 或是当前用户的
			$cton2 = $c->getNewCriterion(self::USER_ID, $userId);
			// combine them
			$cton1->addOr($cton2);
			// add to Criteria
			$c->add($cton1);

		} else {

			$c->add(self::IS_PRIVATE, 0);	// 共享的
		}

		// 按插入时间倒序
		$c->addDescendingOrderByColumn(self::ID);

		$pager->setCriteria($c);
		$pager->setPage($page);
		$pager->setPeerMethod('doSelectLeftJoinUser');
		$pager->init();

		return $pager;
	}

	public static function getSinglePost($postId) {

		$c = new Criteria();
		$c->add(self::ID, $postId);

		$result = self::doSelectLeftJoinUser($c);

		return $result[0];
	}

	// 文章表与用户表 左连接，代码参考 BasePostPeer::doSelectJoinUser(Criteria $c, $con = null)
	public static function doSelectLeftJoinUser(Criteria $c, $con = null) {
		$c = clone $c;

		if ($c->getDbName() == Propel::getDefaultDB()) {
			$c->setDbName(self::DATABASE_NAME);
		}

		PostPeer::addSelectColumns($c);
		$startcol = (PostPeer::NUM_COLUMNS - PostPeer::NUM_LAZY_LOAD_COLUMNS) + 1;
		UserPeer::addSelectColumns($c);

		// 设置连接方式为 LEFT JOIN
		$c->addJoin(PostPeer::USER_ID, UserPeer::ID, Criteria::LEFT_JOIN);

		$rs = BasePeer::doSelect($c, $con);
		$results = array();

		while($rs->next()) {

			$omClass = PostPeer::getOMClass();

			$cls = Propel::import($omClass);
			$obj1 = new $cls();
			$obj1->hydrate($rs);

			$omClass = UserPeer::getOMClass();

			$cls = Propel::import($omClass);
			$obj2 = new $cls();
			$obj2->hydrate($rs, $startcol);

			$newObject = true;
			foreach($results as $temp_obj1) {
				$temp_obj2 = $temp_obj1->getUser();
				if ($temp_obj2->getPrimaryKey() === $obj2->getPrimaryKey()) {
					$newObject = false;
					$temp_obj2->addPost($obj1);
					break;
				}
			}
			if ($newObject) {
				$obj2->initPosts();
				$obj2->addPost($obj1);
			}
			$results[] = $obj1;
		}
		return $results;
	}


	// 保存（INSERT / UPDATE）
	public static function savePost(&$actionRef) {

		// **** Step 1 ****
		if ($actionRef->getRequestParameter('id')) {
			$post = self::retrieveByPk($actionRef->getRequestParameter('id'));
			$actionRef->forward404Unless($post);
		} else {
			$post = new Post();
		}


		// **** Step 2 ****
		// 设置对象的属性
		$post->setProperties($actionRef);


		// **** Step 3 ****
		// 保存 tag
		$newTagArray = array();
		if ($post->isModifiedPost()) {

			// 得到 post 的 tag 数组
			$submittedTagArray = $post->getArrayTag();

			// 保存新 tag，并返回包含状态信息的 tag 数组
			$newTagArray = TagPeer::saveUserTags($actionRef->getUser()->getId(), $submittedTagArray);

			// 以 tag 数组为准重新生成 post 表用的 tag 字符串
			$post->setTags(TagPeer::arrayToString($newTagArray));
		}
		$saveSuccess = $post->save();


		// **** Step 4 ****
		// 保存 post_tag 对应关系
		$postId = $post->getId();	// 得到 post ID
		$res = PostTagPeer::savePostTag($postId, $newTagArray);


		// **** Step 5 ****
		// 结束，返回 post 对象
		if ($saveSuccess || !$post->isModifiedPost()) {
			return $post;
		} else {
			return null;
		}
	}


	// 查询相同的 url 记录集
	public static function findSimilar(&$recordRef) {

		$url = $recordRef->getUrl();

		if (!empty($url)) {

			$c = new Criteria();
	//		$c->add(self::URL, $url);

			// 采用 yaoyao 的建议，改为模糊查询
			$c->add(self::URL, $url . '%', Criteria::LIKE);

			$c->addDescendingOrderByColumn(self::ID);
			$c->setLimit(10);
			return self::doSelectLeftJoinUser($c);

		} else {
			return null;
		}
	}

}
