"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("Subjects", [
      {
        name: "Toán số",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Toán hinh",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Lý",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Hóa",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Sinh",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Subjects", null, {});
  },
};
