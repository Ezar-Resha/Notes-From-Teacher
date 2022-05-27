'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Subject extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    
    static associate(models) {
      // define association here
      Subject.belongsTo(models.Teacher)
      Subject.belongsToMany(models.Student,{through: models.SubjectStudent})
      Subject.hasMany(models.Document, {foreignKey: "SubjectId"})
    }

    static find(id){
      return Subject.findOne({where:{id:id}, include: [sequelize.models.Teacher, sequelize.models.Student]})
    }
  }
  Subject.init({
    subjectName: DataTypes.STRING,
    TeacherId: DataTypes.INTEGER,
    notes:DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Subject',
  });
  return Subject;
};