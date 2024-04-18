import semesterService from "../services/semester.service";
const getSemester = async (req, res) => {
  try {
    if (req.query.id) {
      const semester = await semesterService.getSemesterById(req.query.id);
      return res.status(semester.status).json(semester);
    } else {
      const semester = await semesterService.getAllSemester();
      return res.status(semester.status).json(semester);
    }
  } catch (error) {
    return res
      .status(500)
      .json({ status: 500, code: -1, message: error.message, data: "" });
  }
};
module.exports = { getSemester };
