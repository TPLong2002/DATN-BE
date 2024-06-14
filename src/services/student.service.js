import db from "../models";
import { Op, where } from "sequelize";
const getAllAssignmentsByStudentId = async (
  student_id,
  limit = 10,
  page = 1
) => {
  try {
    const offset = (page - 1) * limit;
    const { rows, count } = await db.Users.findAndCountAll({
      where: { id: student_id },
      include: [
        {
          model: db.Classes,
          as: "Student_Classes",
          where: { ishidden: 0 },
          include: [
            {
              as: "Class_Assignments",
              model: db.Assignments,
              where: { ishidden: 0 },
              include: [
                {
                  model: db.Subjects,
                },
                {
                  model: db.Users,
                  attributes: ["id"],
                  include: [
                    {
                      model: db.Profiles,
                      attributes: ["firstname", "lastname"],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
      limit: +limit,
      offset: +offset,
    });
    if (rows) {
      return {
        status: 200,
        code: 0,
        message: "Success",
        data: { rows, count },
      };
    } else {
      return { status: 500, code: 1, message: "Not found", data: {} };
    }
  } catch (error) {
    return { status: 500, code: 1, message: error.message, data: [] };
  }
};
const getStudentBySchoolyear = async (schoolyear_id) => {
  try {
    const students = await db.Users.findAll({
      where: {
        schoolyear_id: schoolyear_id,
        id: {
          [Op.notIn]: db.sequelize.literal(
            `(SELECT user_id FROM Class_User)` // Lấy danh sách các user_id đã tồn tại trong bảng Class_User
          ),
        },
      },
      include: [
        {
          model: db.Profiles,
          attributes: ["firstname", "lastname"],
        },
        { model: db.Groups, as: "Group", where: { description: "Student" } },
      ],
    });
    if (students) {
      return { status: 200, code: 0, message: "Success", data: students };
    } else {
      return { status: 500, code: 1, message: "Not found", data: [] };
    }
  } catch (error) {
    return { status: 500, code: 1, message: error.message, data: [] };
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
const countStudentByGrade = async () => {
  try {
    const res = await db.Classes.findAll({
      attributes: [
        "grade_id",
        [
          db.sequelize.fn("COUNT", db.sequelize.col("Class_Students.id")),
          "student_count",
        ],
        // [
        //   db.sequelize.fn(
        //     "SUM",
        //     db.sequelize.literal(
        //       'CASE WHEN `Class_Students->Profile->Gender`.`description` = "Nam" THEN 1 ELSE 0 END'
        //     )
        //   ),
        //   "male_count",
        // ],
        // [
        //   db.sequelize.fn(
        //     "SUM",
        //     db.sequelize.literal(
        //       'CASE WHEN `Class_Students->Profile->Gender`.`description` = "Nữ" THEN 1 ELSE 0 END'
        //     )
        //   ),
        //   "female_count",
        // ],
      ],
      include: [
        {
          model: db.Users,
          as: "Class_Students",
          attributes: [],
          include: [
            {
              model: db.Profiles,
              attributes: [],
              include: [
                {
                  model: db.Genders,
                  attributes: [],
                  as: "Gender",
                },
              ],
            },
          ],
        },
        {
          model: db.Grades,
          attributes: ["name"],
        },
      ],
      where: { ishidden: 0 },
      group: ["grade_id"],
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
const countStudentBySchoolyear = async () => {
  try {
    const res = await db.Users.findAll({
      attributes: [
        "schoolyear_id",
        [
          db.sequelize.fn("COUNT", db.sequelize.col("Users.id")),
          "student_count",
        ],
      ],
      include: [
        {
          model: db.Groups,
          as: "Group",
          where: { name: "student" },
        },
        {
          model: db.Schoolyears,
          attributes: ["name"],
        },
      ],
      where: { isdeleted: 0 },
      group: ["schoolyear_id"],
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
const getFeesByStudentId = async (student_id) => {
  const feeOfStudent = await db.Users.findOne({
    where: { id: student_id, isdeleted: 0 },
    include: [
      {
        as: "User_Fees",
        model: db.Fees,
        attributes: [
          "id",
          "name",
          "price",
          "startDate",
          "endDate",
          "schoolyear_id",
        ],
        through: {
          where: { ishidden: 0 },
          attributes: ["id", "fee_id", "user_id"],
        },
      },
      {
        model: db.Profiles,
        attributes: ["id", "firstName", "lastName"],
      },
      {
        model: db.Classes,
        attributes: ["id", "name"],
        as: "Student_Classes",
        through: {
          attributes: ["id", "class_id", "user_id"],
        },
        include: [
          {
            model: db.Schoolyears,
            attributes: ["id", "name"],
          },
        ],
      },
      {
        as: "User_Students",
        model: db.Users,
        attributes: ["id"],
        include: {
          model: db.Profiles,
          attributes: ["id", "firstName", "lastName"],
        },
      },
    ],
  });
  if (feeOfStudent) {
    return { status: 200, code: 0, message: "Success", data: feeOfStudent };
  } else {
    return { status: 500, code: 1, message: "Not found", data: "" };
  }
};
const getStudentAndParents = async (
  limit = 10,
  page = 1,
  search,
  schoolyear_id
) => {
  const offset = (page - 1) * limit;
  console.log(limit, page, search, schoolyear_id);
  try {
    const searchCondition = search
      ? {
          [Op.or]: [
            {
              username: {
                [Op.like]: `%${search}%`,
              },
            },
            {
              email: {
                [Op.like]: `%${search}%`,
              },
            },
            {
              "$Profile.firstName$": {
                [Op.like]: `%${search}%`,
              },
            },
            {
              "$Profile.lastName$": {
                [Op.like]: `%${search}%`,
              },
            },
          ],
        }
      : {};
    const searchCondition1 = schoolyear_id
      ? { schoolyear_id: schoolyear_id }
      : {};
    const { count, rows } = await db.Users.findAndCountAll({
      attributes: ["id", "username", "email", "schoolyear_id"],
      where: {
        isdeleted: 0,
        group_id: {
          [Op.eq]: db.sequelize.literal(
            '(SELECT id FROM `Groups` WHERE name = "student")'
          ),
        },
        ...searchCondition1,
        ...searchCondition,
      },
      include: [
        {
          model: db.Profiles,
          attributes: ["firstName", "lastName"],
        },
        {
          model: db.Users,
          as: "User_Students",
          attributes: ["id", "username", "email", "schoolyear_id"],
          include: [
            {
              model: db.Profiles,
              attributes: ["firstName", "lastName"],
            },
          ],
        },
      ],
      limit: +limit,
      offset: +offset,
      subQuery: false,
    });
    return { status: 200, code: 0, message: "success", data: { count, rows } };
  } catch (err) {
    console.log(err);
    return {
      status: 500,
      status: 500,
      code: -1,
      message: err.message,
      data: [],
    };
  }
};
const getStudentBySchoolyearId = async (schoolyear_id) => {
  // lấy học sinh theo năm
  try {
    const students = await db.Users.findAll({
      where: {
        schoolyear_id: schoolyear_id,
        isdeleted: 0,
        group_id: {
          [Op.eq]: db.sequelize.literal(
            '(SELECT id FROM `Groups` WHERE name = "student")'
          ),
        },
      },
      include: [
        {
          model: db.Profiles,
          attributes: ["firstName", "lastName"],
        },
      ],
    });
    if (students) {
      return { status: 200, code: 0, message: "Success", data: students };
    } else {
      return { status: 500, code: 1, message: "Not found", data: [] };
    }
  } catch (error) {
    return { status: 500, code: 1, message: error.message, data: [] };
  }
};
module.exports = {
  getAllAssignmentsByStudentId,
  getStudentBySchoolyear,
  getAssignmentById,
  countStudentByGrade,
  countStudentBySchoolyear,
  getFeesByStudentId,
  getStudentAndParents,
  getStudentBySchoolyearId,
};
