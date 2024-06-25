import schoolyearService from "../services/schoolyear.service";
const getAllSchoolyear = async (req, res) => {
  try {
    const response = await schoolyearService.getAllSchoolyear();
    return res.status(response.status).json(response);
  } catch (error) {
    return res
      .status(500)
      .send({ status: 500, code: -1, message: error.message, data: "" });
  }
};
const createSchoolyear = async (req, res) => {
  try {
    const response = await schoolyearService.createSchoolyear(req.body);
    return res.status(response.status).json(response);
  } catch (error) {
    return res
      .status(500)
      .send({ status: 500, code: -1, message: error.message, data: "" });
  }
};
module.exports = { getAllSchoolyear, createSchoolyear };
