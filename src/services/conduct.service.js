import db from "../models";
const getAllConduct = async () => {
  try {
    const res = await db.Conducts.findAll({});
    if (res) {
      return { status: 200, code: 0, message: "success", data: res };
    } else {
      return { status: 500, code: 1, message: "fail", data: "" };
    }
  } catch (error) {
    return { status: 500, code: -1, message: error.message, data: "" };
  }
};
const getConductById = async (id) => {
  try {
    const res = await db.Conducts.findOne({ where: { id: id } });
    if (res) {
      return { status: 200, code: 0, message: "success", data: res };
    } else {
      return { status: 500, code: 1, message: "fail", data: "" };
    }
  } catch (error) {
    return { status: 500, code: -1, message: error.message, data: "" };
  }
};
const createConduct = async (data) => {
  try {
    const res = await db.Conducts.create(data);
    if (res) {
      return { status: 200, code: 0, message: "success", data: res };
    } else {
      return { status: 500, code: 1, message: "fail", data: "" };
    }
  } catch (error) {
    return { status: 500, code: -1, message: error.message, data: "" };
  }
};
const updateConduct = async (data) => {
  try {
    const res = await db.Conducts.update(data, { where: { id: data.id } });
    if (res) {
      return { status: 200, code: 0, message: "success", data: res };
    } else {
      return { status: 500, code: 1, message: "fail", data: "" };
    }
  } catch (error) {
    return { status: 500, code: -1, message: error.message, data: "" };
  }
};
module.exports = {
  getAllConduct,
  createConduct,
  getConductById,
  updateConduct,
};
