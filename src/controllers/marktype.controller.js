import marktypeService from "../services/marktype.service";
const getAllMarkType = async (req, res) => {
  try {
    if (req.query.id) {
      const response = await marktypeService.getMarkTypeById(req.query.id);
      return res.status(response.status).json(response);
    } else {
      const response = await marktypeService.getAllMarkType();
      return res.status(response.status).json(response);
    }
  } catch (error) {
    res
      .status(500)
      .json({ status: 500, code: -1, message: error.message, data: "" });
  }
};
const updateMarkType = async (req, res) => {
  try {
    const response = await marktypeService.updateMarkType(req.body);
    return res.status(response.status).json(response);
  } catch (error) {
    res
      .status(500)
      .json({ status: 500, code: -1, message: error.message, data: "" });
  }
};
module.exports = { getAllMarkType, updateMarkType };
