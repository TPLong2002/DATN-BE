"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Messages extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Messages.belongsTo(models.Users, {
        foreignKey: "sender_id",
      });
      Messages.belongsTo(models.Chatboxes, {
        foreignKey: "chatbox_id",
      });
    }
  }
  Messages.init(
    {
      sender_id: DataTypes.INTEGER,
      content: DataTypes.STRING,
      chatbox_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Messages",
    }
  );
  return Messages;
};
