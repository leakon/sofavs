-- phpMyAdmin SQL Dump
-- version 2.10.3
-- http://www.phpmyadmin.net
-- 
-- Host: localhost
-- Generation Time: Jan 02, 2008 at 06:20 PM
-- Server version: 5.0.45
-- PHP Version: 5.2.3

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";

-- 
-- Database: `sofav_dev`
-- 

-- --------------------------------------------------------

-- 
-- Table structure for table `sf_cache`
-- 

CREATE TABLE `sf_cache` (
  `id` int(11) NOT NULL auto_increment,
  `user_id` int(11) NOT NULL default '0',
  `post_id` int(11) NOT NULL default '0',
  `post_created_at` int(11) NOT NULL default '0',
  `created_at` int(11) NOT NULL default '0',
  `is_private` tinyint(4) NOT NULL default '0',
  `username` char(255) NOT NULL,
  `url` char(255) NOT NULL,
  `title` char(255) NOT NULL,
  `tag` text NOT NULL,
  `description` text NOT NULL,
  PRIMARY KEY  (`id`),
  UNIQUE KEY `user_id` (`user_id`,`post_id`),
  KEY `post_id` (`post_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

-- 
-- Table structure for table `sf_post`
-- 

CREATE TABLE `sf_post` (
  `id` int(11) NOT NULL auto_increment,
  `user_id` int(11) NOT NULL default '0',
  `created_at` int(11) NOT NULL default '0',
  `is_private` tinyint(4) NOT NULL default '0',
  `url` char(255) NOT NULL,
  `title` char(255) NOT NULL,
  `description` text NOT NULL,
  PRIMARY KEY  (`id`),
  UNIQUE KEY `url` (`url`,`user_id`),
  KEY `title` (`title`),
  KEY `user_id` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

-- 
-- Table structure for table `sf_post_tag`
-- 

CREATE TABLE `sf_post_tag` (
  `id` int(11) NOT NULL auto_increment,
  `user_id` int(11) NOT NULL default '0',
  `post_id` int(11) NOT NULL default '0',
  `tag_id` int(11) NOT NULL default '0',
  PRIMARY KEY  (`id`),
  UNIQUE KEY `post_id` (`post_id`,`tag_id`,`user_id`),
  UNIQUE KEY `tag_id` (`tag_id`,`post_id`),
  KEY `user_id` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

-- 
-- Table structure for table `sf_tag`
-- 

CREATE TABLE `sf_tag` (
  `id` int(11) NOT NULL auto_increment,
  `user_id` int(11) NOT NULL default '0',
  `tag` char(100) NOT NULL,
  PRIMARY KEY  (`id`),
  UNIQUE KEY `tag` (`tag`,`user_id`),
  KEY `user_id` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

-- 
-- Table structure for table `sf_user`
-- 

CREATE TABLE `sf_user` (
  `id` int(11) NOT NULL auto_increment,
  `created_at` int(11) NOT NULL default '0',
  `password` char(32) NOT NULL,
  `username` char(255) NOT NULL,
  PRIMARY KEY  (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=100001 ;

-- 
-- Constraints for dumped tables
-- 

-- 
-- Constraints for table `sf_post`
-- 
ALTER TABLE `sf_post`
  ADD CONSTRAINT `sf_post_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `sf_user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- 
-- Constraints for table `sf_post_tag`
-- 
ALTER TABLE `sf_post_tag`
  ADD CONSTRAINT `sf_post_tag_ibfk_3` FOREIGN KEY (`tag_id`) REFERENCES `sf_tag` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `sf_post_tag_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `sf_user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `sf_post_tag_ibfk_2` FOREIGN KEY (`post_id`) REFERENCES `sf_post` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- 
-- Constraints for table `sf_tag`
-- 
ALTER TABLE `sf_tag`
  ADD CONSTRAINT `sf_tag_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `sf_user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
