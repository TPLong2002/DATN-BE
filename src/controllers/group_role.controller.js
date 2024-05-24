import grouproleService from "../services/group_role.service";
const addGroupRole = async (req, res) => {
  try {
    var data = await grouproleService.addGroupRole(req.body);
    if (data) {
      res
        .status(data.status)
        .json({ code: data.code, message: data.message, data: data.data });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message, code: -1, data: "" });
  }
};
module.exports = { addGroupRole };
