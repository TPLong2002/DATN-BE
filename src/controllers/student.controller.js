import studentService from "../services/student.service";
const getAllAssignmentsByStudentId = async (req, res) => {
  try {
    const studentId = req.query.id;
    const response = await studentService.getAllAssignmentsByStudentId(
      studentId
    );
    return res.status(response.status).send(response);
  } catch (error) {
    return res.status(500).send(error.message);
  }
};
const getStudentBySchoolyear = async (req, res) => {
  try {
    const schoolyear = req.query.schoolyear;
    const response = await studentService.getStudentBySchoolyear(schoolyear);
    return res.status(response.status).send(response);
  } catch (error) {
    return res.status(500).send(error.message);
  }
};
module.exports = { getAllAssignmentsByStudentId, getStudentBySchoolyear };
