"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("Semesters", [
      {
        name: "Kỳ 1",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Kỳ 2",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Semesters", null, {});
  },
};
