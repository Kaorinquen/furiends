var db = require("../models");
var router = require('express').Router();
var cloudinary = require('cloudinary');
var multer = require("multer");
var Datauri = require('datauri');
var path = require('path');
const { ensureAuthenticated } = require('../config/auth');

//Image upload middleware and buffer converter
var storage = multer.memoryStorage();
var multerUpload = multer(storage).single("image");
var dUri = new Datauri();
const dataUri = req => dUri.format(path.extname(req.file.originalname).toString(), req.file.buffer);


// POST ROUTES
// POST route for saving a new picture
router.post("/api/upload", multerUpload, (req, res) => {
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
          return res.redirect('/dashboard');
        });
    });
  }
});

// Get all pictures from the "allPics" table for front page
router.get("/api/front/:offset", function(req, res) {
  var number = parseInt(req.params.offset);
  db.allPics.findAll({ attributes: ['url'], offset: number, limit: 12 }
  ).then(function(dbAllPics) {
    res.json(dbAllPics);
  });
});

// Get all pictures from the "allPics" table for explorer page
router.get("/api/explorer/:offset", ensureAuthenticated, function(req, res) {
  var number = parseInt(req.params.offset);
  db.allPics.findAll({ attributes: ['url', 'comment', 'createdAt', "userName", "userId" ], offset: number, limit: 12 }
  ).then(function(dbAllPics) {
    res.json(dbAllPics);
  });
});

// Get all pictures from the "allPics" table for current user page
router.get("/api/allPicsUrl/:offset", ensureAuthenticated, function(req, res) {
  var number = parseInt(req.params.offset);
  db.allPics.findAll({ where: { userId: req.user.id }, attributes: ['url', 'comment', 'createdAt' ], offset: number, limit: 6 }
  ).then(function(dbAllPics) {
    res.json(dbAllPics);
  });
});

// Get all pictures from the "allPics" table for the other user page
router.get("/api/allOtherPicsUrl/:offset/:userId", ensureAuthenticated, function(req, res) {
  var number = parseInt(req.params.offset);
  var userId = req.params.userId
  db.allPics.findAll({ where: { userId: userId }, attributes: ['url', 'comment', 'createdAt' ], offset: number, limit: 6 }
  ).then(function(dbAllPics) {
    res.json(dbAllPics);
  });
});

// POST route for saving a new user lives in "users.js" because,
// that is where the passport logic lives and users can only
// create a new user via passport/login screen

  // =================================================================
  // GET ROUTES
  // Grabs all users from the "Users" table in the "Furiends" database
  router.get("/api/User", function(req, res) {
    db.User.findAll({}).then(function(dbUsers){
      res.json(dbUsers);
    });
  });
  // Gets all the pictures in the "allPics" table in the "furiends" database
  router.get("/api/allPics", function(req, res) {
    var query = {};
    if (req.query.userId) {
      query.userId = req.query.userId;
    }
    db.allPics.findAll({
      where: query,
      include: [db.User]
    }).then(function(dballPics) {
      res.json(dballPics);
    });
  });

  // Gets a specific user
  router.get("/api/User/:id", function(req, res) {
    db.User.findOne({
      where: {
        id: req.params.userId
      },
      include: [db.allPics]
    }).then(function(data) {
      res.json(data);
    });
  });
  // Gets a specific picture
  router.get("/api/allPics/:id", function(req, res) {
    db.allPics.findOne({
      where: {
        url: req.params.url
      },
      include: [db.User]
    }).then(function(data) {
      res.json(data);
    });
  });

  // ===============================================================
  // PUT route
  // Updates a specific picture
router.put("/api/allPics", function(req, res) {
  db.allPics.update(
    req.body,
    {
      where: {
        id: req.body.id
      }
    }).then(function(dballPics) {
      res.json(dballPics);
  });
});

  // ==============================================================
  // DELETE routes
  //Destroys a user in the "users" table in the "furiends" database
  router.delete("/api/users/:id", function(req, res) {
    db.User.destroy({
      where: {
        id: req.params.userId
      }
    }).then(function(dbUser) {
      res.json(dbUser);
    });
  });

  // Destroys a picture in the "allPics" table in the "Furiends" database
  router.delete("/api/allPics/:id", function(req, res) {
    db.allPics.destroy({
      where: { 
        id: req.params.id
      } 
    }).then(function(dbAllPics) {
      res.json(dbAllPics);
    });
  });

  module.exports = router;