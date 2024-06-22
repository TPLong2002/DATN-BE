"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Semesters extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Semesters.hasMany(models.Transcripts, {
        foreignKey: "semester_id",
      });
      Semesters.hasMany(models.Marks, {
        foreignKey: "semester_id",
      });
      Semesters.hasMany(models.News, {
        foreignKey: "semester_id",
      });
      Semesters.hasMany(models.Fees, {
        foreignKey: "semester_id",
      });
      Semesters.hasMany(models.Assignments, {
        foreignKey: "semester_id",
      });
    }
  }
  Semesters.init(
    {
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Semesters",
    }
  );
  return Semesters;
};
