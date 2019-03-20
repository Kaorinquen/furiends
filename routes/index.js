const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth');

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

//Create User Route to separate pages and Ensure Authentication to view separate pages
// Place condition that tests if the user is logged in

module.exports = router; 
