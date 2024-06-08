import paymentService from "../services/paymenthistory.service";
const getPaymentHistory = async (req, res) => {
  try {
    const response = await paymentService.getPaymentHistory(req.body);
    return res.status(response.status).json(response);
  } catch (error) {
    return res.status(500).json({ message: error.message, code: -1, data: "" });
  }
};
const getAllAmountByYear = async (req, res) => {
  try {
    const response = await paymentService.getAllAmountByYear(req.query.sort);
    return res.status(response.status).json(response);
  } catch (error) {
    return res.status(500).json({ message: error.message, code: -1, data: "" });
  }
};
module.exports = { getPaymentHistory, getAllAmountByYear };
