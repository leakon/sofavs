<?php

//class BaseTagPeer {}

include(dirname(__FILE__).'/../bootstrap/unit.php');
require_once(dirname(__FILE__).'/../autoload.php');
require_once(dirname(__FILE__).'/../../lib/model/TagPeer.php');

$t = new lime_test(4, new lime_output_color());

// TagPeer::filterTag()
$t->diag('TagPeer::filterTag()');

// 格式化
$t->is(TagPeer::filterTag('hello, world'), 'hello,world',
    'format tag');

// 过滤中文字符
$t->is(TagPeer::filterTag('hello； world，Web　2.0，PHP'), 'hello,world,Web 2.0,PHP',
    'filter Chinese interpunction');

// 过滤英文字符
$t->is(TagPeer::filterTag('hello; world`\'\'Web 2.0"PHP'), 'hello,world,Web 2.0,PHP',
    'filter English interpunction');

// 过滤连续分隔符
$t->is(TagPeer::filterTag(',"  " , ,  ,, hello  ,",";,  `;` ; ,   world  ,  ,,    Web     2.0   ,  PHP  ;, ;;'), 'hello,world,Web 2.0,PHP',
    'filter repeated delimiter');