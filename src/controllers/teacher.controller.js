import teacherService from "../services/teacher.service";
const getClassSubjectByTeacherId = async (req, res) => {
  try {
    const response = await teacherService.getClassSubjectByTeacherId(
      req.query.id
    );
    return res.status(response.status).send(response);
  } catch (error) {
    return res.status(500).send(error.message);
  }
};
const getSubjectByTeacherId = async (req, res) => {
  try {
    const response = await teacherService.getSubjectByTeacherId(req.query.id);
    return res.status(response.status).send(response);
  } catch (error) {
    return res.status(500).send(error.message);
  }
};
const registerSubject = async (req, res) => {
  try {
    const response = await teacherService.registerSubject(req.body);
    return res.status(response.status).send(response);
  } catch (error) {
    return res.status(500).send(error.message);
  }
};
module.exports = {
  getClassSubjectByTeacherId,
  getSubjectByTeacherId,
  registerSubject,
};
