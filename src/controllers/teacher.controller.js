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
const delSubjectOfTeacher = async (req, res) => {
  try {
    const response = await teacherService.delSubjectOfTeacher(req.body.id);
    return res.status(response.status).send(response);
  } catch (error) {
    return res.status(500).send(error.message);
  }
};
const getTeachers = async (req, res) => {
  try {
    const response = await teacherService.getTeachers();
    return res.status(response.status).send(response);
  } catch (error) {
    return res.status(500).send(error.message);
  }
};
const getTeacherWithoutGVCN = async (req, res) => {
  try {
    const response = await teacherService.getTeacherWithoutGVCN();
    return res.status(response.status).send(response);
  } catch (error) {
    return res.status(500).send(error.message);
  }
};
module.exports = {
  getClassSubjectByTeacherId,
  getSubjectByTeacherId,
  registerSubject,
  delSubjectOfTeacher,
  getTeachers,
  getTeacherWithoutGVCN,
};
