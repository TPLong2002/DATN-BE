"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Subjects extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Subjects.belongsToMany(models.Users, {
        as: "Subject_Users",
        through: "Class_Subject_User",
        foreignKey: "subject_id",
      });
      Subjects.hasMany(models.Transcripts, { foreignKey: "subject_id" });
      Subjects.belongsToMany(models.Classes, {
        as: "Subject_Classes",
        through: "Class_Subject_User",
        foreignKey: "subject_id",
      });
      Subjects.hasMany(models.Assignments, { foreignKey: "subject_id" });
      Subjects.belongsToMany(models.Users, {
        as: "SubjectUsers",
        through: "User_Subject",
        foreignKey: "subject_id",
      });
    }
  }
  Subjects.init(
    {
      name: DataTypes.STRING,
      ishidden: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Subjects",
    }
  );
  return Subjects;
};
