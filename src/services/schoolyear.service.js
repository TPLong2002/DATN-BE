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
const createSchoolyear = async (data) => {
  try {
    const check = await db.Schoolyears.findOne({ where: { name: data.name } });
    if (check) {
      return {
        status: 200,
        code: 1,
        message: "Schoolyear already exists",
        data: "",
      };
    }
    const res = await db.Schoolyears.create(data);
    if (res) {
      return { status: 200, code: 0, message: "success", data: res };
    } else {
      return { status: 500, code: 1, message: "fail", data: "" };
    }
  } catch (error) {}
};
module.exports = { getAllSchoolyear, createSchoolyear };
