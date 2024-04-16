"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("News", [
      {
        Title: "Thông báo nộp học phí",
        content: "Nhà trường thông báo đến phụ huynh học sinh nộp học phí kỳ 1",
        user_id: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("News", null, {});
  },
};
