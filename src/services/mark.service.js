import db from "../models";
const getMarksByStudentId = async (studentId) => {
  try {
    const res = await db.Users.findOne({
      where: { id: studentId },
      include: [
        {
          model: db.Marks,
          include: [
            {
              model: db.Subjects,
              attributes: ["name"],
            },
            {
              model: db.Marktypes,
              attributes: ["name"],
            },
          ],
        },
      ],
    });
    if (res) {
      return { status: 200, message: "success", code: 0, data: res };
    } else {
      return { status: 500, message: "not found", code: 1, data: null };
    }
  } catch (error) {
    return { status: 500, message: error.message, code: -1, data: null };
  }
};
const createMark = async (data) => {
  try {
    const res = await db.Marks.create(data);
    if (res) {
      return { status: 200, message: "success", code: 0, data: res };
    } else {
      return { status: 500, message: "fail", code: 1, data: null };
    }
  } catch (error) {
    return { status: 500, message: error.message, code: -1, data: null };
  }
};
const updateMark = async (data) => {
  try {
    const res = await db.Marks.update(data, {
      where: { id: data.id },
    });
    if (res) {
      return { status: 200, message: "success", code: 0, data: res };
    } else {
      return { status: 500, message: "fail", code: 1, data: null };
    }
  } catch (error) {
    return { status: 500, message: error.message, code: -1, data: null };
  }
};
const deleteMark = async (id) => {
  try {
    const res = await db.Marks.update(
      { ishidden: 1 },
      {
        where: { id: id },
      }
    );
    if (res) {
      return { status: 200, message: "success", code: 0, data: res };
    } else {
      return { status: 500, message: "fail", code: 1, data: null };
    }
  } catch (error) {
    return { status: 500, message: error.message, code: -1, data: null };
  }
};
module.exports = { getMarksByStudentId, createMark, updateMark, deleteMark };
