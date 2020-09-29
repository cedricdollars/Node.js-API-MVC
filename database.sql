-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:8889
-- Generation Time: Sep 29, 2020 at 08:17 PM
-- Server version: 5.7.26
-- PHP Version: 7.3.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

--
-- Database: `nodejs_api`
--

-- --------------------------------------------------------

--
-- Table structure for table `avaibility`
--

CREATE TABLE `avaibility` (
`avaibility_id` int(11) NOT NULL,
`num_place_max` int(11) NOT NULL,
`is_available` tinyint(4) NOT NULL DEFAULT '1',
`label` varchar(100) NOT NULL DEFAULT 'free'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `avaibility`
--

INSERT INTO `avaibility` (`avaibility_id`, `num_place_max`, `is_available`, `label`) VALUES
(1, 1, 0, 'free');

-- --------------------------------------------------------

--
-- Table structure for table `error`
--

CREATE TABLE `error` (
`id_error` int(11) NOT NULL,
`message` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `parking`
--

CREATE TABLE `parking` (
`num_place` int(11) NOT NULL,
`floor` int(11) NOT NULL,
`started_usage` time DEFAULT NULL,
`ended_usage` time DEFAULT NULL,
`user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `parking`
--

INSERT INTO `parking` (`num_place`, `floor`, `started_usage`, `ended_usage`, `user_id`) VALUES
(3, 1, '21:47:54', '21:47:54', 1),
(4, 1, '21:48:17', '21:48:17', 1),
(5, 2, NULL, NULL, 2),
(6, 1, NULL, NULL, 13),
(7, 3, NULL, NULL, 2),
(17, 2, '21:36:25', NULL, 2),
(18, 2, '21:39:52', NULL, 2);

--
-- Triggers `parking`
--
DELIMITER $$
CREATE TRIGGER `decrement_num_place_max` AFTER DELETE ON `parking` FOR EACH ROW BEGIN
    UPDATE avaibility 
    SET num_place_max = num_place_max - 1, is_available = TRUE
    WHERE label='free';
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `increment_num_place_max` AFTER INSERT ON `parking` FOR EACH ROW BEGIN

    SET @number_max = (SELECT COUNT(*) FROM parking);
    IF @number_max > 20 THEN
        INSERT INTO error (message) VALUES(`ERREUR: Insertion impossible, Toutes les places sont occupées!`);
    ELSEIF @number_max < 20 THEN
        UPDATE avaibility SET num_place_max = num_place_max + 1, is_available = FALSE
        WHERE label='free';
    END IF;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
`id` int(11) NOT NULL,
`role` varchar(255) DEFAULT NULL,
`email` varchar(100) NOT NULL,
`firstname` varchar(50) DEFAULT NULL,
`lastname` varchar(50) DEFAULT NULL,
`password` varchar(250) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `role`, `email`, `firstname`, `lastname`, `password`) VALUES
(1, 'ADMIN', 'gabyngoune@yahoo.fr', 'ced', 'Ngouné', '123456'),
(2, 'ADMIN', 'ngounecedric@yahoo.fr', 'Florian', 'david', '$2b$05$ht4MfoaEXu833c0XO0V7be9SGoVczrVvILl/wOUGgmWnAGMYNQcUi'),
(13, 'ADMIN', 'gabyngoune@yahoo.fr', 'ced', 'Ngouné', '$2b$05$qzqg/uLlB8cwM./UpkUtf.zu4xcsfcUD.claKf9v4uVoTuOLADfmC'),
(14, 'ADMIN', 'Domon@outlook.com', 'Cédric', 'Domon', '$2b$05$3TN21AZWOYFmzTI.hCLX/.qRVvSHfZ.8L8Sn4lKFOFs.KoghyipN2');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `avaibility`
--
ALTER TABLE `avaibility`
ADD PRIMARY KEY (`avaibility_id`);

--
-- Indexes for table `error`
--
ALTER TABLE `error`
ADD PRIMARY KEY (`id_error`);

--
-- Indexes for table `parking`
--
ALTER TABLE `parking`
ADD PRIMARY KEY (`num_place`),
ADD KEY `fk_user_parking` (`user_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `avaibility`
--
ALTER TABLE `avaibility`
MODIFY `avaibility_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `error`
--
ALTER TABLE `error`
MODIFY `id_error` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `parking`
--
ALTER TABLE `parking`
MODIFY `num_place` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `parking`
--
ALTER TABLE `parking`
ADD CONSTRAINT `fk_user_parking` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
