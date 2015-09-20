<?php

class HelperView {

	public static function getRefer() {

	#	$request	= $this->getContext()->getRequest();
		$request	= sfContext::getInstance()->getRequest();

		if ($reqRefer = $request->getParameter('refer')) {
			// first, check the request look for refer url
			return	$reqRefer;

		} else if ($browserRefer = $request->getReferer()) {
			// second, check the browser refer
			return	$browserRefer;

		}

		return	'';
	}


	public static function printSeq($first, $second) {
		return	isset($first) && strlen($first) ? $first :
				(isset($second) ? $second : '');
	}

}

