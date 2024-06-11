import db from "../models";
import { Op } from "sequelize";
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
const getSubjectByGradeId = async (grade_id) => {
  try {
    const res = await db.Subjects.findAll({ where: { grade_id: grade_id } });
    if (res) {
      return { status: 200, code: 0, message: "success", data: res };
    } else {
      return { status: 500, code: 1, message: "fail", data: "" };
    }
  } catch (error) {
    return { status: 500, code: -1, message: error.message, data: "" };
  }
};
const getSubjectByClassId = async (class_id, schoolyear_id) => {
  try {
    const res = await db.Classes.findOne({
      where: { ishidden: 0, id: class_id, schoolyear_id: schoolyear_id },
      include: [
        {
          model: db.Subjects,
          as: "Class_Subjects",
          through: { attributes: [] },
        },
      ],
    });
    if (res) {
      return { status: 200, code: 0, message: "success", data: res };
    } else {
      return { status: 500, code: 1, message: "fail", data: {} };
    }
  } catch (error) {
    return { status: 500, code: -1, message: error.message, data: "" };
  }
};
// const getMarksByStudentId = async (student_id, schoolyear_id) => {};
const getSubjectByGradeIdNotInClass = async (grade_id, class_id) => {
  try {
    const res = await db.Subjects.findAll({
      where: {
        grade_id: grade_id,
        id: {
          [Op.notIn]: db.sequelize.literal(
            `(SELECT subject_id FROM Class_Subject_User WHERE class_id = ${class_id})`
          ),
        },
      },
    });
    if (res) {
      return { status: 200, code: 0, message: "success", data: res };
    } else {
      return { status: 500, code: 1, message: "fail", data: {} };
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
  getSubjectByGradeId,
  getSubjectByClassId,
  getSubjectByGradeIdNotInClass,
};
