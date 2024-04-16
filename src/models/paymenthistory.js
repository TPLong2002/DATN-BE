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
        foreignKey: "user_id",
      });
      Paymenthistories.belongsTo(models.Paymentmethods, {
        foreignKey: "paymentmethod_id",
      });
    }
  }
  Paymenthistories.init(
    {
      fee_id: DataTypes.INTEGER,
      user_id: DataTypes.INTEGER,
      paymentmethod_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Paymenthistories",
    }
  );
  return Paymenthistories;
};
