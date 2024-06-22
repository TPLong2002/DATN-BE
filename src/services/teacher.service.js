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
      },
      include: [
        {
          model: db.Groups,
          as: "Group",
          where: { name: "teacher" },
        },
        {
          model: db.Classes,
          as: "GVCN",
          // required: false, // Đảm bảo rằng việc kết nối với lớp là tùy chọn
        },
        {
          model: db.Profiles,
          attributes: ["firstName", "lastName"],
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
const getSubjectIsTeaching = async (teacher_id, schoolyear_id, semester_id) => {
  console.log(teacher_id, schoolyear_id, semester_id);
  try {
    const res = await db.Users.findOne({
      where: { id: teacher_id },
      include: [
        {
          model: db.Subjects,
          as: "User_Subjects",
          attributes: ["id", "name"],
          through: {
            where: { ishidden: 0 },
            attributes: [],
          },
        },
        {
          model: db.Classes,
          as: "Teacher_Classes",
          where: {
            ishidden: 0,
            schoolyear_id: schoolyear_id,
          },
          attributes: ["id", "name", "grade_id", "schoolyear_id", "gvcn_id"],
          through: {
            where: { ishidden: 0 },
            attributes: [],
          },
        },
      ],
    });
    if (res) {
      return { status: 200, code: 0, message: "success", data: res };
    } else {
      return { status: 200, code: 1, message: "fail", data: [] };
    }
  } catch (error) {
    return { status: 500, code: 1, message: error.message, data: "" };
  }
};
const getClassOfSubjectIsTeaching = async (teacher_id, subject_id) => {
  try {
    const res = await db.Users.findOne({
      where: { id: teacher_id },
      include: [
        {
          model: db.Classes,
          as: "Teacher_Classes",
          where: { ishidden: 0 },
          attributes: [
            "id",
            "name",
            "grade_id",
            "schoolyear_id",
            "ishidden",
            "gvcn_id",
          ],
          through: {
            where: { subject_id: subject_id },
            attributes: [],
          },
        },
      ],
    });
    if (res) {
      return { status: 200, code: 0, message: "success", data: res };
    } else {
      return { status: 200, code: 1, message: "fail", data: [] };
    }
  } catch (error) {
    return { status: 500, code: 1, message: error.message, data: "" };
  }
};
const getAssignmentByTeacherId = async (
  teacher_id,
  limit,
  page,
  schoolyear_id,
  semester_id
) => {
  if (!limit) limit = 10;
  if (!page) page = 1;
  const offset = (page - 1) * limit;
  try {
    const condition1 = schoolyear_id ? { schoolyear_id: schoolyear_id } : {};
    const condition2 = semester_id ? { semester_id: semester_id } : {};
    const { rows, count } = await db.Assignments.findAndCountAll({
      where: { teacher_id: teacher_id, ...condition1, ...condition2 },
      include: [
        {
          model: db.Classes,
          as: "Assignment_Classes",
          through: { attributes: [] },
        },
        {
          model: db.Subjects,
          attributes: ["id", "name"],
        },
        {
          model: db.Users,
          attributes: ["id", "username"],
          include: {
            model: db.Profiles,
            attributes: ["firstName", "lastName"],
          },
        },
      ],
      limit: +limit,
      offset: +offset,
    });
    if (rows && count) {
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
    return { status: 500, code: 1, message: error.message, data: "" };
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
const getClassesNotInAssignmentOfTeacher = async (
  teacher_id,
  subject_id,
  assignment_id
) => {
  try {
    const res = await db.Classes.findAll({
      where: {
        [Op.and]: [
          {
            id: {
              [Op.notIn]: db.Sequelize.literal(
                `(SELECT class_id FROM Assignment_Class WHERE assignment_id = ${assignment_id})`
              ),
            },
          },
          {
            id: {
              [Op.in]: db.Sequelize.literal(
                `(SELECT class_id FROM Class_Subject_User WHERE subject_id = ${subject_id} AND teacher_id = ${teacher_id})`
              ),
            },
          },
        ],
        ishidden: 0,
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
const getClassesInAssignmentOfTeacher = async (
  teacher_id,
  subject_id,
  assignment_id
) => {
  try {
    const res = await db.Classes.findAll({
      where: {
        [Op.and]: [
          {
            id: {
              [Op.in]: db.Sequelize.literal(
                `(SELECT class_id FROM Assignment_Class WHERE assignment_id = ${assignment_id})`
              ),
            },
          },
          {
            id: {
              [Op.in]: db.Sequelize.literal(
                `(SELECT class_id FROM Class_Subject_User WHERE subject_id = ${subject_id} AND teacher_id = ${teacher_id})`
              ),
            },
          },
        ],
        ishidden: 0,
      },
      include: [
        {
          model: db.Schoolyears,
        },
        {
          model: db.Assignments,
          as: "Class_Assignments",
          through: {
            attributes: ["id"],
            where: { assignment_id: assignment_id },
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
const addClassToAssignment = async (data) => {
  try {
    const res = await db.Assignment_Class.bulkCreate(data);
    if (res) {
      return { status: 200, code: 0, message: "success", data: res };
    } else {
      return { status: 500, code: 1, message: "fail", data: "" };
    }
  } catch (error) {
    return { status: 500, code: 1, message: "fail", data: "" };
  }
};
const deleteClassFromAssignment = async (data) => {
  try {
    const res = await db.Assignment_Class.destroy({
      where: { id: data.id },
    });
    if (res) {
      return { status: 200, code: 0, message: "success", data: res };
    } else {
      return { status: 500, code: 1, message: "fail", data: "" };
    }
  } catch (error) {
    return { status: 500, code: 1, message: "fail", data: "" };
  }
};
const getTeacherByClassSubject = async (subject_id, class_id) => {
  console.log(subject_id, class_id);
  try {
    const teacher = await db.Class_Subject_User.findOne({
      where: { subject_id: subject_id, class_id: class_id },
      attributes: ["teacher_id"],
    });
    const res = await db.Users.findOne({
      where: { id: teacher.teacher_id },
      include: [
        {
          model: db.Profiles,
          attributes: ["firstName", "lastName"],
        },
      ],
    });
    if (res) {
      return { status: 200, code: 0, message: "success", data: res };
    } else {
      return { status: 500, code: 1, message: "fail", data: "" };
    }
  } catch (error) {
    return { status: 500, code: 1, message: error.message, data: "" };
  }
};
const countTeacherBySubject = async () => {
  try {
    const res = await db.Subjects.findAll({
      attributes: [
        "id",
        "name",
        [
          db.sequelize.fn("COUNT", db.sequelize.col("SubjectUsers.id")),
          "teacher_count",
        ],
        "grade_id",
      ],
      where: { ishidden: 0 },
      include: [
        {
          model: db.Users,
          as: "SubjectUsers",
          attributes: [],
          through: { attributes: [] }, // Loại bỏ các thuộc tính của bảng liên kết
        },
      ],
      group: ["Subjects.id"], // Nhóm theo id của môn học
    });

    if (res) {
      return { status: 200, code: 0, message: "success", data: res };
    } else {
      return { status: 500, code: 1, message: "fail", data: "" };
    }
  } catch (error) {
    return { status: 500, code: 1, message: error.message, data: "" };
  }
};
const getTeachersBySubject = async (subject_id) => {
  try {
    const res = await db.Users.findAll({
      include: [
        {
          model: db.Subjects,
          as: "UserSubjects",
          where: { id: subject_id },
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
    return { status: 500, code: 1, message: error.message, data: "" };
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
  getSubjectIsTeaching,
  getClassOfSubjectIsTeaching,
  getAssignmentByTeacherId,
  getAssignmentById,
  updateAssignment,
  getClassesNotInAssignmentOfTeacher,
  changeClass,
  createAssignment,
  getClassesInAssignmentOfTeacher,
  addClassToAssignment,
  deleteClassFromAssignment,
  getTeacherByClassSubject,
  countTeacherBySubject,
  getTeachersBySubject,
};
