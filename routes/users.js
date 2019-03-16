const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
const db = require('../models');

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

//  router.post('/login', 
//   passport.authenticate('local', { 
//     failureRedirect: '/users/login',
//     successRedirect: '/dashboard',  
//     failureFlash: true })
//   // function(req, res) {
//   //   // res.redirect('/dashboard');
//   //   // res.redirect('http://localhost:3000/dashboard')
//   //   res.redirect("dashboard");
//   // });
//  );

//Login Handle
router.post('/login', (req, res, next) => {
  passport.authenticate('local', {
    // successRedirect: 'http://localhost:3000/dashboard',
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

module.exports = router;
