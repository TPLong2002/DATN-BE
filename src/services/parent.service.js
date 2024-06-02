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
module.exports = { getFeesByParentId, getFeesOfStudent };
