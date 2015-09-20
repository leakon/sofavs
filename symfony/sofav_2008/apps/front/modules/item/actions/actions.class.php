<?php

/**
 * item actions.
 *
 * @package    sofav
 * @subpackage item
 * @author     Your name here
 * @version    SVN: $Id: actions.class.php 2692 2006-11-15 21:03:55Z fabien $
 */
class itemActions extends sfActions
{
  /**
   * Executes index action
   *
   */
  public function executeIndex()
  {
    $this->forward('default', 'module');
  }




	public function executeCreate() {



	}


	public function executeUpdateItem() {


		if ($this->getRequest()->getMethod() == sfRequest::POST) {

			$itemId = $this->getRequestParameter('id');

			$item	= new Item();

			$item->title		= $this->getRequestParameter('title');
			$item->url		= $this->getRequestParameter('url');
			$item->description	= $this->getRequestParameter('description');

			$boolSaveOk	= $item->save();

			if ($item->isModified() && !$boolSaveOk) {

				echo	'Something wrong when updating settings.';
			}

		}

		$this->redirect('item/show?id=' . $item->id);


	}

	public function executeShow() {

		$this->item	= new Item($this->getRequestParameter('id'));

	}


}
