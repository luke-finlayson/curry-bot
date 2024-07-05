const express = require("express");
const app = express();
app.use(express.json());

//listen for requests
const PORT = process.env.PORT || 3000;

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.listen(PORT, () => {
  console.log("Server Listening on PORT:", PORT);
});

//define an endpoint
app.get("/status", (request, response) => {
  const status = {
    Status: "Running",
  };
  response.send(status);
});

var mysql = require("mysql");
var con = mysql.createConnection({
  host: "127.0.0.1",
  user: "curry",
  password: "strong_password",
  database: "curry_db",
  port: 3307,
});

con.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
});

app.get("/get-order", (request, response) => {
  var query = "Select FullName, CurryType, Spice, NAAN, Drink from Orders";
  con.query(query, function (err, result, fields) {
    if (err) response.status(500).json({ error: err.message });
    response.json(result);
  });
});

app.post("/set-order", (request, response) => {
  // Calculate the points
  let points = 1;
  if (request.body.spice === "Medium") points = 2;
  if (request.body.spice === "Hot") points = 3;

  var query = `Insert into Orders (Email, CurryType, Spice, NAAN, Drink, Points, CurrentTime) values ('${request.body.email}', 
        '${request.body.curry}', '${request.body.spice}', '${request.body.naan}', '${request.body.drink}', '${points}', NOW())`;

  con.query(query, function (err, result) {
    if (err) response.status(500);
    console.log("1 record inserted.");
    response.status(200).json({ success: true });
  });
});
