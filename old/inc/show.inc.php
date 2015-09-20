<?php

/*
function show_index( &$info, &$req, &$options ) {
	$db		= createDatabaseInstance( $GLOBALS['db_conf'][DB_CONF] );
	$info[TPL_MAIN]	= "main.html";
	$info['recent']	= get_favorite( $db, $req, $options );
	return	$info;
}

function show_add( &$info, &$req, &$options ) {
	$db		= createDatabaseInstance( $GLOBALS['db_conf'][DB_CONF] );
	if( "save" == $req[F_ACT] ) {
		save_favorite( $db, $req, $options );
	}
	
	$info['userid']	= $_SESSION[NAME_PRO][SESS_USER][SESS_ID];
	$data		= get_user_data( $db, $info, $options );
	
	$info[F_ACT]	= "save";
	$info[TPL_MAIN]	= "add.html";
	return	$info;
}
*/

function &show_mylist( &$info, &$req, &$options ) {
	
	$info['user']	= $req['user'];
//	SimpleError::alert( $info['user'] );
	$info['list']	= $info[MYSOFAV]->get_favorite();
	
	$info['body']	= 'list.html';
	
	return	$info;
}

function &show_post( &$info, &$req, &$options ) {
	
	if( 'save' == $req['act'] ) {
		$info[MYSOFAV]->add_favorite( $req );
	} else {
		$info[MYSOFAV]->show_post( $req );
	}
	
	$info		= array_merge( $info, $info[MYSOFAV]->get_to_field( $req ) );
	
	$info['body']	= 'post.html';
	
	return	$info;
}

/**
 * 批量导入
 * 开发阶段一次性导入10万条数据，用于压力测试
 *
 * @param array $info
 * @param array $req
 * @param array $options
 */
function &batch_insert( &$info, &$req, &$options ) {
	set_time_limit(0);
	$res			= $info[MYSOFAV]->tables[TABLE_QHCMS]->select();
	
	$time_array		= array();
	$data['userid']		= $req['userid'];
	
	foreach( $res as $idx => $line ) {
		
		$time_array[$idx]		= date( 'H:i:s' );	//	计时
		
		unset( $data[FIELD_TAGS_ARRAY] );
		$data[FIELD_TITLE]		= $line['title'];	//	标题
		$data[FIELD_URL]		= $line['surl'];	//	URL
		$data[FIELD_NOTE]		= mb_substr( strip_tags( $line['content'] ), 0, 80, 'UTF8' );	//	摘要
		$data[FIELD_PRIVATE]		= rand( 0, 1 );		//	私有标签
		$data[FIELD_INSTTIME]		= time();		//	插入时间
		if( strlen( $line['tag'] ) ) {
			$data[FIELD_TAGS_ARRAY]		= explode( ',', $line['tag'] );		//	TAG
			$data[FIELD_TAGS_ARRAY]		= array_slice( $data[FIELD_TAGS_ARRAY], 0, 4 );
		}
		$info[MYSOFAV]->add_favorite( $data );

	}
	
	//	把测试结果写进日志文件
	$content	= '';
	foreach( $time_array as $idx => $time ) {
		$content	.= "$idx	$time\n";
	}
	$log_file	= PATH_HOME_INC_LOG . 'insert.log';
	SimpleError::write_log( $log_file, $content, 'w+' );
	echo		'Done!';
	$info['body']	= 'post.html';
	
	return	$info;
}

function &batch_list( &$info, &$req, &$options ) {
	set_time_limit(0);
	
	$time_array		= array();
	
	for( $i = 0; $i < 100000; $i++ ) {
		$time_array[$i]		= date( 'H:i:s' );	//	计时
		$id			= rand( 0, 99900 );
		$count			= rand( 1, 90 );
		$sql			= 'SELECT * FROM ' . TABLE_FAV . " WHERE id > $id LIMIT 0, $count";
		$res			= $info[MYSOFAV]->tables[TABLE_FAV]->query( $sql );
	}
	
	//	把测试结果写进日志文件
	$content	= '';
	foreach( $time_array as $idx => $time ) {
		$content	.= "$idx	$time\n";
	}
	$log_file	= PATH_HOME_INC_LOG . 'list.log';
	SimpleError::write_log( $log_file, $content, 'w+' );
	echo		'Done!';
	$info['body']	= 'post.html';
	
	return	$info;
}

function fav_foreach( &$info, &$req, &$options ) {
	set_time_limit(0);
	
}

?>