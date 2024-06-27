import feeService from "../services/fee.service";
const getAllFee = async (req, res) => {
  try {
    if (req.query.id) {
      const fees = await feeService.getFeeById(req.query.id);
      res.status(200).json(fees);
    } else {
      const fees = await feeService.getAllFee(
        req.query.limit,
        req.query.page,
        req.query.schoolyear_id,
        req.query.semester_id,
        req.query.grade_id
      );
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
const getStudentsOfFee = async (req, res) => {
  try {
    const students = await feeService.getStudentsOfFee(
      req.query.fee_id,
      req.query.page,
      req.query.limit
    );
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const deleteUsersOfFee = async (req, res) => {
  try {
    const students = await feeService.deleteUsersOfFee(req.body);
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const getStudentNotInFee = async (req, res) => {
  try {
    const response = await feeService.getStudentNotInFee(
      req.query.fee_id,
      req.query.schoolyear_id
    );
    return res.status(response.status).send(response);
  } catch (error) {
    return res.status(500).send(error.message);
  }
};
const addUsersToFee = async (req, res) => {
  try {
    const response = await feeService.addUsersToFee(req.body);
    return res.status(response.status).send(response);
  } catch (error) {
    return res.status(500).send(error.message);
  }
};
const countFeeAvailable = async (req, res) => {
  try {
    const response = await feeService.countFeeAvailable();
    return res.status(response.status).send(response);
  } catch (error) {
    return res.status(500).send(error.message);
  }
};
const amountOfFees = async (req, res) => {
  try {
    const response = await feeService.amountOfFees();
    return res.status(response.status).send(response);
  } catch (error) {
    return res.status(500).send(error.message);
  }
};
const getFeeBySchoolyearGrade = async (req, res) => {
  try {
    const response = await feeService.getFeeBySchoolyearGrade(
      req.query.schoolyear_id,
      req.query.grade_id
    );
    return res.status(response.status).send(response);
  } catch (error) {
    return res.status(500).send(error.message);
  }
};
const amountOfFee = async (req, res) => {
  try {
    const response = await feeService.amountOfFee(req.query.fee_id);
    return res.status(response.status).send(response);
  } catch (error) {
    return res.status(500).send(error.message);
  }
};
const amountOfFeesAvailable = async (req, res) => {
  try {
    const response = await feeService.amountOfFeesAvailable();
    return res.status(response.status).send(response);
  } catch (error) {
    return res.status(500).send(error.message);
  }
};
module.exports = {
  getAllFee,
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
