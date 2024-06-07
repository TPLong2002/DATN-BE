import paymentService from "../services/payment.service";

const create = async (req, res) => {
  try {
    const result = await paymentService.create(req.body);
    return res.status(result.status).json(result);
  } catch (error) {
    return res.status(500).json(error);
  }
};
const callback = async (req, res) => {
  try {
    const result = await paymentService.callback(req.body);
    return res.status(result.status).json(result);
  } catch (error) {
    return res.status(500).json(error);
  }
};
module.exports = { create, callback };
