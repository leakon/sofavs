<?php

class UserValidator extends sfValidator {

	public function initialize($context, $parameters = null) {
		// initialize parent
		parent::initialize($context);

		// set defaults
		$this->setParameter('exists_error', 'Invalid input');

		$this->getParameterHolder()->add($parameters);

		return true;
	}

	public function execute(&$username, &$error) {

		$c = new Criteria();
		$c->add(UserPeer::USERNAME, $username);
		$user = UserPeer::doSelectOne($c);

		// user exists
		if ($user) {

			$error = $this->getParameterHolder()->get('exists_error');

			return	false;

		} else {

			return	true;

		}
	}

}