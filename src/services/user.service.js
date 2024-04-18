import db from "../models/index.js";
import bcrypt from "bcryptjs";

const salt = bcrypt.genSaltSync(10);

const hashPassword = (password) => {
  let hashPassword = bcrypt.hashSync(password, salt);
  return hashPassword;
};

const getAllUsers = async () => {
  try {
    const users = await db.Users.findAll({
      // include: {
      //   model: db.Classes,
      //   as: "Student_Class",
      //   where: { id: 1 },
      //   attributes: [],
      //   through: {
      //     attributes: [],
      //   },
      // },
      raw: true,
      nest: true,
    });
    return { status: 200, code: 0, message: "success", data: users };
  } catch (err) {
    console.log(err);
    return {
      status: 500,
      status: 500,
      code: -1,
      message: "errService",
      data: [],
    };
  }
};
const getUsers = async () => {
  try {
    const users = await db.Users.findAll({
      where: { isdeleted: 0 },
      raw: true,
      nest: true,
    });
    return { status: 200, code: 0, message: "success", data: users };
  } catch (err) {
    console.log(err);
    return {
      status: 500,
      status: 500,
      code: -1,
      message: "errService",
      data: [],
    };
  }
};
const getUsersDelete = async () => {
  try {
    const users = await db.Users.findAll({
      where: { isdeleted: 1 },
      raw: true,
      nest: true,
    });
    return { status: 200, code: 0, message: "success", data: users };
  } catch (err) {
    console.log(err);
    return {
      status: 500,
      status: 500,
      code: -1,
      message: "errService",
      data: [],
    };
  }
};
const getUsersLock = async () => {
  try {
    const users = await db.Users.findAll({
      where: { islocked: 1 },
      raw: true,
      nest: true,
    });
    return { status: 200, code: 0, message: "success", data: users };
  } catch (err) {
    console.log(err);
    return {
      status: 500,
      status: 500,
      code: -1,
      message: "errService",
      data: [],
    };
  }
};
const createUser = async (data) => {
  try {
    const res = await db.Users.create({
      username: data.username,
      email: data.email,
      group_id: data.group_id,
      password: hashPassword(data.password),
    });
    if (res) {
      return { status: 200, code: 0, message: "success", data: "" };
    } else {
      return { status: 500, code: 1, message: "fail", data: "" };
    }
  } catch (error) {
    return { status: 500, code: -1, message: error.message, data: "" };
  }
};
const updateUser = async (data) => {
  try {
    const res = await db.Users.update(data, {
      where: { id: data.id },
    });
    if (res) {
      return { status: 200, code: 0, message: "success", data: "" };
    } else {
      return { status: 500, code: 1, message: "fail", data: "" };
    }
  } catch (error) {
    return { status: 500, code: -1, message: error.message, data: "" };
  }
};
const delUser = async (data) => {
  try {
    const res = await db.Users.update(
      {
        isdeleted: 1,
      },
      {
        where: { id: data.id },
      }
    );
    if (res) {
      return { status: 200, code: 0, message: "success", data: "" };
    } else {
      return { status: 500, code: 1, message: "fail", data: "" };
    }
  } catch (error) {
    return { status: 500, code: -1, message: error.message, data: "" };
  }
};
const recoverUser = async (data) => {
  try {
    const res = await db.Users.update(
      {
        isdeleted: 0,
      },
      {
        where: { id: data.id },
      }
    );
    if (res) {
      return { status: 200, code: 0, message: "success", data: "" };
    } else {
      return { status: 500, code: 1, message: "fail", data: "" };
    }
  } catch (error) {
    return { status: 500, code: -1, message: error.message, data: "" };
  }
};
const lockUser = async (data) => {
  try {
    const res = await db.Users.update(
      {
        islocked: 1,
      },
      {
        where: { id: data.id },
      }
    );
    if (res) {
      return { status: 200, code: 0, message: "success", data: "" };
    } else {
      return { status: 500, code: 1, message: "fail", data: "" };
    }
  } catch (error) {
    return { status: 500, code: -1, message: error.message, data: "" };
  }
};
const unlockUser = async (data) => {
  try {
    const res = await db.Users.update(
      {
        islocked: 0,
      },
      {
        where: { id: data.id },
      }
    );
    if (res) {
      return { status: 200, code: 0, message: "success", data: "" };
    } else {
      return { status: 500, code: 1, message: "fail", data: "" };
    }
  } catch (error) {
    return { status: 500, code: -1, message: error.message, data: "" };
  }
};
module.exports = {
  getAllUsers,
  createUser,
  updateUser,
  delUser,
  recoverUser,
  getUsers,
  getUsersDelete,
  getUsersLock,
  lockUser,
  unlockUser,
};
