"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User_Subject extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {}
  }
  User_Subject.init(
    {
      teacher_id: DataTypes.INTEGER,
      subject_id: DataTypes.INTEGER,
      ishidden: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "User_Subject",
    }
  );
  return User_Subject;
};
