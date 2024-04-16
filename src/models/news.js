"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class News extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      News.belongsTo(models.Users, {
        foreignKey: "user_id",
      });
    }
  }
  News.init(
    {
      user_id: DataTypes.INTEGER,
      title: DataTypes.STRING,
      content: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "News",
    }
  );
  return News;
};
