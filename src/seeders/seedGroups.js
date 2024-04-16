"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("Groups", [
      {
        name: "admin",
        description: "admin",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "student",
        description: "Student",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "parent",
        description: "Parent",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "teacher",
        description: "Teacher",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "accountant",
        description: "Accountant",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Groups", null, {});
  },
};
