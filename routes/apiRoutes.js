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
          .then(function (result) {
            res.redirect('/dashboard');
          });
      });
    }
  });



  // Grabs all users from the "Users" table in the "Furiends" database
  app.get("/api/Users", function(req, res) {
    db.Users.findAll({}).then(function(dbUsers){
      res.json(dbUsers);
    });
  });

  // Adds a new user to the "Users table in the "Furiends" database
  app.post("/api/Users", function(req, res) {
    db.Users.create(req.body).then(function(dbUsers){
      res.json(dbUsers);
    });
  });

  // Get all pictures from the "allPics" table in the "Furiends" database
  app.get("/api/allPics", function(req, res) {
    db.allPics.findAll({}).then(function(dbAllPics) {
      res.json(dbAllPics);
    });
  });

  // Destroying a picture in the "allPics" table in the "Furiends" database
  app.delete("/api/allPics/:id", function(req, res) {
    db.allPics.destroy({ where: { id: req.params.id } }).then(function(dbAllPics) {
      res.json(dbAllPics);
    });
  });
};