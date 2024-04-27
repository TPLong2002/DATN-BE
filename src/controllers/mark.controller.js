import markService from "../services/mark.service";
const getMarksByStudentId = async (req, res) => {
  try {
    const response = await markService.getMarksByStudentId(req.query.studentId);
    return res.status(response.status).json({
      code: response.code,
      message: response.message,
      data: response.data,
    });
  } catch (error) {
    return res.status(500).json({ code: -1, error: error.message, data: null });
  }
};
module.exports = { getMarksByStudentId };
