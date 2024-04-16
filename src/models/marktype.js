"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Marktypes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Marktypes.hasMany(models.Transcripts, { foreignKey: "marktype_id" });
    }
  }
  Marktypes.init(
    {
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Marktypes",
    }
  );
  return Marktypes;
};
