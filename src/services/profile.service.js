import db from "../models";
const getProfileByUserId = async (userId) => {
  try {
    const [profile, created] = await db.Profiles.findOrCreate({
      where: { user_id: userId },
      defaults: {
        user_id: userId,
        phoneNumber: "Thêm số điện thoại",
        firstName: "Thêm tên",
        lastName: "Thêm họ",
        avt: "",
        address: "Thêm địa chỉ",
        dateOfBirth: "Thêm ngày tháng năm sinh",
      },
    });
    if (created) {
      return {
        status: 200,
        code: 0,
        message: "created success",
        data: profile,
      };
    } else {
      if (profile) {
        return { status: 200, code: 0, message: "success", data: profile };
      } else return { status: 500, code: 1, message: "fail", data: "" };
    }
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
