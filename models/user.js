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

  return User;
};
