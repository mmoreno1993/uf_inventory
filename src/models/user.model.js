
'use strict';
const { compareSync, hashSync, genSaltSync } = require("bcryptjs");
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserSchema extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  user.init({
    name: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'User',
  });
  UserSchema.methods.toJSON = function() {
    let user = this.toObject();
    delete user.password;
    return user;
  };
  
  UserSchema.methods.comparePasswords = function(password) {
    return compareSync(password, this.password);
  };
  
  UserSchema.pre("save", async function(next) {
    const user = this;
  
    if (!user.isModified("password")) {
      return next();
    }
  
    const salt = genSaltSync(10);
    const hashedPassword = hashSync(user.password, salt);
    user.password = hashedPassword;
    next();
  });
  
  return user;
};