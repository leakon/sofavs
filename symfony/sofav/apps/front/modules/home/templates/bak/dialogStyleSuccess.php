<?php

$dialogBackgroudColor		= 'orange';	// #9bd1fa
$dialogFilterOpacity		= 93;		// [0-9]
$dialogFilterOpacitySquare	= substr($dialogFilterOpacity * $dialogFilterOpacity, 0, 2);

?>

#sfDialogDivision b.rtop,
#sfDialogDivision b.rbottom	{display:block;}

#sfDialogDivision b.rtop b,
#sfDialogDivision b.rbottom b	{display:block; height:1px; overflow:hidden; background:<?php echo $dialogBackgroudColor ?>;}

#sfDialogDivision b.r1	{margin:0 5px;}
#sfDialogDivision b.r2	{margin:0 3px;}
#sfDialogDivision b.r3	{margin:0 2px;}

#sfDialogDivision b.rtop b.r4,
#sfDialogDivision b.rbottom b.r4	{margin:0 1px; height:2px;}

#sfDialogDivision,
#sfDialogDivision td	{background:transparent; font-family: Arial, Verdana, sans-serif; font-size:13px; color:black; padding:8px;}

#sfDialogDivision,
#sfDialogDivision b.rtop,
#sfDialogDivision b.rbottom	{width:720px;}
#sfDialogDivision #divContent	{width:700px; padding:10px; background:<?php echo $dialogBackgroudColor ?>;}

#sfDialogDivision #tableContent		{table-layout: fixed; width:700px;}
#sfDialogDivision #tableContent th	{width:80px; text-align:left; padding:1px 4px; font-size:13px; color:black;}

#sfDialogDivision #tableContent td	{width:600px; font-weight:bold; padding:1px 4px;}

#sfDialogDivision #tableContent td	{
	word-wrap:break-word;
	word-break:break-all;
	border-collapse:collapse;
	white-space:-moz-pre-wrap;
	white-space:-o-pre-wrap;
	overflow:hidden;
	xborder:1px solid red;
}

#sfDialogDivision input		{font-family: Arial, Verdana, sans-serif; font-size:13px; height:28px;}
#sfDialogDivision .inputText	{width: 590px; padding:4px;}

/*
#divContent	{filter:alpha(opacity=64); -moz-opacity:.64; opacity:.64;}
b		{filter:alpha(opacity=64); -moz-opacity:.8; opacity:.8;}
*/

#sfDialogDivision #divContent
{
	filter:alpha(opacity=<?php echo $dialogFilterOpacitySquare ?>);
	-moz-opacity:.<?php echo $dialogFilterOpacitySquare ?>;
	opacity:.<?php echo $dialogFilterOpacitySquare ?>;
}

#sfDialogDivision b
{
	filter:alpha(opacity=<?php echo $dialogFilterOpacitySquare ?>);
	-moz-opacity:.<?php echo $dialogFilterOpacity ?>;
	opacity:.<?php echo $dialogFilterOpacity ?>;
}

