"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("Categories", [
      {
        description: "Thi kiểm tra",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        description: "Thời khóa biểu",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        description: "Sự kiện",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        description: "Giới thiệu",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        description: "Quy chế văn bản",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        description: "Học phí",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Categories", null, {});
  },
};
