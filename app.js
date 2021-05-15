//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');


const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/flDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

let price = 2000;

const signupSchema = {
  email: String,
  password: String,
  gender: String,
  contact: String,
  street: String,
  city: String,
  zip: String,
  dob: String,
  f_name: String,
  l_name: String,
};

const loginSchema = {
  userid: String,
  password: String
};

const batsmanSchema = {
  b_id: String,
  name: String,
  runs: String,
  matches: String,
  strikeRate: String,
  price: Number
};

const bowlerSchema = {
  bo_id: String,
  name: String,
  matches: String,
  economy: String,
  wicket: String,
  price: Number
};

const allrounderSchema = {
  a_id: String,
  name: String,
  matches: String,
  runs: String,
  wickets: String,
  price: Number
};

const coachSchema = {
  c_id: String,
  name: String,
  exp: String,
  con: String,
  price: Number
};

const Person = mongoose.model("Person", signupSchema);
const PersonLogin = mongoose.model("PersonLogin", loginSchema);
const Abatsman = mongoose.model("Abatsman", batsmanSchema);
const Ubatsman = mongoose.model("Ubatsman", batsmanSchema);
const Abowler = mongoose.model("Abowler", bowlerSchema);
const Ubowler = mongoose.model("Ubowler", bowlerSchema);
const Aallrounder = mongoose.model("Aallrounder", allrounderSchema);
const Uallrounder = mongoose.model("Uallrounder", allrounderSchema);
const Acoach = mongoose.model("Acoach", coachSchema);
const Ucoach = mongoose.model("Ucoach", coachSchema);

app.get("/", function(req, res) {
  res.render("home");
});


Ubatsman.find(function(err,cost){
  cost.forEach(function(rs){
    price = price - rs.price;
  });
});

Ubowler.find(function(err,cost){
  cost.forEach(function(rs){
    price = price - rs.price;
  });
});

Uallrounder.find(function(err,cost){
  cost.forEach(function(rs){
    price = price - rs.price;
  });
});

Ucoach.find(function(err,cost){
  cost.forEach(function(rs){
    price = price - rs.price;
  });
});
app.get("/admin",function(req,res){
  res.render("admin");
});

app.post("/", function(req, res) {
  const personlogin = new PersonLogin({
    userid: req.body.userid,
    password: req.body.password
  });
  personlogin.save();
  const person = new Person({
    email: req.body.email,
    password: req.body.password,
    gender: req.body.gender,
    contact: req.body.contact,
    street: req.body.street,
    city: req.body.city,
    zip: req.body.zip,
    dob: req.body.dob,
    f_name: req.body.fName,
    l_name: req.body.lName
  });
  person.save(function(err) {
    if (!err) {
      res.redirect("/login");
    }
  });
});

app.get("/added",function(req,res){
  res.render("added");
});
app.get("/incpass", function(req, res) {
  res.render("incpass");
});

app.get("/createteam", function(req, res) {
  res.render("createteam",{ price: price });
});

app.get("/login", function(req, res) {
  res.render("login");
});

app.get("/batsman", function(req, res) {
  Abatsman.find({}, function(err, bats) {
    res.render("batsman", {
      bats: bats
    });
  });
});

app.get("/bowler", function(req, res) {
  Abowler.find({}, function(err, balls) {
    res.render("bowler", {
      balls: balls
    });
  });
});

app.get("/allrounder", function(req, res) {
  Aallrounder.find({}, function(err, alls) {
    res.render("allrounder", {
      alls: alls
    });
  });
});

app.get("/coach", function(req, res) {
  Acoach.find({}, function(err, cos) {
    res.render("coach", {
      cos: cos
    });
  });
});

app.get("/completeteam", function(req, res) {
  res.render("completeteam");
});

app.get("/Abatsman", function(req, res) {
  res.render("Abatsman");
});

app.get("/Abowler", function(req, res) {
  res.render("Abowler");
});

app.get("/Aallrounder", function(req, res) {
  res.render("Aallrounder");
});

app.get("/Acoach", function(req, res) {
  res.render("Acoach");
});

app.get("/Ubatsman", function(req, res) {
  Ubatsman.find({}, function(err, bats) {
    res.render("Ubatsman", {
      bats: bats
    });
  });
});

app.get("/user", function(req, res) {
  Person.find({}, function(err, pers) {
    res.render("user", {
      pers: pers
    });
  });
});

app.get("/Dbatsman", function(req, res) {
  Ubatsman.find({}, function(err, bats) {
    res.render("Dbatsman", {
      bats: bats
    });
  });
});

app.get("/Ubowler", function(req, res) {
  Ubowler.find({}, function(err, balls) {
    res.render("Ubowler", {
      balls: balls
    });
  });
});

app.get("/Dbowler", function(req, res) {
  Ubowler.find({}, function(err, balls) {
    res.render("Dbowler", {
      balls: balls
    });
  });
});


app.get("/Uallrounder", function(req, res) {
  Uallrounder.find({}, function(err, alls) {
    res.render("Uallrounder", {
      alls: alls
    });
  });
});

app.get("/Dallrounder", function(req, res) {
  Uallrounder.find({}, function(err, alls) {
    res.render("Dallrounder", {
      alls: alls
    });
  });
});

