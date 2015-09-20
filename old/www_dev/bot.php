<?php
set_time_limit(0);
require_once( 'sofav.inc.php' );
require_once( PATH_BASE_CLASS . 'curl.class.php' );

define( 'HREF_REGEX',	"/\<a href=[\'\"\\s]([^\'\"\\s\\<]+)[\'\"\\s][^\\<]*>([^\\<]+)\<\/a>/i" );
define( 'HREF_PREFIX',	"/^http/i" );
define( 'HREF_FILE',	'files/res.txt' );
define( 'ARRAY_HREF',	1 );
define( 'ARRAY_TITLE',	2 );
define( 'BOT_DEGREE',	100 );

$curl	= new Curl_Service(4);
$total	= 0;
write_file( HREF_FILE, '', 'w+' );

$domains	= array(
	'http://www.hao123.com/',
	'http://www.265.com/',
	'http://site.riyou.com/',
	'http://www.qihoo.com/',
	'http://www.sina.com.cn/',
	'http://www.sohu.com/',
	'http://www.163.com/',
	'http://www.qq.com/',
	'http://www.5566.net/',
	'http://www.9991.com/',
);

foreach( $domains as $url ) {
	get_domain_url( $url );
}

echo	$total;

function get_domain_url( $url ) {
	global		$curl;
	static		$record;
	$tmp		= parse_url( $url );
	$host		= 'http://' . $tmp['host'] . '/';
	$record[$host]	+= 1;
	
	//	限制某个域名的抓取深度
	if( $record[$host] < BOT_DEGREE ) {
//		$content	= file_get_contents( $url );
		$content	= $curl->curl_get_content( $url );
		preg_match_all( HREF_REGEX, $content, $m );
		foreach( $m[ARRAY_HREF] as $idx => $href ) {
			if( preg_match( HREF_PREFIX, $href ) ) {
				save_href_title( $href, $m[ARRAY_TITLE][$idx] );
			} else {
				$url	= $host . $href;
				get_domain_url( $url );
			}
		}
	}
	return;
}

function save_href_title( $href, $title ) {
	global	$total;
	$total++;
	$title	= trim( $title );
	$line	= "$title	$href\n";
	write_file( HREF_FILE, $line, 'a+' );
}


?>