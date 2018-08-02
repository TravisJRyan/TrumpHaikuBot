const fs = require("fs");
const mysql = require("mysql");
const express = require('express');
const secretVars = JSON.parse(fs.readFileSync('secret.json', 'utf8'));

// Connection Object for MySQL
const db = mysql.createConnection({
    host: secretVars[0]["dbHost"],
    user: secretVars[0]["dbUser"],
    password: secretVars[0]["dbPassword"],
    database: secretVars[0]["dbDatabase"]
});

let selectSql = "SELECT * FROM Haiku";
let selectQuery = db.query(selectSql, (err, results) => {
    if (err) {
        console.log(err);
    } else {
        console.log(results);
    }
});

//Express Setup
const app = express();
app.set('view engine', 'pug');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));