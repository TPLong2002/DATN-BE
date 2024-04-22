import db from "../models";
const getUserFee = async (userId) => {
  try {
    const res = await db.User_Fee.findOne({ where: { user_id: userId } });
    if (res) {
      return { status: 200, code: 0, message: "User fee found", data: res };
    } else {
      return {
        status: 404,
        code: 1,
        message: "User fee not found",
        data: null,
      };
    }
  } catch (error) {
    return { status: 500, code: -1, message: error.message, data: null };
  }
};
const getUserFees = async () => {
  try {
    const res = await db.User_Fee.findAll();
    if (res) {
      return { status: 200, code: 0, message: "User fee found", data: res };
    } else {
      return {
        status: 404,
        code: 1,
        message: "User fee not found",
        data: null,
      };
    }
  } catch (error) {
    return { status: 500, code: -1, message: error.message, data: null };
  }
};
const createUserFee = async (data) => {
  try {
    const res = await db.User_Fee.bulkCreate(data);
    return { status: 201, code: 0, message: "User fee created", data: res };
  } catch (error) {
    return { status: 500, code: -1, message: error.message, data: null };
  }
};
const updateUserFee = async (data) => {
  try {
    const res = await db.User_Fee.update(data, {
      where: { id: data.id },
    });
    if (res) {
      return { status: 200, code: 0, message: "User fee updated", data: res };
    } else {
      return {
        status: 404,
        code: 1,
        message: "User fee not found",
        data: null,
      };
    }
  } catch (error) {
    return { status: 500, code: -1, message: error.message, data: null };
  }
};
module.exports = { getUserFee, getUserFees, createUserFee, updateUserFee };
