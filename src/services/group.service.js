import { where } from "sequelize";
import db from "../models";
const getGroups = async () => {
  try {
    const res = await db.Groups.findAll({ where: { ishidden: 0 } });
    if (res) {
      return {
        status: 200,
        message: "success",
        code: 0,
        data: res,
      };
    } else {
      return { status: 500, message: "not found", code: 1, data: null };
    }
  } catch (error) {
    return { status: 500, message: error.message, code: -1, data: null };
  }
};
module.exports = { getGroups };
