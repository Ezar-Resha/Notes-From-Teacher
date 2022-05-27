'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Teacher extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */

    get fullName(){
      return `${this.firstName} ${this.lastName}`
    }
    static associate(models) {
      // define association here
      Teacher.hasOne(models.Subject)
    }
  }
  Teacher.init({
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: true,
        notEmpty: {msg: 'first name cannot be empty'}
      }
    },
    lastName: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: {msg: 'please insert a proper email'}
      }
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        isUrl: {msg: 'please insert a proper URL'}
      }
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: true,
        notEmpty: {msg: 'phone number cannot be empty'}
      }
    }
  }, {
    sequelize,
    modelName: 'Teacher',
  });
  return Teacher;
};