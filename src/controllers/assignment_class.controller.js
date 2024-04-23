import assignment_classService from "../services/assignment_class.service";
const getAssignmentOfClass = async (req, res) => {
  try {
    const response = await assignment_classService.getAssignmentOfClass(
      req.query.id
    );
    return res.status(response.status).send(response);
  } catch (error) {
    return res.status(500).send(error.message);
  }
};
const addAssignment_Class = async (req, res) => {
  try {
    const response = await assignment_classService.addAssignment_Class(
      req.body
    );
    return res.status(response.status).send(response);
  } catch (error) {
    return res.status(500).send(error.message);
  }
};
const updateAssignment_Class = async (req, res) => {
  try {
    const response = await assignment_classService.updateAssignment_Class(
      req.body
    );
    return res.status(response.status).send(response);
  } catch (error) {
    return res.status(500).send(error.message);
  }
};
const hideAssignment_Class = async (req, res) => {
  try {
    const response = await assignment_classService.hideAssignment_Class(
      req.query.id
    );
    return res.status(response.status).send(response);
  } catch (error) {
    return res.status(500).send(error.message);
  }
};
const getAssingment_Classes = async (req, res) => {
  try {
    const response = await assignment_classService.getAssingment_Classes();
    return res.status(response.status).send(response);
  } catch (error) {
    return res.status(500).send(error.message);
  }
};
module.exports = {
  getAssignmentOfClass,
  addAssignment_Class,
  hideAssignment_Class,
  updateAssignment_Class,
  getAssingment_Classes,
};
