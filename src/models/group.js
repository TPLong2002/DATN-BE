"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Groups extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Groups.hasMany(models.Users, { foreignKey: "group_id" });
      Groups.belongsToMany(models.Roles, {
        as: "Group_Roles",
        through: "Group_Role",
        foreignKey: "group_id",
      });
    }
  }
  Groups.init(
    {
      name: DataTypes.STRING,
      description: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Groups",
    }
  );
  return Groups;
};
