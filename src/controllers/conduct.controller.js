import conductService from "../services/conduct.service";
const getConduct = async (req, res) => {
  try {
    if (req.query.id) {
      const response = await conductService.getConductById(req.query.id);
      res.status(response.status).json(response);
      return;
    } else {
      const response = await conductService.getAllConduct();
      res.status(response.status).json(response);
    }
  } catch (error) {
    res
      .status(500)
      .json({ status: 500, code: -1, message: error.message, data: "" });
  }
};
const updateConduct = async (req, res) => {
  try {
    const response = await conductService.updateConduct(req.body);
    res.status(response.status).json(response);
  } catch (error) {
    res
      .status(500)
      .json({ status: 500, code: -1, message: error.message, data: "" });
  }
};
const createConduct = async (req, res) => {
  try {
    const response = await conductService.createConduct(req.body);
    res.status(response.status).json(response);
  } catch (error) {
    res
      .status(500)
      .json({ status: 500, code: -1, message: error.message, data: "" });
  }
};
module.exports = { getConduct, updateConduct, createConduct };
