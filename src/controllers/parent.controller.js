import parentService from "../services/parent.service";
const getFeesByParentId = async (req, res) => {
  try {
    const fees = await parentService.getFeesByParentId(req.query.id);
    res.status(200).send(fees);
  } catch (error) {
    res.status(500).send(error.message);
  }
};
const getFeesOfStudent = async (req, res) => {
  try {
    const fees = await parentService.getFeesOfStudent(req.body);
    res.status(200).send(fees);
  } catch (error) {
    res.status(500).send(error.message);
  }
};
const getStudentsByParentId = async (req, res) => {
  try {
    const students = await parentService.getStudentsByParentId(req.query.id);
    res.status(students.status).send(students);
  } catch (error) {
    res.status(500).send(error.message);
  }
};
const getMarksByStudentId = async (req, res) => {
  try {
    const response = await parentService.getMarksByStudentId(
      req.query.student_id,
      req.query.parent_id,
      req.query.semester_id,
      req.query.schoolyear_id
    );
    res.status(response.status).send(response);
  } catch (error) {
    res.status(500).send(error.message);
  }
};
const countStudentsByParentId = async (req, res) => {
  try {
    const students = await parentService.countStudentsByParentId(
      req.query.parent_id
    );
    res.status(200).send(students);
  } catch (error) {
    res.status(500).send(error.message);
  }
};
const countFeesByParentId = async (req, res) => {
  try {
    const fees = await parentService.countFeesByParentId(req.query.parent_id);
    res.status(200).send(fees);
  } catch (error) {
    res.status(500).send(error.message);
  }
};
const getFeesUnPaidByParentId = async (req, res) => {
  try {
    const fees = await parentService.getFeesUnPaidByParentId(
      req.query.parent_id
    );
    res.status(200).send(fees);
  } catch (error) {
    res.status(500).send(error.message);
  }
};
module.exports = {
  getFeesByParentId,
  getFeesOfStudent,
  getStudentsByParentId,
  getMarksByStudentId,
  countStudentsByParentId,
  countFeesByParentId,
  getFeesUnPaidByParentId,
};
