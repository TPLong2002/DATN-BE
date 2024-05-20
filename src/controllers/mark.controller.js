import markService from "../services/mark.service";
const getMarksByStudentId = async (req, res) => {
  try {
    const response = await markService.getMarksByStudentId(req.query.studentId);
    return res.status(response.status).json({
      code: response.code,
      message: response.message,
      data: response.data,
    });
  } catch (error) {
    return res.status(500).json({ code: -1, error: error.message, data: null });
  }
};
const createMark = async (req, res) => {
  try {
    const response = await markService.createMark(req.body);
    return res.status(response.status).json({
      code: response.code,
      message: response.message,
      data: response.data,
    });
  } catch (error) {
    return res.status(500).json({ code: -1, error: error.message, data: null });
  }
};
const updateMark = async (req, res) => {
  try {
    const response = await markService.updateMark(req.body);
    return res.status(response.status).json({
      code: response.code,
      message: response.message,
      data: response.data,
    });
  } catch (error) {
    return res.status(500).json({ code: -1, error: error.message, data: null });
  }
};
const deleteMark = async (req, res) => {
  try {
    const response = await markService.deleteMark(req.query.id);
    return res.status(response.status).json({
      code: response.code,
      message: response.message,
      data: response.data,
    });
  } catch (error) {
    return res.status(500).json({ code: -1, error: error.message, data: null });
  }
};
const getMatksOfStudentsInClass = async (req, res) => {
  try {
    const response = await markService.getMatksOfStudentsInClass(
      req.query.class_id,
      req.query.subject_id
    );
    return res.status(response.status).json({
      code: response.code,
      message: response.message,
      data: response.data,
    });
  } catch (error) {
    return res.status(500).json({ code: -1, error: error.message, data: null });
  }
};
const getMatksOfStudentInClassById = async (req, res) => {
  try {
    const response = await markService.getMatksOfStudentInClassById(
      req.query.class_id,
      req.query.subject_id,
      req.query.user_id
    );
    return res.status(response.status).json({
      code: response.code,
      message: response.message,
      data: response.data,
    });
  } catch (error) {
    return res.status(500).json({ code: -1, error: error.message, data: null });
  }
};
module.exports = {
  getMarksByStudentId,
  createMark,
  updateMark,
  deleteMark,
  getMatksOfStudentsInClass,
  getMatksOfStudentInClassById,
};
