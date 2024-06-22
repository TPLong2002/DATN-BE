"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Schoolyears extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Schoolyears.hasMany(models.Transcripts, {
        foreignKey: "schoolyear_id",
      });
      Schoolyears.hasMany(models.Classes, {
        foreignKey: "schoolyear_id",
      });
      Schoolyears.hasMany(models.Marks, {
        foreignKey: "schoolyear_id",
      });
      Schoolyears.hasMany(models.Fees, {
        foreignKey: "schoolyear_id",
      });
      Schoolyears.hasMany(models.News, {
        foreignKey: "schoolyear_id",
      });
      Schoolyears.hasMany(models.Assignments, {
        foreignKey: "schoolyear_id",
      });
    }
  }
  Schoolyears.init(
    {
      name: DataTypes.STRING,
      ishidden: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Schoolyears",
    }
  );
  return Schoolyears;
};
