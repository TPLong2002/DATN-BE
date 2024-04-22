import userFeeService from "../services/userFee.service";
const getUserFee = async (req, res) => {
  try {
    if (req.query.id) {
      const response = await userFeeService.getUserFee(req.params.userId);
      return res.status(response.status).json(response);
    } else {
      const response = await userFeeService.getUserFees();
      return res.status(response.status).json(response);
    }
  } catch (error) {
    return res
      .status(500)
      .json({ status: 500, code: -1, message: error.message, data: null });
  }
};
const createUserFee = async (req, res) => {
  try {
    const response = await userFeeService.createUserFee(req.body);
    return res.status(response.status).json(response);
  } catch (error) {
    return res
      .status(500)
      .json({ status: 500, code: -1, message: error.message, data: null });
  }
};
const updateUserFee = async (req, res) => {
  try {
    const response = await userFeeService.updateUserFee(req.body);
    return res.status(response.status).json(response);
  } catch (error) {
    return res
      .status(500)
      .json({ status: 500, code: -1, message: error.message, data: null });
  }
};
module.exports = { getUserFee, createUserFee, updateUserFee };
