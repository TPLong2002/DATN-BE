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
        as: "author",
        foreignKey: "user_id",
      });
      News.belongsTo(models.Categories, {
        as: "category",
        foreignKey: "category_id",
      });
      News.belongsTo(models.Schoolyears, {
        as: "schoolyear",
        foreignKey: "schoolyear_id",
      });
      News.belongsTo(models.Semesters, {
        as: "semester",
        foreignKey: "semester_id",
      });
    }
  }
  News.init(
    {
      user_id: DataTypes.INTEGER,
      title: DataTypes.STRING,
      content: DataTypes.STRING,
      thumbnail: DataTypes.STRING,
      category_id: DataTypes.INTEGER,
      schoolyear_id: DataTypes.INTEGER,
      semester_id: DataTypes.INTEGER,
      ishidden: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "News",
    }
  );
  return News;
};
