"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Chatboxes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Chatboxes.belongsToMany(models.Users, {
        through: "Chatbox_User",
        foreignKey: "chatbox_id",
      });
      Chatboxes.hasMany(models.Messages, {
        foreignKey: "chatbox_id",
      });
    }
  }
  Chatboxes.init(
    {
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Chatboxes",
    }
  );
  return Chatboxes;
};
