import db from "../models";
const getPaymentHistory = async (data) => {
  try {
    const fee = await db.Fees.findOne({
      where: {
        id: data.fee_id,
      },
      raw: true,
      nest: true,
    });
    if (!fee) {
      return { status: 404, code: 1, message: "Fee not found", data: "" };
    }

    const amount = fee.price;
    const [history, created] = await db.Paymenthistories.findOrCreate({
      where: {
        student_id: data.student_id,
        parent_id: data.parent_id,
        fee_id: data.fee_id,
        ishidden: 0,
      },
      defaults: {
        student_id: data.student_id,
        parent_id: data.parent_id,
        fee_id: data.fee_id,
        amount: amount,
      },
      include: [
        {
          model: db.Paymentstatuses,
          attributes: ["id", "code", "description"],
        },
      ],
    });

    if (created) {
      return {
        status: 200,
        code: 0,
        message: "success",
        data: history,
      };
    } else {
      return {
        status: 200,
        code: 1,
        message: "Payment history already exists",
        data: history,
      };
    }
  } catch (error) {
    return { status: 500, code: -1, message: error.message, data: "" };
  }
};

const getAllAmountByYear = async (sort = "ASC") => {
  try {
    const result = await db.Schoolyears.findAll({
      include: [
        {
          model: db.Fees,
          include: [
            {
              model: db.Paymenthistories,
              include: [
                {
                  model: db.Paymentstatuses,
                  where: { code: 0 },
                },
              ],
            },
          ],
        },
      ],
      order: [["name", sort]],
    });

    if (result) {
      return {
        status: 200,
        code: 0,
        message: "success",
        data: result,
      };
    } else {
      return {
        status: 404,
        code: 1,
        message: "School year not found",
        data: "",
      };
    }
  } catch (error) {
    return { status: 500, code: -1, message: error.message, data: "" };
  }
};

module.exports = { getPaymentHistory, getAllAmountByYear };
