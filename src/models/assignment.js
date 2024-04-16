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
        as: "A_C",
        through: "Assignment_Classes",
        foreignKey: "assignment_id",
      });
      Assignments.belongsTo(models.Subjects, { foreignKey: "subject_id" });
    }
  }
  Assignments.init(
    {
      name: DataTypes.STRING,
      teacher_id: DataTypes.INTEGER,
      subject_id: DataTypes.INTEGER,
      deadline: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Assignments",
    }
  );
  return Assignments;
};
