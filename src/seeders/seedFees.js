"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("Fees", [
      {
        name: "Học phí kỳ 1",
        price: "1000000",
        startDate: new Date("2024-01-01"),
        endDate: new Date("2024-01-10"),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Đoán phí",
        price: "10000",
        startDate: new Date("2024-01-01"),
        endDate: new Date("2024-01-10"),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Fees", null, {});
  },
};
