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
      Users.belongsTo(models.Groups, { foreignKey: "group_id", as: "Group" });
      Users.belongsTo(models.Schoolyears, { foreignKey: "schoolyear_id" });
      Users.belongsToMany(models.Users, {
        as: "User_Parents",
        through: "Parent_Student",
        foreignKey: "parent_id",
      });
      Users.belongsToMany(models.Users, {
        as: "User_Students",
        through: "Parent_Student",
        foreignKey: "student_id",
      });
      Users.belongsToMany(models.Fees, {
        as: "User_Fees",
        through: "User_Fee",
        foreignKey: "user_id",
      });

      Users.hasOne(models.Profiles, { foreignKey: "user_id" });
      Users.hasOne(models.Classes, { foreignKey: "gvcn_id", as: "GVCN" });
      Users.belongsToMany(models.Classes, {
        as: "Student_Classes",
        through: "Class_User",
        foreignKey: "user_id",
      });
      Users.belongsToMany(models.Subjects, {
        as: "User_Subjects",
        through: "Class_Subject_User",
        foreignKey: "teacher_id",
      });
      Users.belongsToMany(models.Subjects, {
        as: "UserSubjects",
        through: "User_Subject",
        foreignKey: "teacher_id",
      });
      Users.belongsToMany(models.Classes, {
        as: "Teacher_Classes",
        through: "Class_Subject_User",
        foreignKey: "teacher_id",
      });
      Users.hasMany(models.Assignments, { foreignKey: "teacher_id" });
      Users.hasOne(models.Transcripts, {
        foreignKey: "user_id",
      });
      Users.belongsToMany(models.Chatboxes, {
        as: "User_Chatboxes",
        through: "Chatbox_User",
        foreignKey: "user_id",
      });
      Users.hasMany(models.Messages, { foreignKey: "sender_id" });
      Users.hasMany(models.News, { foreignKey: "user_id" });
      Users.hasMany(models.Marks, { foreignKey: "user_id" });
      Users.hasMany(models.Paymenthistories, {
        foreignKey: "student_id",
        as: "Student_Paymenthistories",
      });
      Users.hasMany(models.Paymenthistories, {
        foreignKey: "parent_id",
        as: "Parent_Paymenthistories",
      });
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
      schoolyear_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Users",
    }
  );
  return Users;
};
