import profileService from "../services/profile.service";
const getProfileByUserId = async (req, res) => {
  try {
    var response = await profileService.getProfileByUserId(req.query.id);
    return res.status(response.status).json({
      code: response.code,
      message: response.message,
      data: response.data,
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
module.exports = { getProfileByUserId };
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
module.exports = { getProfileByUserId, updateProfileByUserId };
