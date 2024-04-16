"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Assignment_Class extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Assignment_Class.init(
    {
      class_id: DataTypes.INTEGER,
      assignment_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Assignment_Class",
    }
  );
  return Assignment_Class;
};
