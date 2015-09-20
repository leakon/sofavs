<?php

function &makeSimpleSQL( $table_name, $table_columns ) {
	global	$database_config;
	$table_config	= array_merge( $database_config[CURRENT_ENVIRONMENT], array( 'table_name' => $table_name, 'columns' => $table_columns ) );
	$table		= & new SimpleSQL( $table_config );
	return	$table;
}

function &makeSmarty( &$config ) {
	$smarty				= & new Smarty();
	$smarty->config_dir		= $config['config'];
	$smarty->template_dir		= $config['html'];
	$smarty->compile_dir		= $config['compile'];
	$smarty->cache_dir		= $config['cache'];
	$smarty->left_delimiter		= $config['left_delimiter'];
	$smarty->right_delimiter	= $config['right_delimiter'];
	return	$smarty;
}

function showSmarty( &$template, &$info, $html ) {
	foreach( $info as $key => $val ) {
		$template->assign( $key, $val );
	}
	$template->display( $html );
	return;
}



///////////////////////////////////////



function make_auto_complete_words_to_array( &$info ) {
	if( is_array( $info ) ) {
		$idx	= 0;
		$ret	= "Array( ";
		foreach( $info as $val ) {
			if( $idx > 0 ) {
				$ret	.= " , ";
			}
			$ret	.= "'" . addslashes( $val ) . "'";
			$idx++;
		}
		$ret	.= " )";
	}
	return	$ret;
}

function title_substr( $title, $len, $english = false ) {
	$ret		= cn_substr_tag( $title, $len, $english );
	$len_ori	= strlen( $title );
	$len_ret	= strlen( $ret );
	if( $len_ori > $len_ret ) {
		$ret	= $ret . "...";
	}
	return 		$ret;
}

function xml_2_array( &$xml_doc ) {
	$a	= new XML2Array();
	$ret	= $a->parse( $xml_doc );
	return	$ret;
}

function pe( $str ) {
	echo $str . "<br />";
}

function make_js_array( $info, $var_name ) {
	if( is_array( $info ) ) {
		foreach( $info as $val ) {
			//$value	= addslashes( $val );
			$value	= $val;
			$tmp[]	= "'$value'";
		}
		$array	= implode( ", ", $tmp );
		$js	= "\nvar $var_name	= new Array( $array ); ";
		return	$js;
	}
}

function make_res_array( &$info ) {
	if( is_array( $info ) ) {
		foreach( $info as $key => $val ) {
			$tmp	= array_values( $val );
			$ret[]	= $tmp[0];
		}
		return	$ret;
	}
}

?>