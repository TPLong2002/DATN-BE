import studentService from "../services/student.service";
const getAllAssignmentsByStudentId = async (req, res) => {
  try {
    const response = await studentService.getAllAssignmentsByStudentId(
      req.query.student_id,
      req.query.limit,
      req.query.page
    );
    return res.status(response.status).send(response);
  } catch (error) {
    return res.status(500).send(error.message);
  }
};
const getStudentBySchoolyear = async (req, res) => {
  try {
    const schoolyear = req.query.schoolyear_id;
    const response = await studentService.getStudentBySchoolyear(schoolyear);
    return res.status(response.status).send(response);
  } catch (error) {
    return res.status(500).send(error.message);
  }
};
const getAssignmentById = async (req, res) => {
  try {
    const response = await studentService.getAssignmentById(req.query.id);
    return res.status(response.status).send(response);
  } catch (error) {
    return res.status(500).send(error.message);
  }
};
module.exports = {
  getAllAssignmentsByStudentId,
  getStudentBySchoolyear,
  getAssignmentById,
};
