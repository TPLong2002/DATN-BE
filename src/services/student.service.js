import db from "../models";
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

module.exports = { getAllAssignmentsByStudentId };
