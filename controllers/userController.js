var db = require('../models/Skis');

const { check, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const saltRounds = 10;


exports.validationResult = [
	check('username',"Le nom d'utilisateur est requis").isLength({ min: 6 }),
	check('password',"Le mot de passe est requis").isLength({ min: 6 }),
];


exports.register = (req, res) => {
  res.render('auth/register.twig');
};


exports.registerValidForm = (req, res) => {
  let erreurs = validationResult(req);
  if (!erreurs.isEmpty()) {
    return res.render('auth/register.twig',{ erreurs: erreurs.array(), user: req.body});
  }
  let salt = bcrypt.genSaltSync(saltRounds);
  let hash = bcrypt.hashSync(req.body.password, salt);
  db.query("INSERT INTO utilisateur VALUES (NULL, ? , ?)", [req.body.username, hash], 
  	function (err, results) {
	    if (err) {
        res.send(err);
	    } else {
        res.redirect('/login');
	    }
  	}
  );
};


exports.login = (req, res) => {
	res.render('auth/login.twig');
};


exports.loginValidForm = (req, res) => {
  let erreurs = validationResult(req);
  if (!erreurs.isEmpty()) {
    return res.render('auth/login.twig',{ erreurs: erreurs.array(), user: req.body});
  }
  let salt = bcrypt.genSaltSync(saltRounds);
  let hash = bcrypt.hashSync(req.body.password, salt);
  db.query("SELECT * FROM utilisateur WHERE username = ?", [req.body.username, hash], 
  	async function (err, results) {
      if (err) {
        res.send(err);
      } 
      else {
        if (results != null && results.length === 1) {
          let great = await bcrypt.compare(req.body.password, results[0].password);
          if (great) {
            req.session.user = results[0];
            res.redirect('/list/skis');
          } else {
            return res.render('auth/login.twig',{ erreurs: erreurs.array(), user: req.body, errorLog : "Nom d'utilisateur ou mot de passe invalide"});
          }
        } else {
          return res.render('auth/login.twig',{ erreurs: erreurs.array(), user: req.body, errorLog : "Nom d'utilisateur ou mot de passe invalide"});
        }
      }
    }
  );
};

exports.logout = (req, res) => {
	res.redirect('/login');
};