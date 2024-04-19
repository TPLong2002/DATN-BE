"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("Assignments", [
      {
        name: "Bài tập 1",
        content: "1+1=?",
        teacher_id: 2,
        subject_id: 1,
        startdate: new Date(),
        deadline: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Assignments", null, {});
  },
};
