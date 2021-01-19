var db = require('../models/Skis');
const { check, validationResult } = require('express-validator');

var msgCrud;

exports.validationResult = [
  check('nom_ski',"Veuillez saisir un nom avec au minimum 2 caractères").isLength({ min: 2 }),
  check('type_ski_id',"Veuillez sélectionner un type de ski").isNumeric(),
  check('taille',"La taille doit être un numérique non nul").isDecimal(),
  check('etat',"Veuillez saisir un état avec au minimum 2 caractères").isLength({ min: 2 }),
  check('date_achat',"Veuillez saisir un format correcte pour la date").matches(/^(0?[1-9]|[12][0-9]|3[01])[/-](0?[1-9]|1[012])[/]\d{4}$/, "i"),
  check('prix_achat',"Le prix d'achat doit être un numérique non nul").isDecimal(),
  check('prix_location',"Le prix de location doit être un numérique non nul").isDecimal(),
];


exports.getSkis = (req, res) => {
  db.query('SELECT s.id, s.nom_ski, S.taille, s.etat, s.date_achat, s.prix_achat, s.prix_location, ts.libelle AS type_ski FROM ski AS s JOIN type_ski AS ts ON s.type_ski_id = ts.id ORDER BY ts.libelle, s.nom_ski ASC',
    function(err, listeSki) {
      if (!err) {
        res.render('./skis/showSki.twig', {skis: listeSki, message :msgCrud});
    	}
      else {
        res.send(err);
      }
    }
  );
};


exports.addSki = (req, res) => {
  db.query('SELECT * FROM type_ski ORDER BY libelle',
    function(err, typeSkis) {
      if (!err) {
        res.render('./skis/addSki.twig', {typeSkis: typeSkis});
      }
      else {
        res.send(err);
      }
    }
  );
};


exports.addSkiValidForm = (req, res) => {
  db.query('SELECT * FROM type_ski ORDER BY libelle',
    function(err, typeSkis) {
      if (err) {
        // Si la requête échoue
        res.send(err);
      } else {
        let erreurs = validationResult(req);
        if (!erreurs.isEmpty()) {
          // Si il y a des erreurs
          erreurs = erreurs.array();
          res.render('./skis/addSki.twig',{ erreurs: erreurs, skis: req.body, typeSkis: typeSkis});
        } else {
          // si il y a aucune erreur
          var date = req.body.date_achat
          var newdate = date.split("/").reverse().join("-");

          var donnees = {
            nom_ski : req.body.nom_ski,
            date_achat : newdate,
            etat : req.body.etat,
            prix_achat : req.body.prix_achat,
            prix_location : req.body.prix_location,
            taille : req.body.taille,
            type_ski_id : req.body.type_ski_id,
          };

          var requete="INSERT INTO ski(type_ski_id, nom_ski, date_achat, etat, prix_achat, prix_location, taille) VALUES ('" 
          + donnees['type_ski_id'] + "','"
          + donnees['nom_ski'] + "','"
          + donnees['date_achat'] + "','" 
          + donnees['etat'] + "','" 
          + donnees['prix_achat'] + "','" 
          + donnees['prix_location'] + "','" 
          + donnees['taille'] + "');";

          db.query(requete,
            function(err) {
              if (!err) {
                msgCrud = "Le ski à bien été ajouté !"
                res.redirect('/list/skis');
              } else  res.send(err);
            }
          );
        }
      }
    }
  );
};


exports.editSki = (req, res) => {
  db.query("SELECT * FROM ski where id = ? ;", [req.params.id], 
    function (err, results) {
      if (err) {
          res.send(err);
      } else {
        let skis = results[0];
        db.query("SELECT * FROM type_ski ORDER BY libelle", function (err, typeSkis) {
          if (err) {
              res.send(err);
          } else {
            //changement du format date : iso => dd/mm/yyyy
            date = skis['date_achat'];
            year = date.getFullYear();
            month = date.getMonth()+1;
            day = date.getDate();

            if (day < 10) day = '0' + day;
            if (month < 10) month = '0' + month;

            var newDate = (day + '/' + month + '/'+ year);

            skis['date_achat'] = newDate;
            res.render('./skis/editSki.twig', {skis: skis, typeSkis: typeSkis, csrfToken: req.csrfToken()});
          }
        });
      }
    }
  );
};


exports.editSkiValidForm = (req, res) => {
  db.query('SELECT * FROM type_ski ORDER BY libelle',
    function(err, typeSkis) {
      if (err) {
        // Si la requête échoue
        res.send(err);
      } else {
        let erreurs = validationResult(req);
        if (!erreurs.isEmpty()) {
          // Si il y a des erreurs
          erreurs = erreurs.array();
          res.render('./skis/editSki.twig',{ erreurs: erreurs, skis: req.body, typeSkis: typeSkis});
        } else {
          // si il y a aucune erreur
          var date = req.body.date_achat
          var newdate = date.split("/").reverse().join("-");

          var donnees = {
            id : req.body.id,
            nom_ski : req.body.nom_ski,
            date_achat : newdate,
            etat : req.body.etat,
            prix_achat : req.body.prix_achat,
            prix_location : req.body.prix_location,
            taille : req.body.taille,
            type_ski_id : req.body.type_ski_id,
          };
          var requete="UPDATE ski SET nom_ski ='" + donnees['nom_ski'] 
          +"', date_achat ='" + donnees['date_achat'] 
          +"', etat ='" + donnees['etat'] 
          +"', prix_achat ='" + donnees['prix_achat'] 
          +"', prix_location ='" + donnees['prix_location'] 
          +"', taille ='" + donnees['taille'] 
          +"', type_ski_id ='" + donnees['type_ski_id'] 
          +"' WHERE id =" + db.escape(donnees['id']) + ";";

          db.query(requete,
            function(err) {
              if (!err) {
                msgCrud = "Le ski à bien été modifié !"
                res.redirect('/list/skis');
              } else  res.send(err);
            }
          );
        }
      }
    }
  );
};


exports.deleteSki = (req, res) => {
  db.query('DELETE FROM ski WHERE id = ? ;',[req.params.id],
    function(err) {
      if (!err) {
          msgCrud = "Le ski à bien été supprimé !"
          res.redirect('/list/skis');
      }
      else {
        res.send(err);
      }
    }
  );  
};