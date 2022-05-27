'use strict';

const fs = require('fs')
const data = require("../data/students.json")

module.exports = {
  up (queryInterface, Sequelize) {
    data.forEach(el => {
      delete el.id;
      el.createdAt = new Date()
      el.updatedAt = new Date()
    })
    return queryInterface.bulkInsert('Students', data, {})
  },

  down (queryInterface, Sequelize) {
  
    return queryInterface.bulkDelete('Students', null, {})
  }
};
