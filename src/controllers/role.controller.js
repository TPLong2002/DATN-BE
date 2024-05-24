import roleService from "../services/role.service";
const getRoles = async (req, res) => {
  try {
    const data = await roleService.getRoles();
    res
      .status(data.status)
      .json({ code: data.code, message: data.message, data: data.data });
  } catch (error) {
    return res.status(500).json({ message: error.message, code: -1, data: "" });
  }
};
const addRoles = async (req, res) => {
  try {
    const data = await roleService.addRoles(req.body);
    res
      .status(data.status)
      .json({ code: data.code, message: data.message, data: data.data });
  } catch (error) {
    return res.status(500).json({ message: error.message, code: -1, data: "" });
  }
};
const delRoles = async (req, res) => {
  try {
    const data = await roleService.delRoles(req.body);
    res
      .status(data.status)
      .json({ code: data.code, message: data.message, data: data.data });
  } catch (error) {
    return res.status(500).json({ message: error.message, code: -1, data: "" });
  }
};
const getRolesByGroup = async (req, res) => {
  try {
    const data = await roleService.getRolesByGroup(req.query.id);
    res
      .status(data.status)
      .json({ code: data.code, message: data.message, data: data.data });
  } catch (error) {
    return res.status(500).json({ message: error.message, code: -1, data: "" });
  }
};

module.exports = { getRoles, addRoles, delRoles, getRolesByGroup };
