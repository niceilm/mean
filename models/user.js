"use strict";
module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    userid : DataTypes.STRING,
    password : DataTypes.STRING,
    name : DataTypes.STRING
  }, {
    classMethods : {
      associate : function(models) {
      }
    }
  });

  return User;
};