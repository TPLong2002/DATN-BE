"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Paymenthistories extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Paymenthistories.belongsTo(models.Fees, {
        foreignKey: "fee_id",
      });
      Paymenthistories.belongsTo(models.Users, {
        foreignKey: "student_id",
      });
      Paymenthistories.belongsTo(models.Users, {
        foreignKey: "parent_id",
      });
      Paymenthistories.belongsTo(models.Paymentmethods, {
        foreignKey: "paymentmethod_id",
      });
      Paymenthistories.belongsTo(models.Paymentstatuses, {
        foreignKey: "paymentstatus_id",
      });
    }
  }
  Paymenthistories.init(
    {
      fee_id: DataTypes.INTEGER,
      parent_id: DataTypes.INTEGER,
      student_id: DataTypes.INTEGER,
      paymentstatus_id: DataTypes.INTEGER,
      amount: DataTypes.INTEGER,
      time: DataTypes.DATE,
      orderInfo: DataTypes.STRING,
      orderType: DataTypes.STRING,
      payType: DataTypes.STRING,
      paymentmethod_id: DataTypes.INTEGER,
      ishidden: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Paymenthistories",
    }
  );
  return Paymenthistories;
};
