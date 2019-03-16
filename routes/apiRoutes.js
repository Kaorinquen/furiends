var db = require("../models");

module.exports = function(app) {
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

  // Posting a new picture to the "allPics" table in the "Furiends" database
  app.post("/api/allPics", function(req, res) {
    db.allPics.create(req.body).then(function(dbAllPics) {
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