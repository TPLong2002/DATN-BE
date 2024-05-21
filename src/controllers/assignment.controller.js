import assignmentService from "../services/assignment.service";
const getAssignment = async (req, res) => {
  try {
    if (req.query.id) {
      const response = await assignmentService.getAssignmentById(req.query.id);
      return res.status(response.status).json(response);
    } else {
      const response = await assignmentService.getAssignments(
        req.query.limit,
        req.query.page
      );
      return res.status(response.status).json(response);
    }
  } catch (error) {
    return res
      .status(500)
      .send({ status: 500, code: -1, message: error.message, data: "" });
  }
};
const getAllAssignments = async (req, res) => {
  try {
    const response = await assignmentService.getAllAssignments();
    return res.status(response.status).json(response);
  } catch (error) {
    return res
      .status(500)
      .send({ status: 500, code: -1, message: error.message, data: "" });
  }
};
const createAssignment = async (req, res) => {
  try {
    const response = await assignmentService.createAssignment(req.body);
    return res.status(response.status).json(response);
  } catch (error) {
    return res
      .status(500)
      .send({ status: 500, code: -1, message: error.message, data: "" });
  }
};
const updateAssignment = async (req, res) => {
  try {
    const response = await assignmentService.updateAssignment(req.body);
    return res.status(response.status).json(response);
  } catch (error) {
    return res
      .status(500)
      .send({ status: 500, code: -1, message: error.message, data: "" });
  }
};
const getAssignmentByUserId = async (req, res) => {
  try {
    const response = await assignmentService.getAssignmentByUserId(
      req.query.id
    );
    return res.status(response.status).json(response);
  } catch (error) {
    return res
      .status(500)
      .send({ status: 500, code: -1, message: error.message, data: "" });
  }
};
const getAssignmentClass = async (req, res) => {
  try {
    const response = await assignmentService.getAssignmentClass(req.query.id);
    return res.status(response.status).json(response);
  } catch (error) {
    return res
      .status(500)
      .send({ status: 500, code: -1, message: error.message, data: "" });
  }
};
const getAssignmentByClassId = async (req, res) => {
  try {
    const response = await assignmentService.getAssignmentByClassId(
      req.query.id
    );
    return res.status(response.status).json(response);
  } catch (error) {
    return res
      .status(500)
      .send({ status: 500, code: -1, message: error.message, data: "" });
  }
};
const getAssignmentOfSubjectByClassId = async (req, res) => {
  try {
    const response = await assignmentService.getAssignmentOfSubjectByClassId(
      req.query.class_id,
      req.query.subject_id
    );
    if (response) {
      return res.status(response.status).json(response);
    } else {
      return res
        .status(500)
        .send({ status: 500, code: 1, message: "fail", data: "" });
    }
  } catch (error) {
    return res
      .status(500)
      .send({ status: 500, code: -1, message: error.message, data: "" });
  }
};
const getClassesNotInAssignmentOfTeacher = async (req, res) => {
  try {
    const response = await assignmentService.getClassesNotInAssignmentOfTeacher(
      req.query.teacher_id,
      req.query.subject_id,
      req.query.assignment_id
    );
    return res.status(response.status).json(response);
  } catch (error) {
    return res
      .status(500)
      .send({ status: 500, code: -1, message: error.message, data: "" });
  }
};
module.exports = {
  getAssignment,
  createAssignment,
  updateAssignment,
  getAllAssignments,
  getAssignmentByUserId,
  getAssignmentClass,
  getAssignmentByClassId,
  getAssignmentOfSubjectByClassId,
  getClassesNotInAssignmentOfTeacher,
};
