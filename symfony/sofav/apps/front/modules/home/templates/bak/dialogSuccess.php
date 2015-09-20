<?php

$dialogBackgroudColor		= 'orange';	// #9bd1fa
$dialogFilterOpacity		= 93;		// [0-9]
$dialogFilterOpacitySquare	= substr($dialogFilterOpacity * $dialogFilterOpacity, 0, 2);

?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">
<head>
<title>Dialog</title>
<meta http-equiv="content-type" content="text/html; charset=utf8">
<style type="text/css">
b.rtop, b.rbottom	{display:block;}
b.rtop b, b.rbottom b	{display:block; height:1px; overflow:hidden; background:<?php echo $dialogBackgroudColor ?>;}
b.r1	{margin:0 5px;}
b.r2	{margin:0 3px;}
b.r3	{margin:0 2px;}
b.rtop b.r4, b.rbottom b.r4	{margin:0 1px; height:2px;}

body, td	{background:transparent; font-family: Arial, Verdana, sans-serif; font-size:13px; padding:8px;}

body, b.rtop, b.rbottom	{width:720px;}
#divContent		{width:700px; padding:10px; background:<?php echo $dialogBackgroudColor ?>;}

#tableContent		{table-layout: fixed; width:700px;}
#tableContent th	{width:80px; text-align:left; padding:1px 4px;}

#tableContent td	{width:600px; font-weight:bold; padding:1px 4px;}

#tableContent td	{
	word-wrap:break-word;
	word-break:break-all;
	border-collapse:collapse;
	white-space:-moz-pre-wrap;
	white-space:-o-pre-wrap;
	overflow:hidden;
	xborder:1px solid red;
}

input		{font-family: Arial, Verdana, sans-serif; font-size:13px;}
.inputText	{width: 590px; padding:4px;}

/*
#divContent	{filter:alpha(opacity=64); -moz-opacity:.64; opacity:.64;}
b		{filter:alpha(opacity=64); -moz-opacity:.8; opacity:.8;}
*/

#divContent	{filter:alpha(opacity=<?php echo $dialogFilterOpacitySquare ?>); -moz-opacity:.<?php echo $dialogFilterOpacitySquare ?>; opacity:.<?php echo $dialogFilterOpacitySquare ?>;}
b		{filter:alpha(opacity=<?php echo $dialogFilterOpacitySquare ?>); -moz-opacity:.<?php echo $dialogFilterOpacity ?>; opacity:.<?php echo $dialogFilterOpacity ?>;}
</style>

<script type="text/javascript">

function closeIFrame() {

//	window.close();
//	alert(322);
//	document.body.style.display = 'none';

//	window.parent.__SFDialogInstance = null;

	alert(parent.location);

//	var obj	= parent.document.getElementById('SofavBookmarkToolBar');
//	alert(obj);
	return false;
}

//alert('input');

</script>

</head>

<body>
<b class="rtop"><b class="r1"></b><b class="r2"></b><b class="r3"></b><b class="r4"></b></b>

<div id="divContent">
	<div><span><a href="#" onclick="return closeIFrame();">Close</a></span><span><?php echo $_REQUEST['un'] ?> at <?php echo date('Y-m-d H:i:s') ?></span></div>
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
</body>
</html>