app.get("/Ucoach", function(req, res) {
  Ucoach.find({}, function(err, cos) {
    res.render("Ucoach", {
      cos: cos
    });
  });
});

app.get("/Dcoach", function(req, res) {
  Ucoach.find({}, function(err, cos) {
    res.render("Dcoach", {
      cos: cos
    });
  });
});



app.get("/deleted",function(req,res){
  res.render("deleted");
});

app.post("/Abatsman", function(req, res) {
  const abatsman = new Abatsman({
    b_id: req.body.b_id,
    name: req.body.b_name,
    runs: req.body.b_runs,
    matches: req.body.b_match,
    strikeRate: req.body.b_rate,
    price: req.body.b_price
  });
  abatsman.save(function(err) {
    if (!err) {
      res.redirect("/Abatsman");
    }
  });
});

app.post("/Abowler", function(req, res) {
  const abowler = new Abowler({
    bo_id: req.body.bo_id,
    name: req.body.bo_name,
    matches: req.body.bo_match,
    economy: req.body.bo_eco,
    wicket: req.body.bo_wicket,
    price: req.body.bo_price
  });
  abowler.save(function(err) {
    if (!err) {
      res.redirect("/Abowler");
    }
  });
});

app.post("/Aallrounder", function(req, res) {
  const aallrounder = new Aallrounder({
    a_id: req.body.a_id,
    name: req.body.a_name,
    matches: req.body.a_match,
    runs: req.body.a_runs,
    wickets: req.body.a_wicket,
    price: req.body.a_price
  });
  aallrounder.save(function(err) {
    if (!err) {
      res.redirect("/Aallrounder");
    }
  });
});

app.post("/Acoach", function(req,res){
  const acoach = new Acoach({
    c_id: req.body.c_id,
    name: req.body.c_name,
    exp: req.body.c_exp,
    con: req.body.c_country,
    price: req.body.c_price
  });
  acoach.save(function(err) {
    if (!err) {
      res.redirect("/acoach");
    }
  });
});


app.post("/batsman", function(req, res) {
  const ubatsman = new Ubatsman({
    b_id: req.body.b_id,
    name: req.body.b_name,
    runs: req.body.b_runs,
    matches: req.body.b_match,
    strikeRate: req.body.b_rate,
    price: req.body.b_price
  });
  price = price - req.body.b_price;
  ubatsman.save(function(err) {
    if (!err) {
      res.redirect("/added");
    }
  });
});

app.post("/Dbatsman",function(req,res){
  Ubatsman.deleteOne({b_id: req.body.b_id}, function(err){
    if(!err){
      price = price + Number(req.body.b_price);
      res.redirect("/deleted");
    }
  });
});

app.post("/bowler", function(req, res) {
  const ubowler = new Ubowler({
    bo_id: req.body.bo_id,
    name: req.body.bo_name,
    matches: req.body.bo_match,
    economy: req.body.bo_eco,
    wicket: req.body.bo_wicket,
    price: req.body.bo_price
  });
  price = price - req.body.bo_price;
  ubowler.save(function(err) {
    if (!err) {
      res.redirect("/added");
    }
  });
});

app.post("/Dbowler",function(req,res){
  Ubowler.deleteOne({bo_id: req.body.bo_id}, function(err){
    if(!err){
      price = price + Number(req.body.bo_price);
      res.redirect("/deleted");
    }
  });
});

app.post("/allrounder",function(req,res){
  const uallrounder = new Uallrounder({
    a_id: req.body.a_id,
    name: req.body.a_name,
    matches: req.body.a_match,
    runs: req.body.a_runs,
    wickets: req.body.a_wicket,
    price: req.body.a_price
  });
  price = price - req.body.a_price;
  uallrounder.save(function(err) {
    if (!err) {
      res.redirect("/added");
    }
  });
});

app.post("/Dallrounder",function(req,res){
  Uallrounder.deleteOne({a_id: req.body.a_id}, function(err){
    if(!err){
      price = price + Number(req.body.a_price);
      res.redirect("/deleted");
    }
  });
});

app.post("/coach",function(req,res){
  const ucoach = new Ucoach({
    c_id: req.body.c_id,
    name: req.body.c_name,
    exp: req.body.c_exp,
    con: req.body.c_country,
    price: req.body.c_price
  });
  price = price - req.body.c_price;
  ucoach.save(function(err) {
    if (!err) {
      res.redirect("/added");
    }
  });
});

app.post("/Dcoach",function(req,res){
  Ucoach.deleteOne({c_id: req.body.c_id}, function(err){
    if(!err){
      price = price + Number(req.body.c_price);
      res.redirect("/deleted");
    }
  });
});


app.post("/login", function(req, res) {
  PersonLogin.find(function(err, personlogins) {
    let i = 0;
    let j = 0;
    for (i = 0; i < personlogins.length; i++) {
      if (personlogins[i].userid == req.body.userid && personlogins[i].password == req.body.password) {
        j = 1;
        res.redirect("/createteam");
        break;
      }
    }
    if (j == 0) {
      res.redirect("/incpass");
    }
  });
});









app.listen(3000, function() {
  console.log("Server started on port 3000");
});
