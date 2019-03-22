var db = require("../models");

var cloudinary = require('cloudinary');
var multer = require("multer");
var Datauri = require('datauri');
var path = require('path');

//Image upload middleware and buffer converter
var storage = multer.memoryStorage();
var multerUpload = multer(storage).single("image");
var dUri = new Datauri();
const dataUri = req => dUri.format(path.extname(req.file.originalname).toString(), req.file.buffer);

module.exports = function(app) {
// POST ROUTES
// POST route for saving a new picture
  app.post("/api/upload", multerUpload, (req, res) => {
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
          .then(function (results) {
            res.json(results)
            res.redirect('/dashboard');
          });
      });
    }
  });

// POST route for saving a new user lives in "users.js" because,
// that is where the passport logic lives and users can only
// create a new user via passport/login screen

  // =================================================================
  // GET ROUTES
  // Grabs all users from the "Users" table in the "Furiends" database
  app.get("/api/User", function(req, res) {
    db.User.findAll({}).then(function(dbUsers){
      res.json(dbUsers);
    });
  });
  // Gets all the pictures in the "allPics" table in the "furiends" database
  app.get("/api/allPics", function(req, res) {
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
  app.get("/api/User/:id", function(req, res) {
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
  app.get("/api/allPics/:id", function(req, res) {
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
app.put("/api/allPics", function(req, res) {
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
  app.delete("/api/users/:id", function(req, res) {
    db.User.destroy({
      where: {
        id: req.params.userId
      }
    }).then(function(dbUser) {
      res.json(dbUser);
    });
  });

  // Destroys a picture in the "allPics" table in the "Furiends" database
  app.delete("/api/allPics/:id", function(req, res) {
    db.allPics.destroy({
      where: { 
        id: req.params.id
      } 
    }).then(function(dbAllPics) {
      res.json(dbAllPics);
    });
  });
};