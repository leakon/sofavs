<?php

// ��ȡ�����ղ�
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

// �����û� id ��ȡ�û������� ����
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

// �����û� id ��ȡ�û������� ��ǩ
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
	// ��ַ���� url �����ظ�����¼�� id
	$url['furl']		= $info['furl'];
	$info['urlid']		= save_unique( $db, $info, $url, TABLE_URL );
	
	// ������� cate �����ظ�����¼�� id
	$cate['fcate']		= $info['fcate'];
	$info['cateid']		= save_unique( $db, $info, $cate, TABLE_CATE );
	// �Ѹ÷�����û��������ʹ��������Ϊ�û��ĸ��˷���
	$info['usercateid']	= save_unique( $db, $info, $info, TABLE_USER_CATE );
	
	// �����ղ���Ϣ�����⡢��ǩ��ժҪ��˽�����Ե���Ϣ
	$fav			= $info;
	$info['finsttime']	= time();
	$info['favid']		= save_unique( $db, $info, $fav, TABLE_FAV );
	
	// ��ֱ�ǩ�ֶΣ�����ÿ����ǩ
	$tag_array		= explode( SEPARATOR_TAG, $info['ftag'] );
	if( count( $tag_array ) ) {
		foreach( $tag_array as $single_tag ) {
			$tag		= array( "userid" => $info['userid'], "favid" => $info['favid'], "ftag" => $single_tag );
			$tagid		= save_unique( $db, $tag, $tag, TABLE_TAG );		// ��ǩ���� tag �����ر�ǩ id
			$tagids[]	= $tagid;
			$tag['tagid']	= $tagid;
			$tmp		= save_unique( $db, $tag, $tag, TABLE_USER_TAG );	// �Ѹñ�ǩ���û��������ʹ�����ǩ��Ϊ�û��ĸ��˱�ǩ
			$tmp		= save_unique( $db, $tag, $tag, TABLE_TAG_FAV );	// ������ǩ���ղص�����
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
	if( 0 == $total ) {		// ���в�������ͬ�У���������
		$set	= db_make_sql_eq( $info, $table );
		$sql	= "INSERT INTO $table SET $set ; ";
		$res	= db_exec( $db, $sql );
		$ret	= mysql_insert_id();
	} else if ( 1 == $total ) {	// ���д���һ����ͬ�У�������ID
		$ret	= $res[0]['id'];
	} else {			// ���д��ڶ����ͬ�У����ش������
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