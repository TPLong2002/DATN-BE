import db from "../models";
import { Op, where } from "sequelize";

const getAllFee = async (
  limit = 1,
  page = 10,
  schoolyear_id,
  semester_id,
  grade_id
) => {
  const offset = (page - 1) * limit;
  try {
    const condition1 = schoolyear_id ? { schoolyear_id: schoolyear_id } : {};
    const condition2 = semester_id ? { semester_id: semester_id } : {};
    const condition3 = grade_id ? { grade_id: grade_id } : {};
    const { count, rows } = await db.Fees.findAndCountAll({
      where: { ...condition2, ...condition1, ...condition3 },
      offset: +offset,
      limit: +limit,
      include: [
        {
          model: db.Schoolyears,
          attributes: [], // Không cần lấy thuộc tính của schoolyears trong kết quả chính
        },
      ],
      order: [
        [db.Schoolyears, "name", "DESC"], // Sắp xếp theo name của schoolyears tăng dần
      ],
    });
    if (rows && count) {
      return {
        status: 200,
        code: 0,
        message: "success",
        data: { rows, count },
      };
    } else {
      return { status: 200, code: 0, message: "Fee not found", data: {} };
    }
  } catch (error) {
    return { status: 500, code: -1, message: error.message, data: {} };
  }
};

