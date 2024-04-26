"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Marks extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Marks.belongsTo(models.Users, { foreignKey: "user_id" });
      Marks.belongsTo(models.Marktypes, { foreignKey: "marktype_id" });
      Marks.belongsTo(models.Subjects, { foreignKey: "subject_id" });
      Marks.belongsTo(models.Transcripts, { foreignKey: "transcript_id" });
    }
  }
  Marks.init(
    {
      user_id: DataTypes.INTEGER,
      subject_id: DataTypes.INTEGER,
      marktype_id: DataTypes.INTEGER,
      mark: DataTypes.FLOAT,
      ishidden: DataTypes.INTEGER,
      transcript_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Marks",
    }
  );
  return Marks;
};
