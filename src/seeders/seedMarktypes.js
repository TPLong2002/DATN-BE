"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("Marktypes", [
      {
        name: "Điểm miệng",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "15 phút",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "1 tiết",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Giữa kỳ",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Cuối kỳ",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Marktypes", null, {});
  },
};
