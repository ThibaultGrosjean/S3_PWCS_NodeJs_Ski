-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Hôte : localhost
-- Généré le : lun. 08 août 2022 à 14:31
-- Version du serveur :  8.0.22
-- Version de PHP : 7.4.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `s3projetski`
--

-- --------------------------------------------------------

--
-- Structure de la table `ski`
--

CREATE TABLE `ski` (
  `id` int NOT NULL,
  `type_ski_id` int DEFAULT NULL,
  `nom_ski` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `date_achat` date DEFAULT NULL,
  `etat` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `prix_achat` decimal(8,2) DEFAULT NULL,
  `prix_location` decimal(8,2) DEFAULT NULL,
  `taille` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `ski`
--

INSERT INTO `ski` (`id`, `type_ski_id`, `nom_ski`, `date_achat`, `etat`, `prix_achat`, `prix_location`, `taille`) VALUES
(1, 5, 'Wedze 500', '2019-05-20', 'Très Bon', '240.00', '50.00', 172),
(2, 6, 'Wedze 500 Slash 100', '2020-09-13', 'Neuf', '360.00', '75.00', 184),
(3, 2, 'Inovix XC S 500', '2019-11-19', 'Assez Bon', '155.00', '30.00', 205),
(4, 3, 'Rossignol Experience 80', '2018-09-12', 'Très Bon', '380.00', '38.00', 174),
(5, 4, 'Wedze Mountain touring MT85', '2018-07-11', 'Très Bon', '575.00', '56.00', 176),
(6, 3, 'Atomic Redster X5', '2019-05-20', 'Assez Bon', '370.00', '32.00', 177),
(7, 3, 'Rossignol Experience 84', '2019-11-01', 'Bon', '540.00', '35.00', 184),
(8, 3, 'Salomon Max 8S', '2017-02-11', 'Très Bon', '500.00', '50.00', 165),
(9, 3, 'Atomic Vantage 77 TI', '2019-05-20', 'Bon', '420.00', '41.00', 156),
(10, 4, 'Dynastar Vertical Deer', '2017-11-25', 'Mauvais', '697.00', '22.00', 180),
(11, 6, 'Elan Ripstick 96', '2020-04-16', 'Très Bon', '490.00', '42.00', 181),
(12, 1, 'Salomon Distance M10 GW L90', '2019-08-30', 'Neuf', '299.00', '34.00', 125),
(13, 1, 'Rossignol Freeze Xpress GW', '2020-01-04', 'Très Bon', '269.00', '21.00', 118);

-- --------------------------------------------------------

--
-- Structure de la table `type_ski`
--

CREATE TABLE `type_ski` (
  `id` int NOT NULL,
  `libelle` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `type_ski`
--

INSERT INTO `type_ski` (`id`, `libelle`) VALUES
(1, 'Mini-ski'),
(2, 'Ski de fond'),
(3, 'Ski de piste'),
(4, 'Ski de randonnée'),
(5, 'Freestyle'),
(6, 'Freeride');

-- --------------------------------------------------------

--
-- Structure de la table `user`
--

CREATE TABLE `user` (
  `id` int NOT NULL,
  `username` varchar(180) COLLATE utf8mb4_unicode_ci NOT NULL,
  `roles` json NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `user`
--

INSERT INTO `user` (`id`, `username`, `roles`, `password`) VALUES
(1, 'admin', '[\"ROLE_ADMIN\"]', '$argon2id$v=19$m=65536,t=4,p=1$dWozQlQwNFhHSnpWS1dmQQ$dy4gjUzX6pBBImlqXAjK0lmTZtZEM8+Q/5Q328az4R4'),
(2, 'user1', '[\"ROLE_USER\"]', '$argon2id$v=19$m=65536,t=4,p=1$VWFuOHRxeTE0YzAwTDdsNA$B0rIcINb1ksW8u+79uMuoYrgJ71QGgK0OQCCfxiTp5A');

-- --------------------------------------------------------

--
-- Structure de la table `utilisateur`
--

CREATE TABLE `utilisateur` (
  `id` int NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `utilisateur`
--

INSERT INTO `utilisateur` (`id`, `username`, `password`) VALUES
(1, 'client', '$2b$10$1Q4/AUJ9sEWclM24BZJ2peTqFNgjhNrD25hEBD38SxMpdqZ36n0kC'),
(7, 'client2', '$2b$10$KyFbX1M4UGDk2g6R5AJzAu6PUGAQkxN28oMJncEKhTziXx90VP/46');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `ski`
--
ALTER TABLE `ski`
  ADD PRIMARY KEY (`id`),
  ADD KEY `IDX_1B91648B2E6F5703` (`type_ski_id`);

--
-- Index pour la table `type_ski`
--
ALTER TABLE `type_ski`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `UNIQ_8D93D649F85E0677` (`username`);

--
-- Index pour la table `utilisateur`
--
ALTER TABLE `utilisateur`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `ski`
--
ALTER TABLE `ski`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT pour la table `type_ski`
--
ALTER TABLE `type_ski`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT pour la table `user`
--
ALTER TABLE `user`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT pour la table `utilisateur`
--
ALTER TABLE `utilisateur`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `ski`
--
ALTER TABLE `ski`
  ADD CONSTRAINT `FK_1B91648B2E6F5703` FOREIGN KEY (`type_ski_id`) REFERENCES `type_ski` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
