"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Assignments extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Assignments.belongsTo(models.Users, { foreignKey: "teacher_id" });
      Assignments.belongsToMany(models.Classes, {
        as: "Assignment_Classes",
        through: "Assignment_Class",
        foreignKey: "assignment_id",
      });
      Assignments.belongsTo(models.Subjects, { foreignKey: "subject_id" });
      Assignments.belongsTo(models.Schoolyears, {
        foreignKey: "schoolyear_id",
      });
      Assignments.belongsTo(models.Semesters, { foreignKey: "semester_id" });
    }
  }
  Assignments.init(
    {
      name: DataTypes.STRING,
      content: DataTypes.STRING,
      teacher_id: DataTypes.INTEGER,
      subject_id: DataTypes.INTEGER,
      startdate: DataTypes.DATE,
      deadline: DataTypes.DATE,
      image: DataTypes.STRING,
      ishidden: DataTypes.INTEGER,
      schoolyear_id: DataTypes.INTEGER,
      semester_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Assignments",
    }
  );
  return Assignments;
};
