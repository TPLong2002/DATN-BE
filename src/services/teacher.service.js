import db from "../models";
import { Op, where } from "sequelize";
const getClassSubjectByTeacherId = async (id) => {
  try {
    const res = await db.Users.findAll({
      where: { id: id },
      include: [
        {
          model: db.Classes,
          as: "Teacher_Classes",
          attributes: ["name"],
          through: {
            attributes: [],
            where: { ishidden: 0 },
          },
          include: [
            {
              model: db.Subjects,
              as: "Class_Subjects",
              attributes: ["name"],
              through: {
                attributes: [],
                where: { ishidden: 0 },
              },
            },
          ],
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
const getSubjectByTeacherId = async (id) => {
  try {
    const res = await db.Users.findAll({
      where: { id: id },
      include: [
        {
          model: db.Subjects,
          as: "UserSubjects",
          attributes: ["id", "name"],
          through: {
            attributes: [],
            where: { ishidden: 0 },
          },
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
const registerSubject = async (data) => {
  try {
    const res = await db.User_Subject.create(data);
    if (res) {
      return { status: 200, code: 0, message: "success", data: res };
    } else {
      return { status: 500, code: 1, message: "fail", data: "" };
    }
  } catch (error) {}
};
const delSubjectOfTeacher = async (id) => {
  try {
    const res = db.User_Subject.update(
      { ishidden: 1 },
      {
        where: { id: id },
      }
    );
    if (res) {
      return { status: 200, code: 0, message: "success", data: res };
    } else {
      return { status: 500, code: 1, message: "fail", data: "" };
    }
  } catch (error) {
    return { status: 500, code: 1, message: "fail", data: "" };
  }
};
const getTeachers = async () => {
  try {
    const res = await db.Users.findAll({
      include: [{ model: db.Groups, as: "Group", where: { name: "teacher" } }],
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
const getTeacherWithoutGVCN = async () => {
  try {
    const res = await db.Users.findAll({
      where: {
        "$GVCN.GVCN_id$": null, // Lọc ra các giáo viên không có GVCN_id
        "$Group.name$": "teacher", // Lọc ra các giáo viên có vai trò là 'teacher'
      },
      include: [
        {
          model: db.Groups,
        },
        {
          model: db.Classes,
          as: "GVCN",
          // required: false, // Đảm bảo rằng việc kết nối với lớp là tùy chọn
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
const getTeachersNotInSubject = async (subject_id) => {
  try {
    const res = await db.Users.findAll({
      where: {
        id: {
          [Op.notIn]: db.sequelize.literal(
            `(SELECT teacher_id FROM User_Subject WHERE subject_id = ${subject_id})`
          ),
        },
      },
      include: [
        {
          model: db.Groups,
          as: "Group",
          where: { name: "teacher" },
        },
        {
          model: db.Subjects,
          as: "UserSubjects",
        },
        {
          model: db.Profiles,
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
const addTeacherToSubject = async (data) => {
  try {
    const res = await db.User_Subject.bulkCreate(data);
    if (res) {
      return { status: 200, code: 0, message: "success", data: res };
    } else {
      return { status: 500, code: 1, message: "fail", data: "" };
    }
  } catch (error) {
    return { status: 500, code: 1, message: "fail", data: "" };
  }
};
module.exports = {
  getClassSubjectByTeacherId,
  registerSubject,
  getSubjectByTeacherId,
  delSubjectOfTeacher,
  getTeachers,
  getTeacherWithoutGVCN,
  getTeachersNotInSubject,
  addTeacherToSubject,
};
