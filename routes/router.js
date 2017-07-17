const express = require("express");
const router = express.Router();
const Users = require("../models/users");
const Util = require("../utilities");

router.get("/", function(req, res){
  if (req.session.username){
    res.render("index");
  } else {
    res.redirect("/signin");
  }
});

router.get("/signin",function (req,res) {
  res.send("Welcome");
});

router.post("/signin", function(req, res){
  Users.findOne({username:req.body.username})
  .then(function(user){
    if (user){
      let isPassCorrect = Util.password.compare(user.password, req.body.password);
      if (isPassCorrect){
        req.session.username = user.username;
        res.redirect("/");
      } else {
        res.render("signin", {message:"Incorrect username password combination"});
      }
    } else {
      res.redirect(401, "/signin");
    }
  });
});

router.get("/signup", function(req, res){
  res.send("Welcome");
});

router.post("/signup", function(req, res){
  if (req.body.username && req.body.password){
    let hashData = Util.password.hash(req.body.password);
    Users.create({
      username: req.body.username,
      password: hashData
    }).then(function (user) {
      if (user) {
        res.redirect(201, "/signin");
      } else {
        res.redirect(500, "/");
      }
    }).catch(function (err) {
      console.log(err);
      res.redirect(500, "/");
    });
  } else {
    res.redirect(400, "/signup");
  }
});

router.post("/logout", function(req, res){
  req.session.destroy();
  res.redirect(200, "/signin");
});

module.exports = router;