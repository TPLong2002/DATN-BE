"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Paymentstatuses extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Paymentstatuses.hasMany(models.Paymenthistories, {
        foreignKey: "paymentstatus_id",
      });
    }
  }
  Paymentstatuses.init(
    {
      code: DataTypes.INTEGER,
      description: DataTypes.STRING,
      ishidden: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Paymentstatuses",
    }
  );
  return Paymentstatuses;
};
