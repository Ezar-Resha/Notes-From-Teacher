'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Student extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    formatBirthDate() {
      return this.dateOfBirth.toISOString().split('T')[0]
    }
    static associate(models) {
      // define association here
      Student.belongsToMany(models.Subject,{through: models.SubjectStudent})
    }
  }
  Student.init({
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: true,
        notEmpty: {msg: 'first name cannot be empty'}
      }
    },
    lastName: DataTypes.STRING,
    dateOfBirth: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        countAge(value) {
          if (Math.floor((new Date() - new Date(this.dateOfBirth).getTime()) / 3.15576e+10) < 12 || Math.floor((new Date() - new Date(this.dateOfBirth).getTime()) / 3.15576e+10) > 20) {
            throw new Error('age cannot be less than 12 and above 20')
          }
        }
      }
    },
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
    modelName: 'Student',
  });
  return Student;
};