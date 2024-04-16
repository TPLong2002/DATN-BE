"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Parent_Student extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {}
  }
  Parent_Student.init(
    {
      parent_id: DataTypes.INTEGER,
      student_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Parent_Student",
    }
  );
  return Parent_Student;
};
