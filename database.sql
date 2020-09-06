-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:8889
-- Generation Time: Sep 03, 2020 at 04:53 PM
-- Server version: 5.7.26
-- PHP Version: 7.3.8

SET SQL_MODE
= "NO_AUTO_VALUE_ON_ZERO";
SET time_zone
= "+00:00";

--
-- Database: `nodejs_api`
--

-- --------------------------------------------------------

--
-- Table structure for table `parking`
--

CREATE TABLE `parking`
(
`num_place` int
(11) NOT NULL,
`avaibility` tinyint
(1) NOT NULL DEFAULT '1',
`floor` int
(11) DEFAULT NULL,
`started_usage` time DEFAULT NULL,
`ended_usage` time DEFAULT NULL,
`user_id` int
(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users`
(
`id` int
(11) NOT NULL,
`admin` tinyint
(1) NOT NULL DEFAULT '1',
`email` varchar
(100) NOT NULL,
`firstname` varchar
(50) DEFAULT NULL,
`lastname` varchar
(50) DEFAULT NULL,
`password` varchar
(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `parking`
--
ALTER TABLE `parking`
ADD PRIMARY KEY
(`num_place`),
ADD KEY `fk_user_parking`
(`user_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
ADD PRIMARY KEY
(`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `parking`
--
ALTER TABLE `parking`
MODIFY `num_place` int
(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
MODIFY `id` int
(11) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `parking`
--
ALTER TABLE `parking`
ADD CONSTRAINT `fk_user_parking` FOREIGN KEY
(`user_id`) REFERENCES `users`
(`id`) ON
DELETE CASCADE ON
UPDATE CASCADE;
