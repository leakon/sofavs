<?php

$fp	= fopen( 'bg_program_delay.log', 'w+' );

for( $i = 0; $i < 30; $i++ ) {
	$line		= time() . ' -> ' . date( 'Y-m-d H:i:s' ) . "\n";
	echo		$line;
	fwrite( $fp, $line );
	sleep( 2 );
}

?>