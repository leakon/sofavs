-- phpMyAdmin SQL Dump
-- version 2.9.1.1
-- http://www.phpmyadmin.net
-- 
-- ����: localhost
-- ��������: 2007 �� 01 �� 06 �� 16:06
-- �������汾: 5.0.18
-- PHP �汾: 5.1.1
-- 
-- ���ݿ�: `sofav`
-- 

-- --------------------------------------------------------

-- 
-- ��Ľṹ `fav`
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
-- ��Ľṹ `fav_tag`
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
-- ��Ľṹ `qhcms`
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
-- ��Ľṹ `tag`
-- 

CREATE TABLE `tag` (
  `id` int(11) unsigned NOT NULL auto_increment,
  `ftag` varchar(255) character set utf8 collate utf8_bin NOT NULL,
  PRIMARY KEY  (`id`),
  UNIQUE KEY `ftag` (`ftag`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

-- 
-- ��Ľṹ `url`
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
-- ��Ľṹ `user`
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
-- ��Ľṹ `user_tag`
-- 

CREATE TABLE `user_tag` (
  `id` int(11) unsigned NOT NULL auto_increment,
  `userid` int(11) unsigned NOT NULL default '0',
  `tagid` int(11) unsigned NOT NULL default '0',
  PRIMARY KEY  (`id`),
  UNIQUE KEY `userid` (`userid`,`tagid`),
  UNIQUE KEY `tagid` (`tagid`,`userid`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
