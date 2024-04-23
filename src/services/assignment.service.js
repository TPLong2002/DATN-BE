import db from "../models";

const getAssignments = async () => {
  try {
    const res = await db.Assignments.findAll({ where: { ishidden: 0 } });
    if (res) {
      return { status: 200, code: 0, message: "success", data: res };
    } else {
      return { status: 500, code: 1, message: "fail", data: "" };
    }
  } catch (error) {
    return { status: 500, code: -1, message: error.message, data: "" };
  }
};
const getAssignmentById = async (id) => {
  try {
    const res = await db.Assignments.findOne({ where: { id: id } });
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
module.exports = {
  getAssignments,
  getAssignmentById,
  createAssignment,
  updateAssignment,
  getAssignmentByUserId,
  getAssignmentClass,
};
