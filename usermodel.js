var Sequelize = require("sequelize");
// sequelize (lowercase) references our connection to the DB.
// var sequelize = require("../config/connection.js");


var Users = sequelize.define("user", {
  email: Sequelize.STRING,
  password: Sequelize.STRING,
  username: Sequelize.STRING,
  profilePicUrl: Sequelize.STRING,
  bio: Sequelize.STRING,
  species: Sequelize.STRING,
  breed: true,
  createdAt: Sequelize.DATE
});

// Syncs with DB
Users.sync();

module.exports = Users;