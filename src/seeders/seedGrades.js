"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("Grades", [
      {
        name: "Lớp 10",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Lớp 11",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Lớp 12",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Grades", null, {});
  },
};
