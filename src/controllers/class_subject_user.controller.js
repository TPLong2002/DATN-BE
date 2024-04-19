import class_subject_userService from "../services/class_subject_user.service";
const getClassSubjectUser = async (req, res) => {
  try {
    if (req.query.id) {
      const response = await class_subject_userService.getClassSubjectUserById(
        req.query.id
      );
      return res.status(response.status).json(response);
    } else {
      const response = await class_subject_userService.getClassSubjectUsers();
      return res.status(response.status).json(response);
    }
  } catch (error) {
    return res.status(500).json({ code: -1, message: error.message, data: "" });
  }
};
const createClassSubjectUser = async (req, res) => {
  try {
    const response = await class_subject_userService.createClassSubjectUser(
      req.body
    );
    return res.status(response.status).json(response);
  } catch (error) {
    return res.status(500).json({ code: -1, message: error.message, data: "" });
  }
};
const updateClassSubjectUser = async (req, res) => {
  try {
    const response = await class_subject_userService.updateClassSubjectUser(
      req.body
    );
    return res.status(response.status).json(response);
  } catch (error) {
    return res.status(500).json({ code: -1, message: error.message, data: "" });
  }
};
module.exports = {
  getClassSubjectUser,
  createClassSubjectUser,
  updateClassSubjectUser,
};
