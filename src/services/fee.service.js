import db from "../models";
import { Op } from "sequelize";

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
    const res = await db.Fees.bulkCreate(data);
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
const getStudentsOfFee = async (fee_id) => {
  const res = await db.Fees.findOne({
    where: { id: fee_id },
    include: [
      {
        model: db.Users,
        as: "Fee_Users",
        include: [
          {
            model: db.Profiles,
            attributes: ["firstname", "lastname"],
          },
        ],
        through: { where: { ishidden: 0 }, attributes: [] },
        attributes: ["id", "username"],
      },
    ],
  });
  if (res) {
    return { status: 200, code: 0, message: "success", data: res };
  } else {
    return { status: 500, code: 1, message: "fail", data: "" };
  }
};
const deleteUsersOfFee = async (data) => {
  try {
    const res = await db.User_Fee.update(
      { ishidden: 1 },
      {
        where: { fee_id: data.fee_id, user_id: data.user_id },
      }
    );
    if (res) {
      return { status: 200, code: 0, message: "success", data: res };
    } else {
      return { status: 500, code: 1, message: "fail", data: "" };
    }
  } catch (error) {
    return { status: 500, code: -1, message: error.message, data: "" };
  }
};
const getStudentNotInFee = async (fee_id) => {
  try {
    const res = await db.Users.findAll({
      include: [
        {
          model: db.Fees,
          as: "User_Fees",
          through: { where: { ishidden: 0 }, attributes: [] },
        },
        {
          model: db.Groups,
          as: "Group",
          where: { name: "student" },
          attributes: [],
        },
        {
          model: db.Profiles,
          attributes: ["firstname", "lastname"],
        },
      ],
      where: {
        id: {
          [Op.notIn]: db.sequelize.literal(
            `(SELECT user_id FROM User_Fee WHERE fee_id = ${fee_id} AND ishidden = 0)`
          ),
        },
      },
    });
    if (res) {
      return { status: 200, code: 0, message: "Success", data: res };
    } else {
      return { status: 500, code: 1, message: "Not found", data: [] };
    }
  } catch (error) {}
};
const addUsersToFee = async (data) => {
  try {
    const res = await db.User_Fee.bulkCreate(data);
    if (res) {
      return { status: 200, code: 0, message: "Success", data: res };
    } else {
      return { status: 500, code: 1, message: "Fail", data: [] };
    }
  } catch (error) {
    return { status: 500, code: -1, message: error.message, data: [] };
  }
};
module.exports = {
  getAllFee,
  getFeeById,
  createFee,
  updateFee,
  getStudentsOfFee,
  deleteUsersOfFee,
  getStudentNotInFee,
  addUsersToFee,
};
