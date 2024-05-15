import db from "../models";
const getAllFee = async (limit, page) => {
  if (!page) page = 1;
  if (!limit) limit = 10;
  const offset = (page - 1) * limit;
  try {
    const { count, rows } = await db.Fees.findAndCountAll({
      offset: +offset,
      limit: +limit,
    });
    if (rows && count) {
      return {
        status: 200,
        code: 0,
        message: "success",
        data: { rows, count },
      };
    } else {
      return { status: 500, code: 1, message: "fail", data: {} };
    }
  } catch (error) {
    return { status: 500, code: -1, message: error.message, data: {} };
  }
};
const getFeeById = async (id) => {
  try {
    const res = await db.Fees.findOne({ where: { id: id } });
    if (res) {
      return { status: 200, code: 0, message: "success", data: res };
    } else {
      return { status: 500, code: 1, message: "fail", data: "" };
    }
  } catch (error) {
    return { status: 500, code: -1, message: error.message, data: "" };
  }
};
const createFee = async (data) => {
  try {
    const res = await db.Fees.create(data);
    if (res) {
      return { status: 200, code: 0, message: "success", data: res };
    } else {
      return { status: 500, code: 1, message: "fail", data: "" };
    }
  } catch (error) {
    return { status: 500, code: -1, message: error.message, data: "" };
  }
};
const updateFee = async (data) => {
  try {
    const res = await db.Fees.update(data, { where: { id: data.id } });
    if (res) {
      return { status: 200, code: 0, message: "success", data: res };
    } else {
      return { status: 500, code: 1, message: "fail", data: "" };
    }
  } catch (error) {
    return { status: 500, code: -1, message: error.message, data: "" };
  }
};
module.exports = { getAllFee, getFeeById, createFee, updateFee };
