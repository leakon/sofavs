<?php

require_once('require_test.php');

/*
	²âÊÔÖ´ÐÐÐ§ÂÊ SofavDB_Sql
*/


$strangeString	= "''\\";
echo time() . "\n";
for ($i = 0; $i < 100000; ++$i) {
#	$res = SofavDB_Sql::e($strangeString, 'first');
#	$res = SofavDB_Sql::e($strangeString, 'second');
	$res = SofavDB_Sql::e($strangeString);
}
echo time() . "\n";
print_r($res);

