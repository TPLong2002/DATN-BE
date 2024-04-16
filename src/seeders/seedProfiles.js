"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("Profiles", [
      {
        user_id: 0,
        phoneNumber: "0123456789",
        firstName: "Nguyễn Văn",
        lastName: "A",
        avt: "https://c.pxhere.com/images/0d/18/4fa31701d2cfa087836d807967f3-1447663.jpg!d",
        address: "Duy Trinh, Duy Xuyên, Quảng Nam",
        dateOfBirth: new Date("1989-01-01"),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Profiles", null, {});
  },
};