const getFeeById = async (id) => {
  try {
    const res = await db.Fees.findOne({ where: { id: id } });
    if (res) {
      return { status: 200, code: 0, message: "success", data: res };
    } else {
      return { status: 500, code: 1, message: "fail", data: "" };
    }
  } catch (error) {
    return { status: 500, code: -1, message: error.message, data: "" };
  }
};
const createFee = async (data) => {
  try {
    const res = await db.Fees.bulkCreate(data);
    if (res) {
      return { status: 200, code: 0, message: "success", data: res };
    } else {
      return { status: 500, code: 1, message: "fail", data: "" };
    }
  } catch (error) {
    return { status: 500, code: -1, message: error.message, data: "" };
  }
};
const updateFee = async (data) => {
  try {
    const res = await db.Fees.update(data, { where: { id: data.id } });
    if (res) {
      return { status: 200, code: 0, message: "success", data: res };
    } else {
      return { status: 500, code: 1, message: "fail", data: "" };
    }
  } catch (error) {
    return { status: 500, code: -1, message: error.message, data: "" };
  }
};
const getStudentsOfFee = async (fee_id) => {
  const res = await db.Fees.findOne({
    where: { id: fee_id },
    include: [
      {
        model: db.Users,
        as: "Fee_Users",
        include: [
          {
            model: db.Paymenthistories,
            as: "Student_Paymenthistories",
            where: { fee_id: fee_id },
            include: [
              {
                model: db.Paymentstatuses,
                attributes: ["code"],
              },
            ],
          },
          {
            model: db.Profiles,
            attributes: ["firstname", "lastname"],
          },
          {
            model: db.Users,
            as: "User_Students",
            include: {
              model: db.Profiles,
              attributes: ["id", "firstname", "lastname"],
            },
          },
        ],
        through: { attributes: ["ishidden"] },
        attributes: ["id", "username"],
      },
    ],
  });
  if (res) {
    return { status: 200, code: 0, message: "success", data: res };
  } else {
    return { status: 500, code: 1, message: "fail", data: "" };
  }
};
const deleteUsersOfFee = async (data) => {
  try {
    const result = await db.sequelize.transaction(async (t) => {
      // Cập nhật bảng User_Fee
      const userFeeUpdateResult = await db.User_Fee.update(
        { ishidden: data.ishidden },
        {
          where: { fee_id: data.fee_id, user_id: data.user_id },
          transaction: t,
        }
      );

      // Kiểm tra nếu cập nhật thành công
      if (userFeeUpdateResult[0] === 0) {
        throw new Error("User_Fee update failed");
      }

      // Cập nhật bảng Payment_History
      const paymentHistoryUpdateResult = await db.Paymenthistories.update(
        { ishidden: data.ishidden },
        {
          where: { student_id: data.user_id, fee_id: data.fee_id },
          transaction: t,
        }
      );

      // Kiểm tra nếu cập nhật thành công
      if (paymentHistoryUpdateResult[0] === 0) {
        throw new Error("Payment_History update failed");
      }

      return {
        status: 200,
        code: 0,
        message: "success",
        data: { userFeeUpdateResult, paymentHistoryUpdateResult },
      };
    });

    return result;
  } catch (error) {
    return { status: 500, code: -1, message: error.message, data: "" };
  }
};
const getStudentNotInFee = async (fee_id) => {
  try {
    const res = await db.Users.findAll({
      include: [
        {
          model: db.Fees,
          as: "User_Fees",
          through: { where: { ishidden: 0 }, attributes: [] },
        },
        {
          model: db.Groups,
          as: "Group",
          where: { name: "student" },
          attributes: [],
        },
        {
          model: db.Profiles,
          attributes: ["firstname", "lastname"],
        },
        { model: db.Users, as: "User_Students", attributes: ["id"] },
      ],
      where: {
        id: {
          [Op.notIn]: db.sequelize.literal(
            `(SELECT user_id FROM User_Fee WHERE fee_id = ${fee_id} AND ishidden = 0)`
          ),
        },
      },
    });
    if (res) {
      return { status: 200, code: 0, message: "Success", data: res };
    } else {
      return { status: 500, code: 1, message: "Not found", data: [] };
    }
  } catch (error) {}
};
const addUsersToFee = async (data) => {
  try {
    //   const res = await db.User_Fee.bulkCreate(data);
    //   if (res) {
    //     return { status: 200, code: 0, message: "Success", data: res };
    //   } else {
    //     return { status: 500, code: 1, message: "Fail", data: [] };
    //   }
    const transaction = await db.sequelize.transaction();
    const fee = await db.Fees.findOne({ where: { id: data[0].fee_id } });
    if (!fee) {
      return { status: 500, code: 1, message: "Fee not found", data: [] };
    }
    console.log(data);
    const res = await db.User_Fee.bulkCreate(
      data.map((student) => ({
        fee_id: student.fee_id,
        user_id: student.user_id,
      })),
      { transaction }
    );
    if (res) {
      // Chuẩn bị dữ liệu cho bảng PaymentHistory

      const paymentHistories = data.map((item) => ({
        fee_id: item.fee_id,
        parent_id: item.parent_id,
        student_id: item.user_id,
        paymentstatus_id: 2, // 1: đã thanh toán, 2: chưa thanh toán
        amount: fee.price, // hoặc số tiền tương ứng nếu có
        time: "",
        orderInfo: "",
        orderType: "",
        payType: "",
        paymentmethod_id: "",
        ishidden: 0,
      }));
      console.log(paymentHistories);
      // Tạo lịch sử thanh toán
      const paymentRes = await db.Paymenthistories.bulkCreate(
        paymentHistories,
        {
          transaction,
        }
      );
      // Nếu tất cả đều thành công, commit transaction
      await transaction.commit();
      return {
        status: 200,
        code: 0,
        message: "Success",
        data: { userFees: res, paymentHistories: paymentRes },
      };
    } else {
      await transaction.rollback();
      return { status: 500, code: 1, message: "Fail", data: [] };
    }
  } catch (error) {
    console.log(error);
    return { status: 500, code: -1, message: error.message, data: [] };
  }
};
const countFeeAvailable = async () => {
  try {
    const res = await db.Fees.count({
      where: { ishidden: 0 },
    });
    if (res) {
      return { status: 200, code: 0, message: "Success", data: res };
    } else {
      return { status: 500, code: 1, message: "Fail", data: [] };
    }
  } catch (error) {
    return { status: 500, code: -1, message: error.message, data: [] };
  }
};
const amountOfFees = async () => {
  try {
    const res = await db.Fees.findAll({
      where: { ishidden: 0 },
      include: [
        {
          model: db.Paymenthistories,
          where: { ishidden: 0 },
          attributes: [],
        },
      ],
      attributes: [
        "name",
        [
          db.Sequelize.literal(
            `SUM(CASE WHEN Paymenthistories.paymentstatus_id = 2 THEN Paymenthistories.amount ELSE 0 END)`
          ),
          "unpaidAmount",
        ],
        [
          db.Sequelize.literal(
            `SUM(CASE WHEN Paymenthistories.paymentstatus_id = 1 THEN Paymenthistories.amount ELSE 0 END)`
          ),
          "paidAmount",
        ],
      ],
      group: ["Fees.id"],
    });
    if (res) {
      return { status: 200, code: 0, message: "Success", data: res };
    } else {
      return { status: 500, code: 1, message: "Fail", data: [] };
    }
  } catch (error) {
    return { status: 500, code: -1, message: error.message, data: [] };
  }
};
const getFeeBySchoolyearGrade = async (schoolyear_id, grade_id) => {
  try {
    const res = await db.Fees.findAll({
      where: { schoolyear_id: schoolyear_id, grade_id: grade_id },
    });
    if (res) {
      return { status: 200, code: 0, message: "Success", data: res };
    } else {
      return { status: 500, code: 1, message: "Fail", data: [] };
    }
  } catch (error) {
    return { status: 500, code: -1, message: error.message, data: [] };
  }
};
const amountOfFee = async (fee_id) => {
  try {
    const res = await db.Fees.findOne({
      where: { id: fee_id },
      include: [
        {
          model: db.Paymenthistories,
          where: { ishidden: 0 },
          attributes: [],
        },
      ],
      attributes: [
        "name",
        [
          db.Sequelize.literal(
            `SUM(CASE WHEN Paymenthistories.paymentstatus_id = 2 THEN Paymenthistories.amount ELSE 0 END)`
          ),
          "unpaidAmount",
        ],
        [
          db.Sequelize.literal(
            `SUM(CASE WHEN Paymenthistories.paymentstatus_id = 1 THEN Paymenthistories.amount ELSE 0 END)`
          ),
          "paidAmount",
        ],
      ],
      group: ["Fees.id"],
    });
    if (res) {
      return { status: 200, code: 0, message: "Success", data: res };
    } else {
      return { status: 500, code: 1, message: "Fail", data: [] };
    }
  } catch (error) {
    return { status: 500, code: -1, message: error.message, data: [] };
  }
};
const amountOfFeesAvailable = async () => {
  try {
    const res = await db.Fees.findAll({
      where: { ishidden: 0 },
      include: [
        {
          model: db.Paymenthistories,
          where: { ishidden: 0 },
          attributes: [],
        },
      ],
      attributes: [
        [
          db.Sequelize.literal(
            `SUM(CASE WHEN Paymenthistories.paymentstatus_id = 1 THEN Paymenthistories.amount ELSE 0 END)`
          ),
          "paidAmount",
        ],
      ],
    });
    if (res) {
      return { status: 200, code: 0, message: "Success", data: res };
    } else {
      return { status: 500, code: 1, message: "Fail", data: [] };
    }
  } catch (error) {
    return { status: 500, code: -1, message: error.message, data: [] };
  }
};
module.exports = {
  getAllFee,
  getFeeById,
  createFee,
  updateFee,
  getStudentsOfFee,
  deleteUsersOfFee,
  getStudentNotInFee,
  addUsersToFee,
  countFeeAvailable,
  amountOfFees,
  getFeeBySchoolyearGrade,
  amountOfFee,
  amountOfFeesAvailable,
};
