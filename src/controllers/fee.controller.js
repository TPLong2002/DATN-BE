import feeService from "../services/fee.service";
const getAllFee = async (req, res) => {
  try {
    if (req.query.id) {
      const fees = await feeService.getFeeById(req.query.id);
      res.status(200).json(fees);
    } else {
      const fees = await feeService.getAllFee();
      res.status(200).json(fees);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const createFee = async (req, res) => {
  try {
    const fees = await feeService.createFee(req.body);
    res.status(200).json(fees);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const updateFee = async (req, res) => {
  try {
    const fees = await feeService.updateFee(req.body);
    res.status(200).json(fees);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
module.exports = { getAllFee, createFee, updateFee };
