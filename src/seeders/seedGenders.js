"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("Genders", [
      {
        description: "Nam",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        description: "Nữ",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Genders", null, {});
  },
};
