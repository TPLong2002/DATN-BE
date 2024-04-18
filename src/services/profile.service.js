import db from "../models";
const getProfileByUserId = async (userId) => {
  try {
    const profile = await db.Profiles.findOne({
      where: { user_id: userId },
    });
    return { status: 200, code: 0, message: "success", data: profile };
  } catch (error) {
    return { status: 500, code: -1, message: error.message, data: "" };
  }
};
const updateProfileByUserId = async (data) => {
  try {
    const profile = await db.Profiles.update(data, {
      where: { user_id: data.id },
    });
    return { status: 200, code: 0, message: "success", data: profile };
  } catch (error) {
    return { status: 500, code: -1, message: error.message, data: "" };
  }
};
module.exports = { getProfileByUserId, updateProfileByUserId };
