// This model is for grabbing info from the "allPics" table in the database
module.exports = function(sequelize, DataTypes) {
    var allPics = sequelize.define("allPics", {
        url: DataTypes.STRING,
        comment: DataTypes.TEXT,
        username: DataTypes.STRING,
        showPhoto: DataTypes.BOOLEAN
      });

      allPics.belongsTo(Users)
      return allPics;    
};