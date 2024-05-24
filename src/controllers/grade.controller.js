import gradeService from "../services/grade.service";
const getAllGrade = async (req, res) => {
  try {
    const response = await gradeService.getAllGrade();
    return res.status(response.status).json(response);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};
module.exports = { getAllGrade };
