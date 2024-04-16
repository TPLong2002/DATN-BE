"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Profiles extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Profiles.belongsTo(models.Users, {
        foreignKey: "user_id",
      });
    }
  }
  Profiles.init(
    {
      user_id: DataTypes.INTEGER,
      phoneNumber: DataTypes.STRING,
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      avt: DataTypes.STRING,
      address: DataTypes.STRING,
      dateOfBirth: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Profiles",
    }
  );
  return Profiles;
};
