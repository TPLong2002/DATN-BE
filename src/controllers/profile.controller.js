import profileService from "../services/profile.service";
const getProfileByUserId = async (req, res) => {
  try {
    if (req.query.id == req.user.id || req.user.role == "admin") {
      var response = await profileService.getProfileByUserId(req.query.id);
      return res.status(response.status).json({
        code: response.code,
        message: response.message,
        data: response.data,
      });
    } else {
      return res
        .status(403)
        .json({ message: "You don't have permission to access this resource" });
    }
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
const updateProfileByUserId = async (req, res) => {
  try {
    var response = await profileService.updateProfileByUserId(req.body);
    return res.status(response.status).json({
      code: response.code,
      message: response.message,
      data: response.data,
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
const getRelativesByUserId = async (req, res) => {
  try {
    var response = await profileService.getRelativesByUserId(req.query.id);
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
  getProfileByUserId,
  updateProfileByUserId,
  getRelativesByUserId,
};
