import subjectService from "../services/subject.service";
const getAllSubjects = async (req, res) => {
  try {
    const response = await subjectService.getAllSubjects();
    res.status(response.status).send(response);
  } catch (error) {
    res
      .status(500)
      .send({ status: 500, code: -1, message: error.message, data: "" });
  }
};
const getSubjects = async (req, res) => {
  try {
    const response = await subjectService.getSubjects();
    res.status(response.status).send(response);
  } catch (error) {
    res
      .status(500)
      .send({ status: 500, code: -1, message: error.message, data: "" });
  }
};
const updateSubject = async (req, res) => {
  try {
    const response = await subjectService.updateSubject(req.body);
    res.status(response.status).send(response);
  } catch (error) {
    res
      .status(500)
      .send({ status: 500, code: -1, message: error.message, data: "" });
  }
};
const createSubject = async (req, res) => {
  try {
    const response = await subjectService.createSubject(req.body);
    res.status(response.status).send(response);
  } catch (error) {
    res
      .status(500)
      .send({ status: 500, code: -1, message: error.message, data: "" });
  }
};
const deleteSubject = async (req, res) => {
  try {
    const response = await subjectService.deleteSubject(req.body);
    res.status(response.status).send(response);
  } catch (error) {
    res
      .status(500)
      .send({ status: 500, code: -1, message: error.message, data: "" });
  }
};
module.exports = {
  getAllSubjects,
  updateSubject,
  createSubject,
  deleteSubject,
  getSubjects,
};
