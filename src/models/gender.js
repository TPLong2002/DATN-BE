"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Genders extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Genders.hasMany(models.Profiles, { foreignKey: "gender_id" });
    }
  }
  Genders.init(
    {
      description: DataTypes.STRING,
      ishidden: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Genders",
    }
  );
  return Genders;
};
