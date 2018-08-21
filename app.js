const fs = require("fs");
const mysql = require("mysql");
const express = require('express');
const bodyParser = require('body-parser');
const secretVars = JSON.parse(fs.readFileSync('secret.json', 'utf8'));

// Connection Object for MySQL
const db = mysql.createConnection({
    host: secretVars["dbHost"],
    user: secretVars["dbUser"],
    password: secretVars["dbPassword"],
    database: secretVars["dbDatabase"]
});

//Express Setup
const app = express();
app.set('view engine', 'pug');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.set('view engine', 'pug');

app.get('/', function (req, res) {
    let selectSql = "SELECT * FROM Haiku WHERE Verified = 0";
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

app.get('/delete', function(req, res){
    if(req.query.position){
        let deleteSql = "DELETE FROM Haiku WHERE QueuePosition = "+req.query.position+";";
        console.log(deleteSql);
        let deleteQuery = db.query(deleteSql, (err, results) => {
            if (err) {
                res.send(err);
            } else {
                res.redirect("/");
            }
        });
    } else{
        res.send("No queue position to delete provided.");
    }
})

// Start server listening
app.listen('3000', () => {
    console.log('Server started on port 3000');
});