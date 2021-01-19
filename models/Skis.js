const mysql = require('mysql');

const db  = mysql.createConnection({
  host            : 'localhost',
  user            : 'root',
  password        : '',
  database        : 's3projetski',
});

db.connect(function(err) {
  if (err) throw err;
  console.log("Connexion à la base réussi.");
});

module.exports = db;