/* Realitzar connexió a BBDD */

const mysql = require("mysql");
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

connection.connect((error) => {
  if (error) {
    console.log("Error de connexió: " + error);
    return;
  }
  console.log("Estás conectat/da a la BBDD");
});

module.exports = connection;
