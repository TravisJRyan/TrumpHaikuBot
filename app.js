const fs = require("fs");
const mysql = require("mysql");
const express = require('express');
const bodyParser = require('body-parser');
const secretVars = JSON.parse(fs.readFileSync('secret.json', 'utf8'));

// Connection Object for MySQL
const db = mysql.createConnection({
    host: secretVars[0]["dbHost"],
    user: secretVars[0]["dbUser"],
    password: secretVars[0]["dbPassword"],
    database: secretVars[0]["dbDatabase"]
});

/*let selectSql = "SELECT * FROM Haiku";
let selectQuery = db.query(selectSql, (err, results) => {
    if (err) {
        console.log(err);
    } else {
        console.log(results);
    }
});*/

//Express Setup
const app = express();
app.set('view engine', 'pug');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.set('view engine', 'pug');

app.get('/', function (req, res) {
    let selectSql = "SELECT * FROM Haiku";
    let selectQuery = db.query(selectSql, (err, results) => {
        if (err) {
            res.send(err);
        } else {
            console.log(results);
            res.render('dashboard', {
                haikus: results
            });
        }
    });
});

// Start server listening
app.listen('3000', () => {
    console.log('Server started on port 3000');
});