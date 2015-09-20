-- phpMyAdmin SQL Dump
-- version 2.9.1.1
-- http://www.phpmyadmin.net
-- 
-- 主机: localhost
-- 生成日期: 2006 年 12 月 17 日 16:28
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
) ENGINE=MyISAM DEFAULT CHARSET=utf8 AUTO_INCREMENT=2 ;

-- 
-- 导出表中的数据 `fav`
-- 

INSERT INTO `fav` (`id`, `userid`, `urlid`, `ftitle`, `furl`, `ftags`, `fnote`, `fprivate`, `finsttime`, `fedittime`, `fisblocked`) VALUES 
(1, 10, 1, '抓虾－频道大全', 'http://www.zhuaxia.com/indexFrame.php#showChPreview(3671,10,0,-1,1,1)', 'RSS', '分享免费 小巧 实用 有趣 绿色的软件 - 我们的口号是:没有流氓', 1, 1166368243, 0, 0);

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
) ENGINE=MyISAM DEFAULT CHARSET=latin1 COLLATE=latin1_general_ci AUTO_INCREMENT=1 ;

-- 
-- 导出表中的数据 `fav_tag`
-- 


-- --------------------------------------------------------

-- 
-- 表的结构 `tag`
-- 

CREATE TABLE `tag` (
  `id` int(11) unsigned NOT NULL auto_increment,
  `ftag` varchar(255) character set utf8 collate utf8_bin NOT NULL,
  PRIMARY KEY  (`id`),
  UNIQUE KEY `ftag` (`ftag`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- 
-- 导出表中的数据 `tag`
-- 


-- --------------------------------------------------------

-- 
-- 表的结构 `test`
-- 

CREATE TABLE `test` (
  `id` int(11) NOT NULL auto_increment,
  `name` varchar(255) character set utf8 collate utf8_bin NOT NULL,
  PRIMARY KEY  (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 AUTO_INCREMENT=12 ;

-- 
-- 导出表中的数据 `test`
-- 

INSERT INTO `test` (`id`, `name`) VALUES 
(1, 0xe8bf9ce69c9b),
(2, 0xe794b5e5ad90),
(3, 0xe5be97e79b8ae7bd91),
(4, 0xe5bdb1e8a786),
(5, 0x574f57),
(6, 0xe9bb84e98791e59ca8e7babfe7a4bee58cba2de8aebae59d9be9a696e9a1b5),
(7, 0x666f6f6f6f6f6f64),
(8, 0x6c65616b6f6e),
(9, 0xe381aae381abe381ace381ad),
(10, 0xeb9494eba089ed86a0eba6ac20ec9db8ebacbc20eca780ec97ad20ecb185),
(11, 0x574f77);

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
) ENGINE=MyISAM DEFAULT CHARSET=utf8 AUTO_INCREMENT=2 ;

-- 
-- 导出表中的数据 `url`
-- 

INSERT INTO `url` (`id`, `furl`, `fhasimg`) VALUES 
(1, 0x687474703a2f2f7777772e7a6875617869612e636f6d2f696e6465784672616d652e7068702373686f7743685072657669657728333637312c31302c302c2d312c312c3129, 0);

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
) ENGINE=MyISAM DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- 
-- 导出表中的数据 `user`
-- 


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
) ENGINE=MyISAM DEFAULT CHARSET=latin1 COLLATE=latin1_general_ci AUTO_INCREMENT=1 ;

-- 
-- 导出表中的数据 `user_tag`
-- 

