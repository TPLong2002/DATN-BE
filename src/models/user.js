"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Users.belongsTo(models.Groups, { foreignKey: "group_id" });
      Users.belongsToMany(models.Users, {
        as: "User_Parents",
        through: "parent_student",
        foreignKey: "parent_id",
      });
      Users.belongsToMany(models.Users, {
        as: "User_Students",
        through: "parent_student",
        foreignKey: "student_id",
      });
      Users.belongsToMany(models.Fees, {
        as: "User_Fees",
        through: "User_Fee",
        foreignKey: "user_id",
      });
      Users.hasMany(models.Paymenthistories, { foreignKey: "user_id" });
      Users.hasOne(models.Profiles, { foreignKey: "user_id" });
      Users.hasOne(models.Classes, { foreignKey: "gvcn_id" });
      Users.belongsToMany(models.Classes, {
        as: "Student_Class",
        through: "Class_User",

        foreignKey: "user_id",
      });
      Users.belongsToMany(models.Subjects, {
        as: "User_Subjects",
        through: "Class_Subject_User",
        foreignKey: "teacher_id",
      });
      Users.belongsToMany(models.Classes, {
        as: "Teacher_Classes",
        through: "Class_Subject_User",
        foreignKey: "teacher_id",
      });
      Users.hasMany(models.Assignments, { foreignKey: "teacher_id" });
      Users.hasOne(models.Transcripts, { foreignKey: "user_id" });
      Users.belongsToMany(models.Chatboxes, {
        as: "User_Chatboxes",
        through: "Chatbox_User",
        foreignKey: "user_id",
      });
      Users.hasMany(models.Messages, { foreignKey: "sender_id" });
      Users.hasMany(models.News, { foreignKey: "user_id" });
    }
  }
  Users.init(
    {
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      username: DataTypes.STRING,
      group_id: DataTypes.INTEGER,
      islocked: DataTypes.INTEGER,
      isdeleted: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Users",
    }
  );
  return Users;
};
