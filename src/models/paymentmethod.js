"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Paymentmethods extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Paymentmethods.hasMany(models.Paymenthistories, {
        foreignKey: "paymentmethod_id",
      });
    }
  }
  Paymentmethods.init(
    {
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Paymentmethods",
    }
  );
  return Paymentmethods;
};
