var db = require("../models");

module.exports = function(app) {
  // Get all pictures from the "allPics" table in the "Furiends" database
  app.get("/api/allPics", function(req, res) {
    db.allPics.findAll({}).then(function(dbAllPics) {
      res.json(dbAllPics);
    });
  });

  // Create a new example
  app.post("/api/examples", function(req, res) {
    db.Example.create(req.body).then(function(dbExample) {
      res.json(dbExample);
    });
  });

  // Delete an example by id
  app.delete("/api/examples/:id", function(req, res) {
    db.Example.destroy({ where: { id: req.params.id } }).then(function(dbExample) {
      res.json(dbExample);
    });
  });
};
