var mysql = require("mysql");
var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Barra0programador",
  database: "workappdb",
});

connection.connect();

module.exports = connection