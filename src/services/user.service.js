import db from "../models/index.js";
import bcrypt from "bcryptjs";
import { Op } from "sequelize";
import sendEmail from "./email.service.js";

const salt = bcrypt.genSaltSync(10);

const hashPassword = (password) => {
  let hashPassword = bcrypt.hashSync(password, salt);
  return hashPassword;
};

const getAllUsers = async () => {
  try {
    const users = await db.Users.findAll({
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
const getUsers = async (limit, page, isdeleted, search) => {
  if (!limit) limit = 10;
  if (!page) page = 1;

  const offset = (page - 1) * limit;

  try {
    const searchCondition = search
      ? {
          [Op.or]: [
            {
              username: {
                [Op.like]: `%${search}%`,
              },
            },
            {
              email: {
                [Op.like]: `%${search}%`,
              },
            },
          ],
        }
      : {};

    const { count, rows } = await db.Users.findAndCountAll({
      where: {
        isdeleted: isdeleted,
        ...searchCondition,
      },
      attributes: ["id", "username", "email", "group_id", "isdeleted"],
      limit: +limit,
      offset: +offset,
      raw: true,
      nest: true,
    });
    return {
      status: 200,
      code: 0,
      message: "success",
      data: { rows, count },
    };
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
    const result = await db.sequelize.transaction(async (t) => {
      // Kiểm tra sự tồn tại của tài khoản trước khi tạo mới
      const existingUsers = await db.Users.findAll({
        where: {
          username: data.map((item) => item.username),
        },
        transaction: t,
      });

      // Lọc ra những tài khoản chưa tồn tại trong database
      const newData = data.filter(
        (item) => !existingUsers.some((user) => user.username === item.username)
      );

      if (newData.length === 0) {
        return {
          status: 200,
          code: 2,
          message: "All users already exist",
          data: "",
        };
      }

      const users = await db.Users.bulkCreate(
        newData.map((item) => ({
          username: item.username,
          email: item.email,
          group_id: item.group_id,
          password: hashPassword(item.password),
        })),
        { transaction: t }
      );

      if (users) {
        for (const user of users) {
          const userEmail = user.email;
          const userOriginalData = data.find(
            (item) => item.username === user.username
          );
          const userPassword = userOriginalData.password;

          const emailSubject =
            "Tài khoảng sử dụng cho hệ thống quản lý trường THPT Nguyễn Hiền";
          const emailText = `
            Tài khoảng của bạn đã được tạo thành công.
            Tài khoảng: ${user.username}
            Mật khẩu: ${userPassword}  
            Email: ${user.email}

            Ghi nhớ mật khẩu của bạn và không chia sẻ cho người khác.

            Trân trọng,
            Ban quản trị trường THPT Nguyễn Hiền
          `;

          await sendEmail(userEmail, emailSubject, emailText);
        }
        return { status: 200, code: 0, message: "success", data: "" };
      } else {
        return { status: 500, code: 1, message: "fail", data: "" };
      }
    });
    return result;
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
        isdeleted: data.ishidden,
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
const getUsersByGroupId = async (limit, page, group_id, isdeleted, search) => {
  if (!limit) limit = 10;
  if (!page) page = 1;

  const offset = (page - 1) * limit;
  try {
    const searchCondition = search
      ? {
          [Op.or]: [
            {
              username: {
                [Op.like]: `%${search}%`,
              },
            },
            {
              email: {
                [Op.like]: `%${search}%`,
              },
            },
          ],
        }
      : {};

    const { count, rows } = await db.Users.findAndCountAll({
      where: { group_id: group_id, isdeleted: isdeleted, ...searchCondition },
      limit: +limit,
      offset: +offset,
      raw: true,
      nest: true,
    });
    return { status: 200, code: 0, message: "success", data: { count, rows } };
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
const countUsersOfGroup = async (group_id) => {
  try {
    const count = await db.Users.count({
      where: { group_id: group_id },
    });
    return { status: 200, code: 0, message: "success", data: count };
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
  getUsersByGroupId,
  countUsersOfGroup,
};
