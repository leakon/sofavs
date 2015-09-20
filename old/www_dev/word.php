<?php
require_once( "sofav.inc.php" );

$chars			= urldecode( $_REQUEST['chars'] );

//echo		strtoascii( $chars );

$dbconfig['local']	= array( "user" => "root", "pass" => "123456", "host" => "localhost", "db" => "test", "charset" => "utf8" );
$db			= & new SimpleDB( $dbconfig['local'] );


if( 0 ) {
	$word		= "word.txt";
	$word_content	= file_get_contents( $word );
	$word_len	= strlen( $word_content );
	$word_arr	= explode( "。", $word_content );
	
	foreach( $word_arr as $key => $val ) {
		if( strlen( $val ) ) {
			$text	= $val;
			$code	= strtoascii( $val );
			$res	= $db->exec( "INSERT INTO sanguo SET text = '$text', code = '$code'" );
		}
	}
}
//var_dump( $res );

$word			= strtoascii( $chars );
//echo	$word;


$sql			= "SELECT * FROM sanguo WHERE text LIKE '%$chars%'";
echo	$sql;
echo	"<br>";
$sql			= "SELECT * FROM sanguo WHERE MATCH( code ) AGAINST ( '$word' )";
//$sql			= "EXPLAIN " . $sql;
echo	$sql;

//$res			= $db->query( $sql );


//pr( $res );

function strtoascii( $string, $encoding = "utf8" ) {
	$string_len	= mb_strlen( $string, $encoding );
	$num_to_letter	= array(
		"num"		=> array( "/1/", "/2/", "/3/", "/3/", "/4/", "/5/", "/6/", "/7/", "/8/", "/9/", "/10/" ),
		"letter"	=> array( "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q" )
	);
	$idx		= 0;
	for( $i = 0; $i < $string_len; $i++ ) {
		$char	= mb_substr( $string, $i, 1, $encoding );
		if( ord( $char ) < 0x80 ) {
			$ret[$idx]	.= $char;
		} else {
			$idx++;
			$char_encoded	= rawurlencode( $char );
			$code		= str_replace( "%", "", $char_encoded );
			$code		= preg_replace( $num_to_letter['num'], $num_to_letter['letter'], $code );
			$ret[$idx]	= $code;
			$idx++;
		}
	}
	if( is_array( $ret ) ) {
		return	trim( implode( " ", $ret ) );
	} else {
		return	"";
	}
}


?>


<form action="">
<input type="text" name="chars">
<input type="submit" value="search">
</form>

