import db from "../models";

const getAllClass = async (limit, page) => {
  if (!limit) limit = 10;
  if (!page) page = 1;
  const offset = (page - 1) * limit;
  try {
    const { count, rows } = await db.Classes.findAndCountAll({
      where: { ishidden: 0 },
      include: {
        model: db.Users,
        as: "GVCN",
        include: { model: db.Profiles, attributes: ["firstname", "lastname"] },
      },
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
  console.log(data);
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
const getStudentByClassId = async (classId) => {
  try {
    const res = await db.Classes.findOne({
      include: [
        {
          model: db.Users,
          as: "Class_Students",
          through: { attributes: [] },
          include: {
            model: db.Profiles,
            attributes: ["id", "firstname", "lastname"],
          },
        },
      ],
      where: { id: classId },
    });
    if (res) {
      return { status: 200, code: 0, message: "success", data: res };
    } else {
      return { status: 500, code: 1, message: "fail", data: "" };
    }
  } catch (error) {
    return { status: 500, code: 1, message: error.message, data: [] };
  }
};
const kickUserFromClass = async (data) => {
  try {
    const res = await db.Class_User.destroy({
      where: { class_id: data.class_id, user_id: data.user_id },
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
const addStudentToClass = async (data) => {
  try {
    const res = await db.Class_User.bulkCreate(data);
    if (res) {
      return { status: 200, code: 0, message: "success", data: res };
    } else {
      return { status: 500, code: 1, message: "fail", data: "" };
    }
  } catch (error) {
    return { status: 500, code: -1, message: error.message, data: "" };
  }
};
const getSubjectsByClassId = async (classId) => {
  console.log(classId);
  try {
    const res = await db.Classes.findOne({
      include: [
        {
          as: "Class_Subjects",
          model: db.Subjects,
          through: { attributes: [] },
          include: {
            model: db.Users,
            as: "Subject_Users",
            through: { attributes: [] },
            include: {
              model: db.Profiles,
              attributes: ["id", "firstname", "lastname"],
            },
          },
        },
      ],
      where: { id: classId },
    });

    if (res) {
      return {
        status: 200,
        code: 0,
        message: "success",
        data: res.Class_Subjects,
      };
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
  getStudentByClassId,
  kickUserFromClass,
  addStudentToClass,
  getSubjectsByClassId,
};
