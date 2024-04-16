"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("Parent_Student", [
      {
        parent_id: 6,
        student_id: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        parent_id: 6,
        student_id: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Parent_Student", null, {});
  },
};
