"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("Marks", [
      {
        subject_id: 1,
        user_id: 5,
        marktype_id: 1,
        mark: 10,
        schoolyear_id: 1,
        transcript_id: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        subject_id: 2,
        user_id: 5,
        marktype_id: 1,
        mark: 9,
        schoolyear_id: 1,
        transcript_id: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        subject_id: 2,
        user_id: 4,
        marktype_id: 1,
        mark: 7.5,
        schoolyear_id: 1,
        transcript_id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        subject_id: 1,
        user_id: 4,
        marktype_id: 1,
        mark: 8,
        schoolyear_id: 1,
        transcript_id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Marks", null, {});
  },
};
