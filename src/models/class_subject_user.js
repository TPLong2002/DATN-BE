"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Class_Subject_User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {}
  }
  Class_Subject_User.init(
    {
      teacher_id: DataTypes.INTEGER,
      subject_id: DataTypes.INTEGER,
      class_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Class_Subject_User",
    }
  );
  return Class_Subject_User;
};
