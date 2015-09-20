<?php
ob_start();
?>

<div id="sfDialogDivision">
<b class="rtop"><b class="r1"></b><b class="r2"></b><b class="r3"></b><b class="r4"></b></b>

<div id="divContent">
	<div><span><a href="#" onclick="__SFDialogInstance=!__SF_Doc_Refer.body.removeChild(__SFDialogInstance); return false;">Close</a></span><span><?php echo $_REQUEST['un'] ?> at <?php echo date('Y-m-d H:i:s') ?></span></div>
<table id="tableContent">
<?php

$_REQUEST['long']	= 'http://www.baidu.com/s?tn=ichuner_4_pg&ie=gb2312&bs=%DA%B9%C2%B8&sr=&z=&cl=3&f=8&wd=%B9%F9%B5%C2%B8%D9&ct=0&ie=gb2312&bs=%DA%B9%C2%B8&sr=&z=&cl=3&f=8&wd=%B9%F9%B5%C2%B8%D9&ie=gb2312&bs=%DA%B9%C2%B8&sr=&z=&cl=3&f=8&wd=%B9%F9%B5%C2%B8%D9&';

foreach ($_REQUEST as $key => $val) {
	echo	'<tr><th> ' . $key . ' </th><td><input class="inputText" type="text" name="url" value="' . trim($val) . '" /></td></tr>';
}
?>
</table>
</div>

<b class="rbottom"><b class="r4"></b><b class="r3"></b><b class="r2"></b><b class="r1"></b></b>
</div>
<?php
$strDialog	= ob_get_contents();
ob_end_clean();

if (1) {

	$strDialog	= str_replace("\r\n", "\n", $strDialog);
	$strDialog	= str_replace("\n", "", $strDialog);
	$strDialog	= str_replace("'", "\\'", $strDialog);

#	echo	"alert(__sfDialogScriptContent);";

	echo	"__sfDialogScriptContent='$strDialog';";


#	$strDialog	= str_replace("'", "\\\'", $strDialog);
#	echo	"eval('__sfDialogScriptContent=\'$strDialog\'');";

#	echo	"alert(__sfDialogScriptContent);";

#	echo	"alert('ok');";


} else {
	echo	$strDialog;
}

?>