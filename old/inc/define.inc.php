<?php
define( 'MYSOFAV',		'sofav' );

define( 'SOFAV_TASK',		'task' );
define( 'SOFAV_FRAME',		'frame.html' );
define( 'SOFAV_TAG_SEPARATOR',	' ' );		//	标签分隔符

//	数据库字段定义 开始
define( 'FIELD_USERID',		'userid' );
define( 'FIELD_URLID',		'urlid' );
define( 'FIELD_TAGID',		'tagid' );
define( 'FIELD_FAVID',		'favid' );

define( 'FIELD_TITLE',		'ftitle' );
define( 'FIELD_URL',		'furl' );
define( 'FIELD_TAGS',		'ftags' );
define( 'FIELD_TAGS_ARRAY',	'ftags_array' );
define( 'FIELD_NOTE',		'fnote' );
define( 'FIELD_PRIVATE',	'fprivate' );
define( 'FIELD_INSTTIME',	'finsttime' );
define( 'FIELD_EDITTIME',	'fedittime' );
define( 'FIELD_ISBLOCKED',	'fisblocked' );

define( 'FIELD_TAG',		'ftag' );

define( 'FIELD_NAME',		'fname' );
define( 'FIELD_PASS',		'fpass' );
define( 'FIELD_MAIL',		'fmail' );
//	数据库字段定义 结束

define( 'SESS_ID',		'id' );
define( 'SESS_NAME',		'name' );
define( 'SESS_USER',		'user' );

define(	'TABLE_USER',		'user' );
define(	'TABLE_TAG',		'tag' );
define(	'TABLE_URL',		'url' );
define(	'TABLE_FAV',		'fav' );
define(	'TABLE_USER_TAG',	'user_tag' );
define(	'TABLE_FAV_TAG',	'fav_tag' );
define(	'TABLE_QHCMS',		'qhcms' );

$info['tables']			= array( TABLE_USER, TABLE_TAG, TABLE_URL, TABLE_FAV, TABLE_USER_TAG, TABLE_FAV_TAG, TABLE_QHCMS );

$info['tables_col'][TABLE_USER]	= array( 'id', 'fname', 'fpass', 'fmail' );
$info['tables_col'][TABLE_TAG]	= array( 'id', 'ftag' );
$info['tables_col'][TABLE_URL]	= array( 'id', 'furl', 'fhasimg' );
$info['tables_col'][TABLE_FAV]	= array( 'id', 'userid', 'urlid', 'ftitle', 'furl', 'ftags', 'fnote', 'fprivate', 'finsttime', 'fedittime', 'fisblocked' );
$info['tables_col'][TABLE_USER_TAG]	= array( 'id', 'userid', 'tagid' );
$info['tables_col'][TABLE_FAV_TAG]	= array( 'id', 'favid', 'tagid' );
$info['tables_col'][TABLE_QHCMS]	= array( 'id', 'title', 'surl', 'tags', 'content' );


define( 'FIELD_TAGID_ARRAY',		'tagid_array' );
define( 'FIELD_FAV_TAG_ARRAY',		'fav_tag_array' );


$info['path_images']		= DOMAIN_FILES	. 'images/';
$info['path_css']		= DOMAIN_FILES	. 'css_200612171344/';
$info['path_js']		= DOMAIN_FILES	. 'js_200612171344/';


class page_img extends page {

	function setBtn() {
		$this->_currClass	= 'red14b';
		$this->_strPrevPage	= '上一页';
		$this->_strNextPage	= '下一页';
		$this->_strNumPage	= 'NUM';
		$this->_strCurrPage	= 'NUM';
		$this->_separator	= ' | ';
	}
	
	function show( $page = 1 ) {	
		if ( 0 && $this->_showFirstPage ) {	// 显示首页
			$this->_result	.= $this->_resFirstPage;
			$this->_result	.= $this->_separator;
		}
		if ( $this->_showPrevPage ) {	// 显示上页
			$this->_result	.= $this->_resPrevPage;
			$this->_result	.= $this->_separator;
		}
		if ( $this->_totalPages > 1 ) {	// 显示数码页
			$this->_result	.= implode( $this->_separator, $this->_urlNumPage );
		}
		if ( $this->_showNextPage ) {	// 显示下页
			$this->_result	.= $this->_separator;
			$this->_result	.= $this->_resNextPage;
		}		
		if ( 0 && $this->_showLastPage ) {	// 显示末页
			$this->_result	.= $this->_separator;
			$this->_result	.= $this->_resLastPage;
		}
		return $this->_strBlockHead . $this->_result . $this->_strBlockFoot;
	}
}

?>