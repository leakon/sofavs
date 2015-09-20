-- phpMyAdmin SQL Dump
-- version 2.9.1.1
-- http://www.phpmyadmin.net
-- 
-- 主机: localhost
-- 生成日期: 2007 年 01 月 06 日 16:06
-- 服务器版本: 5.0.18
-- PHP 版本: 5.1.1
-- 
-- 数据库: `sofav`
-- 

-- --------------------------------------------------------

-- 
-- 表的结构 `fav`
-- 

CREATE TABLE `fav` (
  `id` int(11) unsigned NOT NULL auto_increment,
  `userid` int(11) unsigned NOT NULL default '0',
  `urlid` int(11) unsigned NOT NULL default '0',
  `ftitle` varchar(255) NOT NULL,
  `furl` varchar(255) NOT NULL,
  `ftags` varchar(255) NOT NULL,
  `fnote` varchar(255) NOT NULL,
  `fprivate` int(11) NOT NULL default '0',
  `finsttime` int(11) NOT NULL default '0',
  `fedittime` int(11) NOT NULL default '0',
  `fisblocked` int(11) NOT NULL default '0',
  PRIMARY KEY  (`id`),
  UNIQUE KEY `userid` (`userid`,`urlid`),
  UNIQUE KEY `urlid` (`urlid`,`userid`),
  KEY `ftitle` (`ftitle`),
  KEY `finsttime` (`finsttime`),
  KEY `fedittime` (`fedittime`),
  KEY `fisblocked` (`fisblocked`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

-- 
-- 表的结构 `fav_tag`
-- 

CREATE TABLE `fav_tag` (
  `id` int(11) unsigned NOT NULL auto_increment,
  `favid` int(11) unsigned NOT NULL default '0',
  `tagid` int(11) unsigned NOT NULL default '0',
  PRIMARY KEY  (`id`),
  UNIQUE KEY `favid` (`favid`,`tagid`),
  UNIQUE KEY `tagid` (`tagid`,`favid`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

-- 
-- 表的结构 `qhcms`
-- 

CREATE TABLE `qhcms` (
  `id` int(11) unsigned NOT NULL auto_increment,
  `title` varchar(255) NOT NULL,
  `surl` varchar(255) NOT NULL,
  `tag` varchar(255) NOT NULL,
  `content` text NOT NULL,
  PRIMARY KEY  (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

-- 
-- 表的结构 `tag`
-- 

CREATE TABLE `tag` (
  `id` int(11) unsigned NOT NULL auto_increment,
  `ftag` varchar(255) character set utf8 collate utf8_bin NOT NULL,
  PRIMARY KEY  (`id`),
  UNIQUE KEY `ftag` (`ftag`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

-- 
-- 表的结构 `url`
-- 

CREATE TABLE `url` (
  `id` int(11) unsigned NOT NULL auto_increment,
  `furl` varchar(255) character set utf8 collate utf8_bin NOT NULL,
  `fhasimg` int(11) NOT NULL default '0',
  PRIMARY KEY  (`id`),
  UNIQUE KEY `furl` (`furl`),
  KEY `fhasimg` (`fhasimg`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

-- 
-- 表的结构 `user`
-- 

CREATE TABLE `user` (
  `id` int(11) unsigned NOT NULL auto_increment,
  `fname` varchar(255) character set utf8 collate utf8_bin NOT NULL,
  `fpass` varchar(255) NOT NULL,
  `fmail` varchar(255) NOT NULL,
  PRIMARY KEY  (`id`),
  UNIQUE KEY `fname` (`fname`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

-- 
-- 表的结构 `user_tag`
-- 

CREATE TABLE `user_tag` (
  `id` int(11) unsigned NOT NULL auto_increment,
  `userid` int(11) unsigned NOT NULL default '0',
  `tagid` int(11) unsigned NOT NULL default '0',
  PRIMARY KEY  (`id`),
  UNIQUE KEY `userid` (`userid`,`tagid`),
  UNIQUE KEY `tagid` (`tagid`,`userid`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
