import db from "../models";
import { Op } from "sequelize";
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
module.exports = {
  getAllAssignmentsByStudentId,
  getStudentBySchoolyear,
  getAssignmentById,
};
