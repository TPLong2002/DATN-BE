"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Fees extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Fees.belongsToMany(models.Users, {
        as: "Fee_Users",
        through: "User_Fee",
        foreignKey: "fee_id",
      });
      Fees.hasMany(models.Paymenthistories, {
        foreignKey: "fee_id",
      });
      Fees.belongsTo(models.Schoolyears, { foreignKey: "schoolyear_id" });
      Fees.belongsTo(models.Grades, { foreignKey: "grade_id" });
    }
  }
  Fees.init(
    {
      name: DataTypes.STRING,
      price: DataTypes.FLOAT,
      startDate: DataTypes.DATE,
      endDate: DataTypes.DATE,
      ishidden: DataTypes.INTEGER,
      schoolyear_id: DataTypes.INTEGER,
      grade_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Fees",
    }
  );
  return Fees;
};
