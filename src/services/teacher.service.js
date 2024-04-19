import db from "../models";
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
module.exports = {
  getClassSubjectByTeacherId,
  registerSubject,
  getSubjectByTeacherId,
};
