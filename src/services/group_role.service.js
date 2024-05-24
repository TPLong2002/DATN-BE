import db from "../models/index.js";
import { Op } from "sequelize";
const addGroupRole = async (data) => {
  try {
    const groupId = data.groupId;
    const roles = data.roles;
    let res;
    if (roles.checked) {
      res = await db.Group_Role.bulkCreate([
        { group_id: groupId, role_id: roles.id },
      ]);
    } else {
      res = await db.Group_Role.destroy({
        where: {
          [Op.and]: [{ role_id: roles.id }, { group_id: groupId }],
        },
      });
    }
    if (res) {
      return { status: 200, code: 0, message: "chagne success", data: "" };
    } else {
      return { status: 500, code: -1, message: "error", data: "" };
    }
  } catch (error) {
    return { status: 500, code: -1, message: error.message, data: "" };
  }
};
module.exports = { addGroupRole };
