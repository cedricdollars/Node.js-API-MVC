-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Hôte : localhost:8889
-- Généré le :  lun. 07 sep. 2020 à 18:25
-- Version du serveur :  5.7.26
-- Version de PHP :  7.3.8

SET SQL_MODE
= "NO_AUTO_VALUE_ON_ZERO";
SET time_zone
= "+00:00";

--
-- Base de données :  `nodejs_api`
--

-- --------------------------------------------------------

--
-- Structure de la table `parking`
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

--
-- Déchargement des données de la table `parking`
--

INSERT INTO `parking` (`
num_place`,
`avaibility
`, `floor`, `started_usage`, `ended_usage`, `user_id`) VALUES
(3, 1, 1, '21:47:54', '21:47:54', 1),
(4, 0, 1, '21:48:17', '21:48:17', 1);

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

CREATE TABLE `users`
(
`id` int
(11) NOT NULL,
`role` varchar
(255) DEFAULT NULL,
`email` varchar
(100) NOT NULL,
`firstname` varchar
(50) DEFAULT NULL,
`lastname` varchar
(50) DEFAULT NULL,
`password` varchar
(250) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`
id`,
`role
`, `email`, `firstname`, `lastname`, `password`) VALUES
(1, 'ADMIN', 'gabyngoune@yahoo.fr', 'ced', 'Ngouné', '123456'),
(2, 'ADMIN', 'ngounecedric@yahoo.fr', 'Florian', 'david', '$2b$05$ht4MfoaEXu833c0XO0V7be9SGoVczrVvILl/wOUGgmWnAGMYNQcUi'),
(13, 'ADMIN', 'gabyngoune@yahoo.fr', 'ced', 'Ngouné', '$2b$05$qzqg/uLlB8cwM./UpkUtf.zu4xcsfcUD.claKf9v4uVoTuOLADfmC');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `parking`
--
ALTER TABLE `parking`
ADD PRIMARY KEY
(`num_place`),
ADD KEY `fk_user_parking`
(`user_id`);

--
-- Index pour la table `users`
--
ALTER TABLE `users`
ADD PRIMARY KEY
(`id`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `parking`
--
ALTER TABLE `parking`
MODIFY `num_place` int
(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT pour la table `users`
--
ALTER TABLE `users`
MODIFY `id` int
(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `parking`
--
ALTER TABLE `parking`
ADD CONSTRAINT `fk_user_parking` FOREIGN KEY
(`user_id`) REFERENCES `users`
(`id`) ON
DELETE CASCADE ON
UPDATE CASCADE;