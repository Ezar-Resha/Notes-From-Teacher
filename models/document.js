'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Document extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Document.belongsTo(models.Subject, {foreignKey: "SubjectId"})
    }
  }
  Document.init({
    name: DataTypes.STRING,
    directory: DataTypes.STRING,
    description: DataTypes.STRING,
    SubjectId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Document',
  });
  return Document;
};