"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Classes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Classes.belongsTo(models.Users, { foreignKey: "gvcn_id", as: "GVCN" });
      Classes.belongsToMany(models.Users, {
        as: "Class_Students",
        through: "Class_User",
        foreignKey: "class_id",
      });
      Classes.belongsToMany(models.Assignments, {
        as: "Class_Assignments",
        through: "Assignment_Class",
        foreignKey: "class_id",
      });
      Classes.belongsToMany(models.Subjects, {
        as: "Class_Subjects",
        through: "Class_Subject_User",
        foreignKey: "class_id",
      });
      Classes.belongsToMany(models.Users, {
        as: "Class_Teacher",
        through: "Class_Subject_User",
        foreignKey: "class_id",
      });
      Classes.belongsTo(models.Schoolyears, { foreignKey: "schoolyear_id" });
    }
  }
  Classes.init(
    {
      name: DataTypes.STRING,
      gvcn_id: DataTypes.INTEGER,
      ishidden: DataTypes.INTEGER,
      schoolyear_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Classes",
    }
  );
  return Classes;
};
