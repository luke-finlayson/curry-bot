const express = require('express');
const app = express();
app.use(express.json());
//listen for requests
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log("Server Listening on PORT:", PORT);
});
//define an endpoint
app.get("/status", (request, response) => {
    const status = {
        "Status": "Running"
    };
    response.send(status);
});

var mysql = require('mysql');
var con = mysql.createConnection({
    host: "172.16.1.77",
    user: "root",
    password: "strong_password",
    database: "curry_db"
});

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});

app.get("/get-order", (request, response) => {
    var query = "Select FullName, CurryType, Spice, NAAN, Drink from Orders";
    con.query(query, function(err, result, fields) {
        if (err) response.status(500).json({error: err.message});
        response.json(result);
    });
});

app.post("/set-order", (request, response) => {
    var query = `Insert into Orders (FullName, CurryType, Spice, NAAN, Drink, CurrentTime) values (${request.body.name}, 
        ${request.body.curry}, ${request.body.spice}, ${request.body.naan}, ${request.body.drink}), NOW()`;
    con.query(query, function (err, result) {
        if (err) response.status(500);
        console.log("1 record inserted.");
    });
});