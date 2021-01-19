var db = require('../models/Skis');


exports.getTypeSkis = (req, res) => {
  db.query('SELECT * FROM type_ski;',
    function(err, typeSkis) {
      if (!err) {
          res.render('./typesSkis/typeSkis.twig', {typeSkis: typeSkis});
      }
      else {
        res.send(err);
      }
    }
  );  
};


exports.getTypeSkisDetails = (req, res) =>{
  db.query('SELECT t.id, count(s.id) as nbSki, avg(s.prix_location) as PrixMoyenLocation, min(s.prix_location) as PrixMinLocation, max(s.prix_location) as PrixMaxLocation, t.libelle, min(s.taille) as MinTaille, max(s.taille) as MaxTaille FROM type_ski AS t JOIN ski AS s  ON s.type_ski_id = t.id GROUP BY t.id, t.libelle ORDER BY t.id ASC',
    function(err, typeSkis) {
      if (!err) {
          res.render('./typesSkis/typeSkisDetails.twig', {typeSkis: typeSkis});
      }
      else {
        res.send(err);
      }
    }
  );
};