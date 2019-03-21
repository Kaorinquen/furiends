module.exports = function (sequelize, DataTypes) {
  var User = sequelize.define("User", {
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    userName: DataTypes.STRING,
    profilePic: DataTypes.STRING,
    bio: DataTypes.TEXT,
    species: DataTypes.STRING,
    breed: DataTypes.STRING,
    location: DataTypes.STRING,
    disabled: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  });

<<<<<<< HEAD
  var allPics = sequelize.define("allPics", {
    url: DataTypes.STRING,
    comment: DataTypes.TEXT,
    username: DataTypes.STRING,
    showPhoto: DataTypes.BOOLEAN
  });

  allPics.belongsTo(User)
  return User, allPics;
=======
  return User;
>>>>>>> 2b9012b0c18f424d6418963b839fec38a8cb2d3a
};
