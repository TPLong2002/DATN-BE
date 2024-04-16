"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class RankedAcademics extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      RankedAcademics.hasMany(models.Transcripts, {
        foreignKey: "rankedacademic_id",
      });
    }
  }
  RankedAcademics.init(
    {
      name: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "RankedAcademics",
    }
  );
  return RankedAcademics;
};
