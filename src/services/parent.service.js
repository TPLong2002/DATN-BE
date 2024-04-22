import db from "../models";
const getFeesByParentId = async (parentId) => {
  try {
    const res = await db.Users.findOne({
      where: { id: parentId },
      include: {
        as: "User_Parents",
        model: db.Users,
        include: {
          as: "User_Fees",
          model: db.Fees,
          attributes: ["id", "name", "price"],
          through: { attributes: ["id", "fee_id", "user_id"] },
        },
        attributes: ["id", "username"],
        through: { attributes: ["id", "student_id", "parent_id"] },
      },
      attributes: ["id", "username"],
    });
    if (res) {
      return { status: 200, code: 0, message: "Success", data: res };
    } else {
      return { status: 500, code: 1, message: "Not found", data: "" };
    }
  } catch (error) {
    return { status: 500, code: 1, message: error.message, data: "" };
  }
};
//thanh xem điểm và thanh toán
module.exports = { getFeesByParentId };
