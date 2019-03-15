
module.exports = function(sequelize, DataTypes) {
  var Users = sequelize.define("Users", {
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    username: DataTypes.STRING,
    profilePic: DataTypes.STRING,
    bio: DataTypes.TEXT,
    species: DataTypes.STRING,
    breed: DataTypes.STRING,
    location: DataTypes.STRING
  });
  return Users;
};