import studentService from "../services/student.service";
import parent_studentServices from "../services/parent_student.service";

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
const countStudentByGrade = async (req, res) => {
  try {
    const response = await studentService.countStudentByGrade();
    return res.status(response.status).send(response);
  } catch (error) {
    return res.status(500).send(error.message);
  }
};
const countStudentBySchoolyear = async (req, res) => {
  try {
    const response = await studentService.countStudentBySchoolyear();
    return res.status(response.status).send(response);
  } catch (error) {
    return res.status(500).send(error.message);
  }
};
const getFeesByStudentId = async (req, res) => {
  try {
    const response = await studentService.getFeesByStudentId(
      req.query.student_id
    );
    return res.status(response.status).send(response);
  } catch (error) {
    return res.status(500).send(error.message);
  }
};
const getStudentAndParents = async (req, res) => {
  try {
    const response = await studentService.getStudentAndParents(
      req.query.limit,
      req.query.page,
      req.query.search,
      req.query.schoolyear_id
    );
    return res.status(response.status).send(response);
  } catch (error) {
    return res.status(500).send(error.message);
  }
};
const getStudentBySchoolyearId = async (req, res) => {
  try {
    const response = await studentService.getStudentBySchoolyearId(
      req.query.schoolyear_id
    );
    return res.status(response.status).send(response);
  } catch (error) {
    return res.status(500).send(error.message);
  }
};
const addRetation = async (req, res) => {
  try {
    const response = await parent_studentServices.addRetation(req.body);
    console.log(response);
    return res.status(response.status).json({
      code: response.code,
      message: response.message,
      data: response.data,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
const deleteRetation = async (req, res) => {
  try {
    const response = await parent_studentServices.deleteRetation(req.query.id);
    return res.status(response.status).json({
      code: response.code,
      message: response.message,
      data: response.data,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
module.exports = {
  getAllAssignmentsByStudentId,
  getStudentBySchoolyear,
  getAssignmentById,
  countStudentByGrade,
  countStudentBySchoolyear,
  getFeesByStudentId,
  getStudentAndParents,
  getStudentBySchoolyearId,
  addRetation,
  deleteRetation,
};
