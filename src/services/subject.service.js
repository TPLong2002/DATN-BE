import db from "../models";
const getAllSubjects = async () => {
  try {
    const res = await db.Subjects.findAll();
    if (res) {
      return { status: 200, code: 0, message: "success", data: res };
    } else {
      return { status: 500, code: 1, message: "fail", data: "" };
    }
  } catch (error) {
    return { status: 500, code: -1, message: error.message, data: "" };
  }
};
const getSubjects = async () => {
  try {
    const res = await db.Subjects.findAll({ where: { ishidden: 0 } });
    if (res) {
      return { status: 200, code: 0, message: "success", data: res };
    } else {
      return { status: 500, code: 1, message: "fail", data: "" };
    }
  } catch (error) {
    return { status: 500, code: -1, message: error.message, data: "" };
  }
};
const updateSubject = async (data) => {
  try {
    const res = await db.Subjects.update(data, {
      where: { id: data.id },
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
const createSubject = async (data) => {
  try {
    const res = await db.Subjects.bulkCreate(data);
    if (res) {
      return { status: 200, code: 0, message: "success", data: res };
    } else {
      return { status: 500, code: 1, message: "fail", data: "" };
    }
  } catch (error) {
    return { status: 500, code: -1, message: error.message, data: "" };
  }
};
const hiddenSubject = async (data) => {
  try {
    const res = await db.Subjects.update(
      { ishidden: data.ishidden },
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
const getSubjectById = async (id) => {
  try {
    const res = await db.Subjects.findOne({
      where: { id: id },
      include: [
        {
          model: db.Users,
          as: "SubjectUsers",
          include: {
            model: db.Profiles,
            attributes: ["id", "firstname", "lastname", "phoneNumber"],
          },
          through: { attributes: [] },
          attributes: ["id", "username"],
        },
      ],
      attributes: ["id", "name", "ishidden"],
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
module.exports = {
  getAllSubjects,
  updateSubject,
  createSubject,
  getSubjects,
  hiddenSubject,
  getSubjectById,
};
