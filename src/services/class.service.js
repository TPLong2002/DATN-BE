import db from "../models";

const getAllClass = async () => {
  try {
    const res = await db.Classes.findAll({});
    if (res) {
      return { status: 200, code: 0, message: "success", data: res };
    } else {
      return { status: 500, code: 1, message: "fail", data: "" };
    }
  } catch (error) {
    return { status: 500, code: -1, message: error.message, data: "" };
  }
};
const getClassById = async (id) => {
  try {
    console.log(id);
    const res = await db.Classes.findAll({
      where: { id: id },
      include: [
        { model: db.Users, as: "GVCN", attributes: ["username"] },
        {
          model: db.Users,
          as: "Class_Student",
          attributes: ["username"],
          through: { attributes: [] },
        },
      ],
    });
    if (res) {
      return { status: 200, code: 0, message: "success", data: res };
    } else {
      return { status: 500, code: 1, message: "fail", data: "" };
    }
  } catch (error) {
    return { status: 500, code: -1, message: error.message, data: "" };
  }
};
const createClass = async (data) => {
  try {
    const res = await db.Classes.create(data);
    if (res) {
      return { status: 200, code: 0, message: "success", data: res };
    } else {
      return { status: 500, code: 1, message: "fail", data: "" };
    }
  } catch (error) {
    return { status: 500, code: -1, message: error.message, data: "" };
  }
};
const updateClass = async (data) => {
  try {
    const res = await db.Classes.update(data, { where: { id: data.id } });
    if (res) {
      return { status: 200, code: 0, message: "success", data: res };
    } else {
      return { status: 500, code: 1, message: "fail", data: "" };
    }
  } catch (error) {
    return { status: 500, code: -1, message: error.message, data: "" };
  }
};
const hiddenClass = async (data) => {
  try {
    const res = await db.Classes.update(
      {
        ishidden: data.ishidden,
      },
      { where: { id: data.id } }
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

module.exports = {
  getAllClass,
  getClassById,
  createClass,
  updateClass,
  hiddenClass,
};
