const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
const db = require('../models');

var cloudinary = require('cloudinary');
var multer = require("multer");
var Datauri = require('datauri');
var path = require('path');

//Image upload middleware and buffer converter
var storage = multer.memoryStorage();
var multerUpload = multer(storage).single("image");
var dUri = new Datauri();
const dataUri = req => dUri.format(path.extname(req.file.originalname).toString(), req.file.buffer);

// LOGIN EJS <% include ./partials/messages %>
// REGISTER EJS <% include ./partials/messages %>

router.get('/login', (req, res) => res.render('login'));

router.get('/register', (req, res) => res.render('register'));

// Register Handle
router.post('/register', (req, res) => {
  let { name, email, password, password2 } = req.body;

  let errors = [];

  //Check Required Fields
  if (!name || !email || !password || !password2) {
    errors.push({ msg: 'Please fill in all the fields' });
  }

  if (password !== password2) {
    errors.push({ msg: 'Passwords do not match' });
  }

  if (password.length < 6) {
    errors.push({ msg: 'Password should be at least 6 characters' });
  }

  if (errors.length > 0) {
    res.render('register', {
      errors,
      name,
      email,
      password,
      password2
    });
  } else {
    //res.send('pass');
    // Validation Pass
    db.User.findOne({ where: {email: email }}).then(user => {
      if (user) {
        //User Exists
        errors.push({ msg: 'Email is already registered' });
        res.render('register', {
          errors,
          name,
          email,
          password,
          password2
        });
      } else {
        //Hash Password
        bcrypt.genSalt(10, (err, salt) =>
          bcrypt.hash(password, salt, (err, hash) => {
            if (err) throw err;
            //Set password to hash
            password = hash;
            db.User.create({
              userName: name,
              email: email,
              password: password
            }).then(() => {
              req.flash('success_msg', 'You are now registered and can log in');
              res.redirect('/users/login');
            });
          })
        );
      }
    });
  }
});

//Login Handle
router.post('/login', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/users/login',
    failureFlash: true
  })(req, res, next);
});

//Logout
router.get('/logout', (req, res) => {
  req.logout();
  req.flash('success_msg', 'You are logged out');
  res.redirect('/users/login');
});

router.post("/upload", multerUpload, (req, res) => {
  if (req.file) {
    var file = dataUri(req).content;
    let { comment, userName, id } = req.body;
    cloudinary.uploader.upload(file, (result) => {
      db.allPics
        .create({
          url: result.secure_url,
          comment: comment,
          username: userName,
          showPhoto: true,
          UserId: id
        })
        .then(function (result) {
          res.redirect('/dashboard');
        });
    });
  }
});

module.exports = router;
