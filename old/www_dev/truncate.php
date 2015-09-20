<?php
require_once( "sofav.inc.php" );

//pr( $info[MYSOFAV]->tables );

foreach( $info[MYSOFAV]->tables as $table => $val ) {
	if( $table != TABLE_QHCMS ) {
		$info[MYSOFAV]->tables[$table]->truncate();
	}
}

echo	"Done!";

?>
