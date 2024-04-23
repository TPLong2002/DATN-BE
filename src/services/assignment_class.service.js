import db from "../models";
const getAssignmentOfClass = async (id) => {
  try {
    const res = await db.Classes.findAll({
      where: { id: id },
      include: [
        {
          model: db.Assignments,
          as: "Class_Assignments",
        },
      ],
    });
    if (res) {
      return { status: 200, message: "Success", code: 0, data: res };
    } else {
      return { status: 500, message: "Not found", code: 1, data: [] };
    }
  } catch (error) {
    return { status: 500, message: error.message, code: 1, data: [] };
  }
};
const addAssignment_Class = async (data) => {
  try {
    const res = await db.Assignment_Class.create(data);
    if (res) {
      return { status: 200, message: "Success", code: 0, data: res };
    } else {
      return { status: 500, message: "Failed", code: 1, data: [] };
    }
  } catch (error) {
    return { status: 500, message: error.message, code: 1, data: [] };
  }
};
const updateAssignment_Class = async (data) => {
  try {
    const res = await db.Assignment_Class.update(data, {
      where: { id: data.id },
    });
    if (res) {
      return { status: 200, message: "Success", code: 0, data: res };
    } else {
      return { status: 500, message: "Failed", code: 1, data: [] };
    }
  } catch (error) {
    return { status: 500, message: error.message, code: 1, data: [] };
  }
};
const hideAssignment_Class = async (id) => {
  try {
    const res = await db.Assignment_Class.update(
      { ishidden: 1 },
      { where: { id: id } }
    );
    if (res) {
      return { status: 200, message: "Success", code: 0, data: res };
    } else {
      return { status: 500, message: "Failed", code: 1, data: [] };
    }
  } catch (error) {
    return { status: 500, message: error.message, code: 1, data: [] };
  }
};
const getAssingment_Classes = async () => {
  try {
    const res = await db.Assignments.findAll({
      include: [
        {
          model: db.Classes,
          as: "Assignment_Classes",
        },
      ],
    });
    if (res) {
      return { status: 200, message: "Success", code: 0, data: res };
    } else {
      return { status: 500, message: "Not found", code: 1, data: [] };
    }
  } catch (error) {
    return { status: 500, message: error.message, code: 1, data: [] };
  }
};
module.exports = {
  getAssignmentOfClass,
  addAssignment_Class,
  hideAssignment_Class,
  updateAssignment_Class,
  getAssingment_Classes,
};
