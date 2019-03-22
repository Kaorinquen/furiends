const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth');
const db = require('../models');

// Welcome Page
router.get('/', (req, res) => res.render('welcome'));

//Dashboard
router.get('/dashboard', ensureAuthenticated, (req, res) =>{ 
  //console.log(req.user);
  res.render('dashboard', {
    user: req.user
  })
}
);

//Explore page
router.get('/explore', ensureAuthenticated, (req, res) =>{ 
  res.render('explore', {
    user: req.user
  })
}
);

// Create User Route to separate pages and Ensure Authentication to view separate pages
// Place condition that tests if the user is logged in
// FEEL FREE TO CHANGE THIS
router.get('/userprofile/:userId', ensureAuthenticated, (req, res) => {

  // Add variable that holds the user accessing the page
  let userAccess = req.session.passport.user;
  console.log("THIS IS THE SESSION USER: " + req.session.passport.user);

  // Variable that holds the profile page of the user being requested
  let userReq = req.params.userId; 

  db.User.findOne({ where: {  id: userReq } })
        .then(user => {
          // Condition that tests whether it is the User accessing their own page or that of another user
          if (userAccess == userReq){
          // Accessing the own profile page
          res.render('dashboard', {
            user: req.user
          })
          } else {
          // Accessing someone else's page
          res.render("otherDashboard", {
            user: req.user,
            profile: user
          })
          }
        }).catch(err => console.log(err));
});

module.exports = router; 