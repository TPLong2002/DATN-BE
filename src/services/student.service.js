import db from "../models";
import { Op, where } from "sequelize";
const getAllAssignmentsByStudentId = async (studentId) => {
  try {
    const res = await db.Users.findOne({
      where: { id: studentId },
      include: [
        {
          model: db.Classes,
          as: "Student_Classes",
          include: [
            {
              as: "Class_Assignments",
              model: db.Assignments,
              include: [
                {
                  model: db.Subjects,
                },
              ],
            },
          ],
        },
      ],
    });
    if (res) {
      return { status: 200, code: 0, message: "Success", data: res };
    } else {
      return { status: 500, code: 1, message: "Not found", data: [] };
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

module.exports = {
  getAllAssignmentsByStudentId,
  getStudentBySchoolyear,
};
