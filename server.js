// Dependencies
// =============================================================
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 8080;
// app.use('/static', express.static('/assets'));
// app.use(express.static('public'));
app.use(express.static("assets"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var tables = [];
var waitingList = [];

// Retrieve the home page 
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "home.html"));
});

// Retrieve the form to add a new reservation
app.get("/make", function(req, res) {
  res.sendFile(path.join(__dirname, "make.html"));
});

// Retrieve the table view of reservations and waiting list
app.get("/view", function(req, res) {
  res.sendFile(path.join(__dirname, "view.html"));
});

// Get all customers still waiting
app.get("/api/waitlist", function(req, res){
  return res.json(waitingList);
});

// Get all reserved tables
app.get("/api/tables", function(req, res) {
  return res.json(tables);
});

// Add a new reservation
app.post("/api/tables", function(req, res) {

  var json = req.body;

  var table = { name : json.name, phonenumber : json.phonenumber, email : json.email, uniqueid : json.uniqueid };

  

  // if(tables.length > 4){
  //   console.log("adding to waiting list", table);
  //   waitingList.push(table);
  // }
  // else {
    console.log("adding new table", table);
    tables.push(table);
  // }

  res.json(table);
});

app.post("/api/waitlist", function(req, res) {

  var json = req.body;

  var table = { name : json.name, phonenumber : json.phonenumber, email : json.email, uniqueid : json.uniqueid };

    console.log("adding to waiting list", table);
    waitingList.push(table);

  res.json(table);
});

app.post("/api/clear", function(req, res) {
  waitingList = [];
  tables = [];
  // res.json(false);
});

app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
