<?php

$format	= 'select kavkey from ini_kav_keys where id in ( %s ) ;';

$where	= '1';

$distance	= 2300;
$last		= 0;
for( $i = 0; $i < 1600; $i++ ) {
	$append		= rand( 1, $distance );
	$last		+= $append;
	$arr[]		= $last;
}

//shuffle( $arr );
//shuffle( $arr );
//shuffle( $arr );
//shuffle( $arr );
//shuffle( $arr );

$where		= implode( ', ', $arr );

$res	= sprintf( $format, $where );

//echo	$last . '<br />';

echo	$res;

?>