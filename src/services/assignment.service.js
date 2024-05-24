import db from "../models";
import { Op, where } from "sequelize";

const getAssignments = async (limit, page) => {
  if (!limit) limit = 10;
  if (!page) page = 1;
  const offset = (page - 1) * limit;
  try {
    const { rows, count } = await db.Assignments.findAndCountAll({
      where: { ishidden: 0 },
      include: [
        {
          model: db.Classes,
          as: "Assignment_Classes",
          through: { attributes: [] },
        },
        { model: db.Subjects, attributes: ["id", "name"] },
        {
          model: db.Users,
          attributes: ["id", "username"],
          include: {
            model: db.Profiles,
            attributes: ["firstName", "lastName"],
          },
        },
      ],
      limit: limit,
      offset: offset,
      raw: true,
      nest: true,
    });
    if (rows) {
      return {
        status: 200,
        code: 0,
        message: "success",
        data: { rows, count },
      };
    } else {
      return { status: 500, code: 1, message: "fail", data: "" };
    }
  } catch (error) {
    return { status: 500, code: -1, message: error.message, data: "" };
  }
};

const getAssignmentById = async (id) => {
  try {
    const res = await db.Assignments.findOne({
      where: { id: id },
      include: [
        {
          model: db.Classes,
          as: "Assignment_Classes",
          through: { attributes: [] },
        },
        { model: db.Subjects, attributes: ["id", "name"] },
        {
          model: db.Users,
          attributes: ["id", "username"],
          include: {
            model: db.Profiles,
            attributes: ["firstName", "lastName"],
          },
        },
      ],
      raw: true,
      nest: true,
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
const createAssignment = async (data) => {
  try {
    const res = await db.Assignments.create(data);
    if (res) {
      return { status: 200, code: 0, message: "success", data: res };
    } else {
      return { status: 500, code: 1, message: "fail", data: "" };
    }
  } catch (error) {
    return { status: 500, code: -1, message: error.message, data: "" };
  }
};
const updateAssignment = async (data) => {
  try {
    const res = await db.Assignments.update(data, { where: { id: data.id } });
    if (res) {
      return { status: 200, code: 0, message: "success", data: res };
    } else {
      return { status: 500, code: 1, message: "fail", data: "" };
    }
  } catch (error) {
    return { status: 500, code: -1, message: error.message, data: "" };
  }
};
const getAssignmentByUserId = async (id) => {
  try {
    const res = await db.Assignments.findAll({ where: { teacher_id: id } });
    if (res) {
      return { status: 200, code: 0, message: "success", data: res };
    } else {
      return { status: 500, code: 1, message: "fail", data: "" };
    }
  } catch (error) {
    return { status: 500, code: -1, message: error.message, data: "" };
  }
};
const getAssignmentClass = async (id) => {
  try {
    const res = await db.Assignments.findOne({
      where: { id: id },
      include: [
        {
          model: db.Classes,
          as: "Assignment_Classes",
          include: { model: db.Users, as: "Class_Students" },
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
const getAssignmentByClassId = async (id) => {
  try {
    const res = await db.Assignments.findAll({
      include: [
        {
          model: db.Classes,
          as: "Assignment_Classes",
          through: { where: { class_id: id } },
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
const getAssignmentOfSubjectByClassId = async (class_id, subject_id) => {
  try {
    const res = await db.Assignments.findAll({
      include: [
        {
          model: db.Classes,
          as: "Assignment_Classes",
          through: { where: { class_id: class_id } },
        },
        {
          model: db.Subjects,
          where: { id: subject_id },
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
const getClassesNotInAssignmentOfTeacher = async (
  teacher_id,
  subject_id,
  assignment_id
) => {
  try {
    const res = await db.Classes.findAll({
      include: [
        {
          model: db.Users,
          as: "Class_Teacher",
          through: {
            where: { subject_id: subject_id, teacher_id: teacher_id },
          },
        },
      ],
      where: {
        id: {
          [Op.notIn]: [
            db.Sequelize.literal(
              `(SELECT class_id FROM Assignment_Class WHERE assignment_id = ${assignment_id})`
            ),
          ],
          [Op.in]: [
            db.Sequelize.literal(
              `(SELECT class_id FROM Class_Subject_User WHERE subject_id = ${subject_id} AND teacher_id = ${teacher_id})`
            ),
          ],
        },
      },
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
const changeClass = async (data) => {
  try {
    console.log(data);
    const res = await db.Assignment_Class.update(data, {
      where: { assignment_id: data.assignment_id },
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
  getAssignments,
  getAssignmentById,
  createAssignment,
  updateAssignment,
  getAssignmentByUserId,
  getAssignmentClass,
  getAssignmentByClassId,
  getAssignmentOfSubjectByClassId,
  getClassesNotInAssignmentOfTeacher,
  changeClass,
};
