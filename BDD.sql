CREATE DATABASE IF NOT EXISTS DMNODE;
use DMNODE;

DROP TABLE IF EXISTS utilisateur;
DROP TABLE IF EXISTS type_ski;
DROP TABLE IF EXISTS ski;


CREATE TABLE type_ski (
  id int NOT NULL AUTO_INCREMENT,
  libelle varchar(255) NOT NULL,
  PRIMARY KEY (id)
); 


CREATE TABLE ski (
  id int NOT NULL AUTO_INCREMENT,
  type_ski_id int NOT NULL,
  nom_ski varchar(255) NOT NULL,
  date_achat date NOT NULL,
  etat varchar(255) NOT NULL,
  prix_achat decimal(8,2) NOT NULL,
  prix_location decimal(8,2) NOT NULL,
  taille int NOT NULL,
  FOREIGN KEY (type_ski_id) REFERENCES type_ski (id),
  PRIMARY KEY (id)
);


CREATE TABLE utilisateur (
  id int NOT NULL AUTO_INCREMENT,
  username varchar(255) NOT NULL,
  password varchar(255) NOT NULL,
  PRIMARY KEY (id)
);


INSERT INTO type_ski (id, libelle) VALUES
(1, 'Mini-ski'),
(2, 'Ski de fond'),
(3, 'Ski de piste'),
(4, 'Ski de randonnée'),
(5, 'Freestyle'),
(6, 'Freeride');


INSERT INTO ski (id, type_ski_id, nom_ski, date_achat, etat, prix_achat, prix_location, taille) VALUES
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


INSERT INTO utilisateur (id, username, password) VALUES
(1, 'client', '$2b$10$1Q4/AUJ9sEWclM24BZJ2peTqFNgjhNrD25hEBD38SxMpdqZ36n0kC');
-- password : client