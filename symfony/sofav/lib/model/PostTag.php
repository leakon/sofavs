<?php

/**
 * Subclass for representing a row from the 'post_tag' table.
 *
 *
 *
 * @package lib.model
 */
class PostTag extends BasePostTag {

	/**
	 * 删除本条记录
	 * 基类的删除方法有 bug，需要 buildCriteria，然而只有 isColumnModified 后，才能生成有效的 Criteria
	 * 因此，本方法在 doDelete 的时候传入了临时生成的 Criteria 对象
	 *
	 * @param unknown_type $con
	 */
	public function delete($con = null) {

		if ($this->isDeleted()) {
			throw new PropelException("This object has already been deleted.");
		}

		if ($con === null) {
			$con = Propel::getConnection(PostTagPeer::DATABASE_NAME);
		}

		try {

			$criteria = new Criteria();
			$criteria->add(PostTagPeer::POST_ID, $this->getPostId());
			$criteria->add(PostTagPeer::TAG_ID, $this->getTagId());

			$con->begin();
			PostTagPeer::doDelete($criteria, $con);
			$this->setDeleted(true);
			$con->commit();

		} catch (PropelException $e) {
			$con->rollback();
			throw $e;
		}
	}

}
