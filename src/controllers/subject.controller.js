import subjectService from "../services/subject.service";
const getAllSubjects = async (req, res) => {
  try {
    if (req.query.id) {
      const response = await subjectService.getSubjectById(req.query.id);
      res.status(response.status).send(response);
    } else {
      const response = await subjectService.getAllSubjects();
      res.status(response.status).send(response);
    }
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
const hiddenSubject = async (req, res) => {
  try {
    const response = await subjectService.hiddenSubject(req.body);
    res.status(response.status).send(response);
  } catch (error) {
    res
      .status(500)
      .send({ status: 500, code: -1, message: error.message, data: "" });
  }
};
const getSubjectByGradeId = async (req, res) => {
  try {
    if (req.query.grade_id) {
      const response = await subjectService.getSubjectByGradeId(
        req.query.grade_id
      );
      res.status(response.status).send(response);
    } else {
      const response = await subjectService.getAllSubjects();
      res.status(response.status).send(response);
    }
  } catch (error) {
    res
      .status(500)
      .send({ status: 500, code: -1, message: error.message, data: "" });
  }
};
const getSubjectByClassId = async (req, res) => {
  try {
    const response = await subjectService.getSubjectByClassId(
      req.query.class_id,
      req.query.schoolyear_id
    );
    res.status(response.status).send(response);
  } catch (error) {
    res
      .status(500)
      .send({ status: 500, code: -1, message: error.message, data: "" });
  }
};
const getSubjectByGradeIdNotInClass = async (req, res) => {
  try {
    const response = await subjectService.getSubjectByGradeIdNotInClass(
      req.query.grade_id,
      req.query.class_id
    );
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
  hiddenSubject,
  getSubjects,
  getSubjectByGradeId,
  getSubjectByClassId,
  getSubjectByGradeIdNotInClass,
};
