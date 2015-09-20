<?php

$arrPassport	= array();

if (1) {

	$arrPassport[]	= $sf_context->getModuleName();
	$arrPassport[]	= $sf_context->getActionName();

}

if ($sf_user->getId()) {

	$arrPassport[]	= sprintf('<b>%s</b>', $sf_user->getUsername());
	$arrPassport[]	= link_to('Account', 'accounts/manage');
	$arrPassport[]	= link_to('Sign out', 'accounts/logout');

} else {

	$arrPassport[]	= link_to('Sign in', 'accounts/login');
	$arrPassport[]	= link_to('Sign up', 'accounts/create');
}

$arrPassport[]	= link_to('Secure', 'accounts/secure');

if (isset($GLOBALS['simple_user_status'])) {
	$arrPassport[]	=  $GLOBALS['simple_user_status'];
}

echo	implode(' | ', $arrPassport);
