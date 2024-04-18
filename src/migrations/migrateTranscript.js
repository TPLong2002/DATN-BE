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
      user_id: {
        type: Sequelize.INTEGER,
      },
      subject_id: {
        type: Sequelize.INTEGER,
      },
      marktype_id: {
        type: Sequelize.INTEGER,
      },
      mark: {
        type: Sequelize.FLOAT,
      },
      semester_id: {
        type: Sequelize.INTEGER,
      },
      rankedacademic_id: {
        type: Sequelize.INTEGER,
      },
      conduct: {
        type: Sequelize.STRING,
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
