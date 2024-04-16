import userServices from "../services/user.service";
const getAllUsers = async (req, res) => {
  try {
    response = await userServices.getAllUsers();
    return res.status(response.status).json({
      code: response.code,
      message: response.message,
      data: response.data,
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
module.exports = { getAllUsers };
