<?php

$sofav_error[1001]	= '非法用户ID';
$sofav_error[1002]	= '链接为空或字数过多';
$sofav_error[1003]	= '标签字数过多';
$sofav_error[1004]	= '摘要字数过多';
$sofav_error[1005]	= '私有收藏参数无效';
$sofav_error[1006]	= '标题为空或字数过多';

class SofavError {
		
	function show_error( $id ) {
		global	$sofav_error;
		return	$sofav_error[$id];
	}
	
}

?>