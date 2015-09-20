<?php
/**
 * Sofav 基础框架
 */

class Sofav {
	var $userid;
	var $username;
	var $db;
	var $tags;
	var $favorites;
	
	var $tables;
	
	var $validator;
	
	/**
	 * 构造函数
	 *
	 * @param array $info
	 * @return Sofav
	 */
	function Sofav( &$info ) {
		$this->__construct( &$info );
	}
	
	/**
	 * 构造函数
	 *
	 * @param array $info
	 */
	function &__construct( &$info ) {
		foreach( $info['tables'] as $table ) {
			$this->tables[$table]	=& makeSimpleSQL( $table, $info['tables_col'][$table] );
//			echo	$this->tables[$table]->make_columns_array();
		}
		$this->validator	= new SofavValidator();		//	实例化一个验证器
	}
	
	function remove_favorite() {
	}
	
	/**
	 * 从 GET 参数到数据库字段的转换
	 *
	 * @param array $array
	 * @return array
	 */
	function get_to_field( &$array ) {
		$map_array	= array( 'title' => FIELD_TITLE, 'url' => FIELD_URL, 'note' => FIELD_NOTE );
		foreach( $map_array as $get => $field ) {
			$ret[$field]	= $array[$get];
		}
		return	$ret;
	}
	
	/**
	 * 对表单中的数据进行处理，尤其是处理标签数组
	 *
	 * @param array $data
	 * @return array
	 */
	function fix_post_data( &$data ) {
		$ret	= $data;
		//	如果提交的标签不为空，则
		$ret[FIELD_TAGS_ARRAY]	= $this->validator->strip_null_in_array( $ret[FIELD_TAGS_ARRAY] );
		if( is_array( $ret[FIELD_TAGS_ARRAY] ) && count( $ret[FIELD_TAGS_ARRAY] ) > 0 ) {
			$ret[FIELD_TAGS]	= trim( implode( SOFAV_TAG_SEPARATOR, $ret[FIELD_TAGS_ARRAY] ) );
		}
		return	$ret;
	}
	
	/**
	 * 新增一个标签
	 *
	 * @param string $tag	单个标签
	 * @return  int
	 */
	function add_tag( $tag ) {
		$tagid			= $this->tables[TABLE_TAG]->insert( array( FIELD_TAG => $tag ) );
		return			$tagid;
	}
	
	/**
	 * 新增一批标签
	 *
	 * @param array $tag_array	标签数组
	 * @return  array		返回每个标签的ID
	 */
	function add_tags( $tag_array ) {
		$ret	= array();	//	初始化返回值为数组，以免其他函数中 foreach 语句出错
		foreach( $tag_array as $tag ) {
			$ret[$tag]	= $this->add_tag( $tag );
		}
		return	$ret;
	}
	
	/**
	 * 新增一个 fav 到 tag 的对应关系
	 *
	 * @param int $favid
	 * @param int $tagid
	 * @return int
	 */
	function add_fav_tag( $favid, $tagid ) {
		$ret	= $this->tables[TABLE_FAV_TAG]->insert( array( FIELD_FAVID => $favid, FIELD_TAGID => $tagid ) );
		return	$ret;
	}
	
	/**
	 * 新增一批 fav 到 tag 的对应关系
	 *
	 * @param int $favid
	 * @param array $tagid_arr
	 * @return array
	 */
	function add_fav_tags( $favid, $tagid_arr ) {
		$ret	= array();
		foreach( $tagid_arr as $tagid ) {
			$ret[$tagid]	= $this->add_fav_tag( $favid, $tagid );
		}
		return	$ret;
	}
	
	/**
	 * 保存一个收藏，用于新增收藏
	 *
	 * @param array $req
	 */
	function add_favorite( &$req ) {
		$is_ready	= $this->validator->add_favorite_ready( $req );
		if( $is_ready ) {
			$data				= $this->fix_post_data( $req );
			//	保存 URL ，返回 urlid
			$data[FIELD_URLID]		= $this->tables[TABLE_URL]->insert( $data );
			//	保存标签，返回 tagid (array)
			$data[FIELD_TAGID_ARRAY]	= $this->add_tags( $data[FIELD_TAGS_ARRAY] );
			//	保存 fav ，返回 favid
			$data[FIELD_FAVID]		= $this->tables[TABLE_FAV]->insert( $data );
			//	保存 favid_tagid
			$data[FIELD_FAV_TAG_ARRAY]	= $this->add_fav_tags( $data[FIELD_FAVID], $data[FIELD_TAGID_ARRAY] );
//			pr( $data );
		}
	}
	
	function get_favorite() {
		//$res	= $this->tables[TABLE_FAV]->select();
		$sql	= 'SELECT * FROM ' . TABLE_FAV . ' LIMIT 0, 20';
		$res	= $this->tables[TABLE_FAV]->query( $sql );
		return	$res;
	}
	
	function show_post( &$req ) {
	}
	
	function remove_tag() {
	}
	
	function import() {
	}
	
	function export() {
	}
	
	function search() {
	}
}

