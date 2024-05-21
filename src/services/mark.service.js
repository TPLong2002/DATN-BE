import db from "../models";
import { Op } from "sequelize";
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
const getMatksOfStudentsInClass = async (class_id, subject_id) => {
  try {
    const res = await db.Marks.findAll({
      where: {
        subject_id: subject_id,
        user_id: {
          [Op.in]: db.sequelize.literal(
            `(SELECT user_id FROM Class_User WHERE class_id = ${class_id})`
          ),
        },
      },
      include: [
        {
          model: db.Users,
          include: {
            model: db.Profiles,
          },
        },
        {
          model: db.Subjects,
          attributes: ["name"],
        },
        {
          model: db.Marktypes,
          attributes: ["name"],
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
const getMatksOfStudentInClassById = async (class_id, subject_id, user_id) => {
  try {
    const res = await db.Marks.findAll({
      where: {
        subject_id: subject_id,
        [Op.and]: {
          user_id: {
            [Op.in]: db.sequelize.literal(
              `(SELECT user_id FROM Class_User WHERE class_id = ${class_id})`
            ),
          },
          user_id: user_id,
        },
      },
      include: [
        {
          model: db.Users,
          include: {
            model: db.Profiles,
          },
        },
        {
          model: db.Subjects,
          attributes: ["name"],
        },
        {
          model: db.Marktypes,
          attributes: ["name"],
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
const updateOrCreateMarksOfStudent = async (data) => {
  try {
    for (const item of data) {
      const existingMark = await db.Marks.findOne({
        where: {
          user_id: item.user_id,
          subject_id: item.subject_id,
          marktype_id: item.marktype_id,
        },
      });

      if (existingMark) {
        if (existingMark.mark !== +item.mark) {
          await existingMark.update({ mark: +item.mark });
        }
      } else {
        await db.Marks.create(item);
      }
    }
    return { status: 200, message: "success", code: 0, data: "" };
  } catch (error) {
    return { status: 500, message: error.message, code: -1, data: null };
  }
};
module.exports = {
  getMarksByStudentId,
  createMark,
  updateMark,
  deleteMark,
  getMatksOfStudentsInClass,
  getMatksOfStudentInClassById,
  updateOrCreateMarksOfStudent,
};
