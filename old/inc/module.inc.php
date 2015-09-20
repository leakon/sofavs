<?php

// 获取最新收藏
function get_favorite( &$db, &$info, &$options ) {
	$table		= TABLE_FAV;
	$sql		= "SELECT * FROM $table ORDER BY finsttime DESC ; ";
	$res		= db_query( $db, $sql );
	$ret['total']	= count( $res );
	$ret['result']	= $res;
	return 		$ret;	
}

function get_user_data( &$db, &$info, &$options ) {
	$data['user_cate']	= get_user_cate( $db, $info );
	$data['user_tag']	= get_user_tag( $db, $info );
	$info['user_cate']	= make_js_array( $data['user_cate'], "my_categories" );
	$info['user_tag']	= make_js_array( $data['user_tag'], "my_tags" );
	return 			$info;
}

// 根据用户 id 获取用户的所有 分类
function get_user_cate( &$db, &$info, &$options = null ) {
	$userid		= $info['userid'];
	$table_left	= TABLE_USER_CATE;
	$table_right	= TABLE_CATE;
	$sql		= "
SELECT tr.fcate AS cate FROM
$table_left AS tl LEFT JOIN $table_right AS tr
ON tl.cateid = tr.id
WHERE tl.userid = $userid ; ";
	$res		= db_query( $db, $sql );
	$ret		= make_res_array( $res );
	return 		$ret;
}

// 根据用户 id 获取用户的所有 标签
function get_user_tag( &$db, &$info, &$options = null ) {
	$userid		= $info['userid'];
	$table_left	= TABLE_USER_TAG;
	$table_right	= TABLE_TAG;
	$sql		= "
SELECT tr.ftag AS tag FROM
$table_left AS tl LEFT JOIN $table_right AS tr
ON tl.tagid = tr.id
WHERE tl.userid = $userid ; ";
	$res		= db_query( $db, $sql );
	$ret		= make_res_array( $res );
	return 		$ret;
}

function save_favorite( &$db, &$info, &$options ) {
	// 网址存入 url 表，返回该条记录的 id
	$url['furl']		= $info['furl'];
	$info['urlid']		= save_unique( $db, $info, $url, TABLE_URL );
	
	// 分类存入 cate 表，返回该条记录的 id
	$cate['fcate']		= $info['fcate'];
	$info['cateid']		= save_unique( $db, $info, $cate, TABLE_CATE );
	// 把该分类和用户相关联，使这个分类成为用户的个人分类
	$info['usercateid']	= save_unique( $db, $info, $info, TABLE_USER_CATE );
	
	// 保存收藏信息，标题、标签、摘要和私有属性等信息
	$fav			= $info;
	$info['finsttime']	= time();
	$info['favid']		= save_unique( $db, $info, $fav, TABLE_FAV );
	
	// 拆分标签字段，处理每个标签
	$tag_array		= explode( SEPARATOR_TAG, $info['ftag'] );
	if( count( $tag_array ) ) {
		foreach( $tag_array as $single_tag ) {
			$tag		= array( "userid" => $info['userid'], "favid" => $info['favid'], "ftag" => $single_tag );
			$tagid		= save_unique( $db, $tag, $tag, TABLE_TAG );		// 标签存入 tag 表，返回标签 id
			$tagids[]	= $tagid;
			$tag['tagid']	= $tagid;
			$tmp		= save_unique( $db, $tag, $tag, TABLE_USER_TAG );	// 把该标签和用户相关联，使这个标签成为用户的个人标签
			$tmp		= save_unique( $db, $tag, $tag, TABLE_TAG_FAV );	// 建立标签到收藏的索引
		}
	}
	$info['tagid']		= $tagids;
	//pr( $info );
}

function save_unique( $db, $info, $unique, $table ) {
	$where	= db_make_sql_eq( $unique, $table, "and" );
	$sql	= "SELECT id FROM $table WHERE $where ; ";
	$res	= db_query( $db, $sql );
	$total	= count( $res );
	if( 0 == $total ) {		// 表中不存在相同行，插入新行
		$set	= db_make_sql_eq( $info, $table );
		$sql	= "INSERT INTO $table SET $set ; ";
		$res	= db_exec( $db, $sql );
		$ret	= mysql_insert_id();
	} else if ( 1 == $total ) {	// 表中存在一个相同行，返回行ID
		$ret	= $res[0]['id'];
	} else {			// 表中存在多个相同行，返回错误代码
		exit( 20011001 );
	}
	return	$ret;
}

function db_make_sql_eq( &$info, $table, $separator = ",", $addslashes = 1 ) {
	global	$table_struct;
	$struct	= $table_struct[$table];
	foreach( $struct as $key ) {
		$val		= $info[$key];
		if( $addslashes ) {
			$val	= addslashes( $val );
		}
		if( strlen( $val ) ) {
			$sql[]	= " $key = '$val' ";
		}
	}
	if( count( $sql ) ) {
		$ret	= implode( $separator, $sql );
	}
	return	$ret;
}


?>