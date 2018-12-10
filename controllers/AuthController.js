const mongoose = require("mongoose");
const passport = require("passport");
const User = require("../models/User");
const Item = require("../models/Item");

const userController = {};

//Home page
userController.home = function(req, res) {
  res.render('index', {user : req.user});
};

// Go to registration page
userController.register = function(req, res) {
  res.render('register');
};

// Post registration
userController.doRegister = function(req, res) {
  User.register(new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    username : req.body.username}), req.body.password, function(err, user) {
    if (err) {
      console.log(err);
    }
    passport.authenticate('local')(req, res, function () {
      res.redirect('/');
    });
  });
};

// Go to login page
userController.login = function(req, res) {
  res.render('login');
};

// Post login
userController.doLogin = function(req, res) {
  passport.authenticate('local')(req, res, function () {
      res.redirect('/');
  });
};

// logout
userController.logout = function(req, res) {
  req.logout();
  res.redirect('/');
};

// //Display new item page
userController.newItem = function(req, res) {
  if (!req.user) {
    res.render('login');
  }
  else {
    res.render("new-item", {user: req.user});
  }
};

//Add new item
userController.addNewItem = function(req, res) {
  if (!req.user) {
    res.redirect('login');
  }
  else {
    //Add new Item to db, storing user id
    new Item({
      user: req.user._id,
      name: req.body.name,
      desc: req.body.desc,
      lost: true,
      qrCode: Math.floor(Math.random() * 1000) //implement qrCode generation here
    }).save(function(err) {
      if (err) {
        res.render("new-item", {user: req.user});
      }
      else {
        res.redirect("/");
      }
    });
  }
};

// Display sound reports added by user during their session
userController.myItems = function(req, res) {
  Item.find({user : req.user._id},function(err, items) {
    res.render("my-items", {
      'items': items,
      "user": req.user
    });
  });
};

module.exports = userController;
