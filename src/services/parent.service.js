import db from "../models";
const getFeesByParentId = async (parentId) => {
  try {
    const feeOfStudent = await db.Users.findOne({
      where: { id: parentId },
      include: [
        {
          as: "User_Parents",
          model: db.Users,
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
          ],
          attributes: ["id", "username"],
          through: {
            attributes: ["id"],
          },
        },
        {
          model: db.Profiles,
          attributes: ["id", "firstName", "lastName"],
        },
      ],
      attributes: ["id", "username"],
    });

    if (feeOfStudent) {
      return { status: 200, code: 0, message: "Success", data: feeOfStudent };
    } else {
      return { status: 500, code: 1, message: "Not found", data: "" };
    }
  } catch (error) {
    return { status: 500, code: 1, message: error.message, data: "" };
  }
};
//thanh xem điểm và thanh toán

const getFeesOfStudent = async (data) => {
  try {
    const result = await db.Paymenthistories.findAll({
      where: { parent_student_id: data.parent_student_id, fee_id: data.fee_id },
      include: {
        model: db.Fees,
        attributes: ["id", "name", "price"],
      },
      raw: true,
      nest: true,
    });
    if (result) {
      return { status: 200, code: 0, message: "Success", data: result };
    } else {
      return { status: 500, code: 1, message: "Not found", data: "" };
    }
  } catch (error) {}
};
const getStudentsByParentId = async (parent_id) => {
  try {
    const result = await db.Users.findOne({
      where: { id: parent_id },
      include: [
        {
          as: "User_Parents",
          model: db.Users,
          include: [
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
          ],
          attributes: ["id", "username", "email"],
          through: {
            attributes: ["id"],
          },
        },
        {
          model: db.Profiles,
          attributes: ["id", "firstName", "lastName"],
        },
      ],
    });
    if (result) {
      return { status: 200, code: 0, message: "Success", data: result };
    } else {
      return { status: 500, code: 1, message: "Not found", data: "" };
    }
  } catch (error) {
    return { status: 500, code: 1, message: error.message, data: "" };
  }
};
const getMarksByStudentId = async (
  student_id,
  parent_id,
  semester_id,
  schoolyear_id
) => {
  try {
    console.log(student_id, parent_id, semester_id, schoolyear_id);
    const condition1 = semester_id ? { semester_id: semester_id } : {};
    const condition2 = schoolyear_id ? { schoolyear_id: schoolyear_id } : {};
    const result = await db.Users.findOne({
      where: {
        id: parent_id,
      },
      include: {
        model: db.Users,
        as: "User_Parents",
        include: [
          {
            model: db.Marks,
            where: {
              ...condition1,
              ...condition2,
              user_id: student_id,
              subject_id: {
                [db.Sequelize.Op.and]: [
                  { [db.Sequelize.Op.ne]: 0 },
                  { [db.Sequelize.Op.ne]: null },
                ],
              },
            },
            include: [
              {
                model: db.Subjects,
                attributes: ["id", "name"],
              },
              {
                model: db.Marktypes,
                attributes: ["id", "name"],
              },
              {
                model: db.Semesters,
                attributes: ["id", "name"],
              },
            ],
          },
          {
            model: db.Profiles,
            attributes: ["id", "firstName", "lastName"],
          },
        ],
      },
    });
    if (result) {
      return { status: 200, code: 0, message: "Success", data: result };
    } else {
      return { status: 500, code: 1, message: "Not found", data: "" };
    }
  } catch (error) {
    return { status: 500, code: 1, message: error.message, data: "" };
  }
};
module.exports = {
  getFeesByParentId,
  getFeesOfStudent,
  getStudentsByParentId,
  getMarksByStudentId,
};
