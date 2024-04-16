"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("Class_User", [
      {
        class_id: 0,
        user_id: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        class_id: 0,
        user_id: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Class_User", null, {});
  },
};
