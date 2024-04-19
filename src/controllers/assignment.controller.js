import e from "express";
import assignmentService from "../services/assignment.service";
const getAssignment = async (req, res) => {
  try {
    if (req.query.id) {
      const response = await assignmentService.getAssignmentById(req.query.id);
      return res.status(response.status).json(response);
    } else {
      const response = await assignmentService.getAssignments();
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
module.exports = {
  getAssignment,
  createAssignment,
  updateAssignment,
  getAllAssignments,
  getAssignmentByUserId,
  getAssignmentClass,
};
