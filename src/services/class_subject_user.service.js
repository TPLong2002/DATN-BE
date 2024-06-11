import db from "../models";
const getClassSubjectUsers = async () => {
  try {
    const res = await db.Class_Subject_User.findAll({ where: { ishidden: 0 } });
    if (res) {
      return { status: 200, code: 0, message: "success", data: res };
    } else {
      return { status: 500, code: 1, message: "fail", data: "" };
    }
  } catch (error) {
    return { status: 500, code: -1, message: error.message, data: "" };
  }
};
const getClassSubjectUserById = async (id) => {
  try {
    const res = await db.Class_Subject_User.findOne({ where: { id: id } });
    if (res) {
      return { status: 200, code: 0, message: "success", data: res };
    } else {
      return { status: 500, code: 1, message: "fail", data: "" };
    }
  } catch (error) {
    return { status: 500, code: -1, message: error.message, data: "" };
  }
};
const createClassSubjectUser = async (class_subject_user) => {
  try {
    const res = await db.Class_Subject_User.bulkCreate(class_subject_user);
    if (res) {
      return { status: 200, code: 0, message: "success", data: res };
    } else {
      return { status: 500, code: 1, message: "fail", data: "" };
    }
  } catch (error) {
    return { status: 500, code: -1, message: error.message, data: "" };
  }
};
const updateClassSubjectUser = async (class_subject_user) => {
  try {
    const res = await db.Class_Subject_User.update(class_subject_user, {
      where: { id: class_subject_user.id },
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
  getClassSubjectUsers,
  getClassSubjectUserById,
  createClassSubjectUser,
  updateClassSubjectUser,
};
