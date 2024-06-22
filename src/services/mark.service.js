import db from "../models";
import { Op } from "sequelize";
const getMarksByStudentId = async (
  student_id,
  schoolyear_id,
  semester_id,
  subject_id
) => {
  console.log(student_id, schoolyear_id, semester_id, subject_id);
  const condition1 = subject_id ? { subject_id: +subject_id } : {};
  try {
    const res = await db.Users.findOne({
      where: {
        id: student_id,
      },

      include: [
        {
          model: db.Marks,
          where: {
            schoolyear_id: schoolyear_id,
            semester_id: semester_id,
            ...condition1,
          },
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
        {
          model: db.Profiles,
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
const getMatksOfStudentsInClass = async (
  class_id,
  subject_id,
  schoolyear_id,
  semester_id
) => {
  try {
    const usersInClass = await db.Class_User.findAll({
      where: { class_id: class_id },
      attributes: ["user_id"],
    });

    const userIdsInClass = usersInClass.map((user) => user.user_id);

    // Lấy các bảng điểm hiện có
    const existingMarks = await db.Marks.findAll({
      where: {
        subject_id: subject_id,
        user_id: {
          [Op.in]: userIdsInClass,
        },
        schoolyear_id: schoolyear_id,
        semester_id: semester_id,
      },
    });

    const userIdsWithMarks = existingMarks.map((mark) => mark.user_id);

    // Xác định người dùng chưa có bảng điểm
    const userIdsWithoutMarks = userIdsInClass.filter(
      (userId) => !userIdsWithMarks.includes(userId)
    );

    // Tạo bảng điểm cho những người dùng chưa có
    const newMarksData = userIdsWithoutMarks.map((userId) => ({
      user_id: userId,
      subject_id: subject_id,
      schoolyear_id: schoolyear_id,
      semester_id: semester_id,
      mark: 0, // Giá trị khởi tạo cho mark, có thể điều chỉnh nếu cần
    }));

    if (newMarksData.length > 0) {
      await db.Marks.bulkCreate(newMarksData);
    }

    // Lấy lại tất cả bảng điểm bao gồm các liên kết
    const res = await db.Marks.findAll({
      where: {
        subject_id: subject_id,
        user_id: {
          [Op.in]: userIdsInClass,
        },
        schoolyear_id: schoolyear_id,
        semester_id: semester_id,
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
const getMatksOfStudentInClassById = async (
  class_id,
  subject_id,
  user_id,
  semester_id,
  schoolyear_id
) => {
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
        schoolyear_id: schoolyear_id,
        semester_id: semester_id,
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
          schoolyear_id: item.schoolyear_id,
          semester_id: item.semester_id,
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
