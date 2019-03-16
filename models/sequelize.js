// This model is for grabbing info from the "allPics" table in the database
module.exports = function (sequelize, DataTypes) {
  var Users = sequelize.define("Users", {
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    username: DataTypes.STRING,
    profilePic: DataTypes.STRING,
    bio: DataTypes.TEXT,
    species: DataTypes.STRING,
    breed: DataTypes.STRING,
    location: DataTypes.STRING,
    disabled: {
      type: DataTypes.BOOLEAN,
      default: false
    }
  });

  var allPics = sequelize.define("allPics", {
    url: DataTypes.STRING,
    comment: DataTypes.TEXT,
    username: DataTypes.STRING,
    showPhoto: DataTypes.BOOLEAN
  });

  allPics.belongsTo(Users)
  return Users, allPics;
};