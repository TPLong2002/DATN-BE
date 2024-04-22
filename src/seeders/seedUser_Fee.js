"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("User_Fee", [
      {
        user_id: 7,
        fee_id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        user_id: 7,
        fee_id: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("User_Fee", null, {});
  },
};
