'use strict';
const {
  Model
} = require('sequelize');

const bcrypt = require('bcryptjs')
const salt = bcrypt.genSaltSync(10);
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    role:DataTypes.STRING,
  }, {
    hooks:{
      beforeCreate(instance,options){
        instance.password = bcrypt.hashSync(instance.password, salt)
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};