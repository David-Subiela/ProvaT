/* 1. Invoquem express */
const express = require("express");
const app = express();

/* 2. Setegem urlencoded per capturar dades formulari */
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

/* 3. Invoquem dotenv */
const dotenv = require("dotenv");
dotenv.config({ path: "./env/.env" });

/* 4. Setegem directori assets o public */
app.use("/resources", express.static("public"));
app.use("/resources", express.static(__dirname + "/public"));

/* 5. Establim el motor de plantilles ejs*/
app.set("view engine", "ejs");

/* 6. Invoquem a bcryptjs */
/* const bcryptjs = require("bcryptjs"); */

/* 7. Configurem les variables de sessió */
const session = require("express-session");
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);

/* 8. Invoquem al mòdul de connexió de la BBDD */
const connection = require("./database/db");

//console.log(__dirname);

/* 9. Establim rutes d'accés: */
app.get("/index", (req, res) => {
  res.render("index");
});
app.get("/register", (req, res) => {
  res.render("register");
});

/* 10. Registre */
app.post("/register", (req, res) => {
  const name = req.body.name;
  const surname = req.body.surname;
  const email = req.body.email;
  const number = req.body.number;
  const password = req.body.password;
  const repeatPassword = req.body.repeatPassword;

  if (password != repeatPassword) throw "passwords do not match";

  connection.query(
    "INSERT INTO users SET ?",
    {
      name: name,
      surname: surname,
      email: email,
      number: number,
      password: password,
      repeatPassword: repeatPassword,
    },
    (error, results) => {
      if (error) {
        console.log(error);
      } else {
        res.send("Register succesfuly");
      }
    }
  );
});

app.listen(3000, (req, res) => {
  console.log("SERVER RUNNING IN http://localhost:3000");
});
