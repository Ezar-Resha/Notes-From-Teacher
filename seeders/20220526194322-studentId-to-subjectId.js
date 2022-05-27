'use strict';

const data = require('../data/subjectstudents.json')

module.exports = {
  up (queryInterface, Sequelize) {
    data.forEach(el => {
      el.createdAt = new Date()
      el.updatedAt = new Date()
    })
    return queryInterface.bulkInsert('SubjectStudents', data, {})
  },

  down (queryInterface, Sequelize) {
  
    return queryInterface.bulkDelete('SubjectStudents', null, {})
  }
}