class SofavString {
	
	/**
	 * 检验字符串的长度是否在制定范围内
	 *
	 * @param string $string
	 * @param int $min
	 * @param int $max
	 * @return bool
	 */
	function strlen_in_range( $string, $min, $max ) {
		$len	= strlen( $string );
		return	( $min <= $len && $len <= $max );
	}
	
	/**
	 * 检验是否是非空字符
	 *
	 * @param string $string
	 * @return bool
	 */
	function is_not_null( $string ) {
		return	( strlen( $string ) > 0 );
	}
	
	/**
	 * 检查 $string 是否出现在数组 $array 中，用于检验取值有限的变量是否合法
	 *
	 * @param string $string
	 * @param array $array
	 * @return bool
	 */
	function is_in_array( $string, $array ) {
		foreach( $array as $value ) {
			if( $string == $value ) {
				return	true;
			}
		}
		return	false;
	}
	
	/**
	 * 删除数组中值为空的元素
	 *
	 * @param array $array
	 * @return array
	 */
	function &strip_null_in_array( &$array ) {
		$ret	= array();
		foreach( $array as $key => $val ) {
			if( $this->is_not_null( $val ) ) {
				$ret[$key]	= $val;
			}
		}
		return	$ret;
	}
	
	function cut_string( $string, $length, $dots = true ) {
		$new_string	= mb_substr( $string, 0, $length, 'UTF8' );
		if( $new_string != $string && $dots ) {
			$new_string	.= '...';
		}
		return	$new_string;
	}
	
}

class SofavValidator extends SofavString {
	
	/**
	 * 检查每一项判断的结果，有一项为 false ，则全部结果都为 false
	 *
	 * @param array $bool
	 * @param array $error
	 * @return bool
	 */
	function check( &$bool, &$error ) {
		$ret	= true;
		foreach( $bool as $idx => $val ) {
			$ret	= $ret && $val;
			if( !$val ) {
				SimpleError::catch_error( $error[$idx] );
			}
		}
		return	$ret;
	}
	
	/**
	 * 过滤掉标签数组中的无效字符和空元素
	 *
	 * @param array $array_tag
	 * @return bool
	 */
	function &filter_bad_tags( &$array_tag ) {
		foreach( $array_tag as $tag ) {
			$tag	= $this->strip_separator_in_tag( $tag );
			$tmp[]	= $tag;
		}
		$ret		=& $this->strip_null_in_array( $tmp );
		return		$ret;
	}
	
	/**
	 * 删除标签中的分隔符 SOFAV_TAG_SEPARATOR
	 *
	 * @param string $tag
	 * @return bool
	 */
	function strip_separator_in_tag( $tag ) {
		$tag	= preg_replace( '/' . SOFAV_TAG_SEPARATOR . '/i', '', $tag );
		return	$tag;
	}
	
	/**
	 * 检查标签是否合法
	 *
	 * @param string $tag
	 * @return bool
	 */
	function is_valid_tag( $tag ) {
		$tag	= $this->strip_separator_in_tag( $tag );
		$ret	= $this->strlen_in_range( $tag, 1, 255 );
		return	$ret;
	}
	
	/**
	 * 检查标签数组是否合法
	 *
	 * @param array $array_tag
	 * @return bool
	 */
	function is_valid_tag_array( &$array_tag ) {
		$ret		= true;
		$array		=& $this->filter_bad_tags( $array_tag );
		if( is_array( $array ) && count( $array ) > 0 ) {
			$total_tag	= implode( SOFAV_TAG_SEPARATOR, $array );
			$ret		= $this->strlen_in_range( $total_tag, 1, 255 );
		}
		return		$ret;
	}
	
	/**
	 * 保存收藏时检查数据
	 *
	 * @param array $info
	 * @return bool
	 */
	function add_favorite_ready( &$info ) {
		
		$bool[1]	= $this->is_not_null( $info[FIELD_USERID] );	//	用户ID
		$error[1]	= SofavError::show_error(1001);
		
		$bool[2]	= $this->strlen_in_range( $info[FIELD_URL], 1, 255 );	//	URL非空
		$error[2]	= SofavError::show_error(1002);
		
		$bool[3]	= $this->is_valid_tag_array( $info[FIELD_TAGS_ARRAY] );	//	标签数组有效
		$error[3]	= SofavError::show_error(1003);
		
		$bool[4]	= $this->strlen_in_range( $info[FIELD_NOTE], 0, 255 );	//	摘要有效
		$error[4]	= SofavError::show_error(1004);
		
		$bool[5]	= $this->is_in_array( intval( $info[FIELD_PRIVATE] ), array( 0, 1 ) );	//	私有属性有效
		$error[5]	= SofavError::show_error(1005);
		
		$bool[6]	= $this->strlen_in_range( $info[FIELD_TITLE], 1, 255 );		//	标题非空
		$error[6]	= SofavError::show_error(1006);
		
		return	$this->check( $bool, $error );
	}
	
}

class SofavUser {
	var $userid;
	
	function get_user_id() {
		return	10;
	}
}

?>