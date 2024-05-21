"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Transcripts extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Transcripts.belongsTo(models.Users, {
        foreignKey: "user_id",
      });
      Transcripts.belongsTo(models.Conducts, { foreignKey: "conduct_id" });
      Transcripts.belongsTo(models.RankedAcademics, {
        foreignKey: "rankedacademic_id",
      });
      Transcripts.belongsTo(models.Semesters, { foreignKey: "semester_id" });
      Transcripts.hasMany(models.Marks, { foreignKey: "transcript_id" });
      Transcripts.belongsTo(models.Schoolyears, {
        foreignKey: "schoolyear_id",
      });
    }
  }
  Transcripts.init(
    {
      name: DataTypes.STRING,
      ishidden: DataTypes.INTEGER,
      user_id: DataTypes.INTEGER,
      rankedacademic_id: DataTypes.INTEGER,
      conduct_id: DataTypes.INTEGER,
      semester_id: DataTypes.INTEGER,
      schoolyear_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Transcripts",
    }
  );
  return Transcripts;
};
