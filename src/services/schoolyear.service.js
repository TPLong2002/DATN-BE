import db from "../models";
const getAllSchoolyear = async () => {
  try {
    const res = await db.Schoolyears.findAll({ order: [["name", "DESC"]] });
    if (res) {
      return { status: 200, code: 0, message: "success", data: res };
    } else {
      return { status: 500, code: 1, message: "fail", data: "" };
    }
  } catch (error) {
    return { status: 500, code: -1, message: error.message, data: "" };
  }
};
module.exports = { getAllSchoolyear };
