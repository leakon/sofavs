<?php

/**
 * home actions.
 *
 * @package    sofav
 * @subpackage home
 * @author     Your name here
 * @version    SVN: $Id: actions.class.php 2692 2006-11-15 21:03:55Z fabien $
 */
class homeActions extends sfActions
{
	private function getServerHost() {
		return	'http://' . $_SERVER['HTTP_HOST'];
	}
  /**
   * Executes index action
   *
   */
  public function executeIndex()
  {
    $this->forward('default', 'module');
  }



	public function executeSetup() {

	#	$this->toolbarLocation	= 'http://' . $_SERVER['HTTP_HOST'] . '/home/book';
		$this->toolbarLocation	= $this->getServerHost() . '/home/book';

	}

	public function executeBook() {

		$this->setLayout(false);

		$response = $this->getResponse();

		// HTTP headers
		$response->setContentType('text/plain');
		$response->setHttpHeader('Content-Language', 'en');
		$response->setStatusCode(200);
		$response->addVaryHttpHeader('Accept-Language');
		$response->addCacheControlHttpHeader('no-cache');

	#	$this->dialogLocation	= $this->getServerHost() . '/home/dialog';


		$this->dialogLocation		= $this->getServerHost() . '/home/dialogDiv';
		$this->dialogStyleLocation	= $this->getServerHost() . '/home/dialogStyle';

	}

	public function executeDialog() {
		$this->setLayout(false);
	}

	public function executeDialogDiv() {
		$this->setLayout(false);
	}

	public function executeDialogStyle() {
		$response = $this->getResponse();

		// HTTP headers
		$response->setContentType('text/css');
		$response->setHttpHeader('Content-Language', 'en');
		$response->setStatusCode(200);
		$response->addVaryHttpHeader('Accept-Language');
		$response->addCacheControlHttpHeader('no-cache');
	}

}
