"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Conducts extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Conducts.hasMany(models.Transcripts, { foreignKey: "conduct_id" });
    }
  }
  Conducts.init(
    {
      name: DataTypes.STRING,
      ishidden: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Conducts",
    }
  );
  return Conducts;
};
