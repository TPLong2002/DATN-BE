"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("Users", [
      {
        email: "NVA@gmail.com",
        username: "admin",
        password: "123Admin",
        group_id: 0,
        islocked: 0,
        isdeleted: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: "NVB@gmail.com",
        username: "GV001",
        password: "123Admin",
        group_id: 3,
        islocked: 0,
        isdeleted: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: "NVC@gmail.com",
        username: "GV002",
        password: "123Admin",
        group_id: 3,
        islocked: 0,
        isdeleted: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: "NVD@gmail.com",
        username: "HS230001",
        password: "123Admin",
        group_id: 1,
        islocked: 0,
        isdeleted: 0,
        schoolyear_id: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: "NVE@gmail.com",
        username: "HS230002",
        password: "123Admin",
        group_id: 1,
        islocked: 0,
        isdeleted: 0,
        schoolyear_id: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: "NVF@gmail.com",
        username: "HS230003",
        password: "123Admin",
        group_id: 1,
        islocked: 0,
        schoolyear_id: 3,
        isdeleted: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: "NVG@gmail.com",
        username: "PH230001",
        password: "123Admin",
        group_id: 2,
        islocked: 0,
        isdeleted: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Users", null, {});
  },
};
