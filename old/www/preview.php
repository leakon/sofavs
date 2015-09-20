<?php
require_once( "sofav.inc.php" );

$url		= $_REQUEST['url'];

echo		show_thumbnail( $url );

function show_thumbnail( $url ) {
	if( strlen( $url ) ) {
		$servers	= make_list( $url );
		foreach( $servers as $key => $val ) {
			$contents	= file_get_contents( $val );
			$length		= strlen( $contents );
			if( $length > 512 ) {
				return	$contents;
			}
		}
	}
	return	0;
}

function make_list( $url ) {
	$url_encoded	= $url;
	for( $i = 0; $i < 26; $i++ ) {
		$letter		= chr( 97 + $i );
		$ret[]		= "http://$letter.googlepreview.com/preview?s=$url_encoded";
	}
	$ret[]		= "http://open.thumbshots.org/image.pxf?url=$url_encoded";
	$ret[]		= "http://img.bettersearch.zottmann.org/?url=$url_encoded";
	
	return		$ret;
}

?>