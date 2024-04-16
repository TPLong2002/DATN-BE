"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Roles extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Roles.belongsToMany(models.Groups, {
        through: "Group_Role",
        foreignKey: "role_id",
      });
    }
  }
  Roles.init(
    {
      URL: DataTypes.STRING,
      description: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Roles",
    }
  );
  return Roles;
};
