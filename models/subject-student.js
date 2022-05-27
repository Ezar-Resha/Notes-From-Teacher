'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SubjectStudent extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  SubjectStudent.init({
    SubjectId: DataTypes.INTEGER,
    StudentId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'SubjectStudent',
  });
  return SubjectStudent;
};