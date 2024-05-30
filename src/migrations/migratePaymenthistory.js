"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Paymenthistories", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      fee_id: {
        type: Sequelize.INTEGER,
      },
      student_id: {
        type: Sequelize.INTEGER,
      },
      parent_id: {
        type: Sequelize.INTEGER,
      },
      paymentstatus_id: {
        type: Sequelize.INTEGER,
        defaultValue: 2,
      },
      amount: {
        type: Sequelize.INTEGER,
      },
      time: {
        type: Sequelize.DATE,
      },
      orderInfo: {
        type: Sequelize.STRING,
      },
      orderType: {
        type: Sequelize.STRING,
      },
      payType: {
        type: Sequelize.STRING,
      },
      paymentmethod_id: {
        type: Sequelize.INTEGER,
      },
      ishidden: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Paymenthistories");
  },
};
