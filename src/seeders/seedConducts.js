"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("Conducts", [
      {
        name: "Tốt",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Khá",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Trung bình",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Yếu",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "NA",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Conducts", null, {});
  },
};
