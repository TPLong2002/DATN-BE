"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("Schoolyears", [
      {
        name: "2019-2020",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "2020-2021",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Schoolyears", null, {});
  },
};
