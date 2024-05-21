"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Transcripts", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
      },
      ishidden: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      user_id: {
        type: Sequelize.INTEGER,
      },
      rankedacademic_id: {
        type: Sequelize.INTEGER,
      },
      conduct_id: {
        type: Sequelize.INTEGER,
      },
      semester_id: {
        type: Sequelize.INTEGER,
      },
      schoolyear_id: {
        type: Sequelize.INTEGER,
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
    await queryInterface.dropTable("Transcripts");
  },
};
