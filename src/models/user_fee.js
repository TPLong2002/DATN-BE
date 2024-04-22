"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User_Fee extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {}
  }
  User_Fee.init(
    {
      fee_id: DataTypes.INTEGER,
      user_id: DataTypes.INTEGER,
      ishidden: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "User_Fee",
    }
  );
  return User_Fee;
};
