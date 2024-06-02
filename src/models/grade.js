"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Grades extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Grades.hasMany(models.Subjects, { foreignKey: "grade_id" });
      Grades.hasMany(models.Fees, { foreignKey: "grade_id" });
    }
  }
  Grades.init(
    {
      name: DataTypes.STRING,
      ishidden: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Grades",
    }
  );
  return Grades;
};
