import userServices from "../services/user.service";

const getAllUsers = async (req, res) => {
  try {
    var response = await userServices.getAllUsers();
    return res.status(response.status).json({
      code: response.code,
      message: response.message,
      data: response.data,
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
const getUsers = async (req, res) => {
  try {
    if (req.query.group_id) {
      var response = await userServices.getUsersByGroupId(
        req.query.limit,
        req.query.page,
        req.query.group_id,
        req.query.isdeleted,
        req.query.search,
        req.query.schoolyear_id
      );
      return res.status(response.status).json({
        code: response.code,
        message: response.message,
        data: response.data,
      });
    } else {
      var response = await userServices.getUsers(
        req.query.limit,
        req.query.page,
        req.query.isdeleted,
        req.query.search,
        req.query.schoolyear_id
      );
      return res.status(response.status).json({
        code: response.code,
        message: response.message,
        data: response.data,
      });
    }
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
const getUsersDelete = async (req, res) => {
  try {
    var response = await userServices.getUsersDelete();
    return res.status(response.status).json({
      code: response.code,
      message: response.message,
      data: response.data,
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
const getUsersLock = async (req, res) => {
  try {
    var response = await userServices.getUsersLock();
    return res.status(response.status).json({
      code: response.code,
      message: response.message,
      data: response.data,
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
const createUser = async (req, res) => {
  try {
    var response = await userServices.createUser(req.body);
    return res.status(response.status).json({
      code: response.code,
      message: response.message,
      data: response.data,
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
const updateUser = async (req, res) => {
  try {
    var response = await userServices.updateUser(req.body);
    return res.status(response.status).json({
      code: response.code,
      message: response.message,
      data: response.data,
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
const delUser = async (req, res) => {
  try {
    var response = await userServices.delUser(req.body);
    return res.status(response.status).json({
      code: response.code,
      message: response.message,
      data: response.data,
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
const recoverUser = async (req, res) => {
  try {
    var response = await userServices.recoverUser(req.body);
    return res.status(response.status).json({
      code: response.code,
      message: response.message,
      data: response.data,
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
const lockUser = async (req, res) => {
  try {
    var response = await userServices.lockUser(req.body);
    return res.status(response.status).json({
      code: response.code,
      message: response.message,
      data: response.data,
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
const unlockUser = async (req, res) => {
  try {
    var response = await userServices.unlockUser(req.body);
    return res.status(response.status).json({
      code: response.code,
      message: response.message,
      data: response.data,
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
const countUsersOfGroup = async (req, res) => {
  try {
    var response = await userServices.countUsersOfGroup(req.query.group_id);
    return res.status(response.status).json({
      code: response.code,
      message: response.message,
      data: response.data,
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getAllUsers,
  createUser,
  updateUser,
  delUser,
  recoverUser,
  getUsers,
  getUsersDelete,
  getUsersLock,
  lockUser,
  unlockUser,
  countUsersOfGroup,
};
