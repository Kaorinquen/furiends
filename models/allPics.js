module.exports = function(sequelize, DataTypes) {
  var allPics = sequelize.define("allPics", {
    url: DataTypes.STRING,
    comment: DataTypes.TEXT,
    username: DataTypes.STRING,
    showPhoto: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    }
  });

  allPics.associate = function(models) {
    allPics.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return allPics;
};
