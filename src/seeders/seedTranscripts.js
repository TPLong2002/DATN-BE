"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("Transcripts", [
      {
        name: "Transcript 1",
        user_id: 4,
        rankedacademic_id: 6,
        conduct_id: 5,
        semester_id: 1,
        schoolyear: "2017-2018",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Transcript 2",
        user_id: 5,
        rankedacademic_id: 6,
        conduct_id: 5,
        semester_id: 1,
        schoolyear: "2017-2018",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Transcripts", null, {});
  },
};
