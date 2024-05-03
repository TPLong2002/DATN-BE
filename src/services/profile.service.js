import db from "../models";
const getProfileByUserId = async (userId) => {
  try {
    const [profile, created] = await db.Profiles.findOrCreate({
      where: { user_id: userId },
      defaults: {
        user_id: userId,
        phoneNumber: "",
        firstName: "",
        lastName: "",
        avt: "",
        address: "",
        dateOfBirth: "",
        CCCD: "",
      },
      include: { model: db.Users, as: "User", attributes: ["id", "email"] },
      raw: true,
      nest: true,
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
        console.log(profile);
        return {
          status: 200,
          code: 0,
          message: "success",
          data: [{ ...profile, email: profile.User.email }],
        };
      } else return { status: 500, code: 1, message: "fail", data: [] };
    }
  } catch (error) {
    return { status: 500, code: -1, message: error.message, data: "" };
  }
};
const updateProfileByUserId = async (data) => {
  console.log(data);
  try {
    const profile = await db.Profiles.update(
      {
        phoneNumber: data.phoneNumber,
        firstName: data.firstName,
        lastName: data.lastName,
        avt: data.avt,
        address: data.address,
        dateOfBirth: data.dateOfBirth,
        CCCD: data.CCCD,
      },
      {
        where: { user_id: data.user_id },
      }
    );
    return { status: 200, code: 0, message: "success", data: profile };
  } catch (error) {
    return { status: 500, code: -1, message: error.message, data: "" };
  }
};
const getRelativesByUserId = async (userId) => {
  try {
    const res = await db.Users.findOne({
      where: { id: userId },
      include: [
        {
          as: "User_Parents",
          model: db.Users,
          include: {
            model: db.Profiles,
          },
        },
      ],
    });
    const relatives = res.User_Parents.map((parent) => {
      return parent.Profile;
    });
    console.log(relatives);
    if (relatives) {
      return {
        status: 200,
        code: 0,
        message: "success",
        data: relatives,
      };
    } else return { status: 500, code: 1, message: "fail", data: "" };
  } catch (error) {
    return { status: 500, code: -1, message: error.message, data: "" };
  }
};
module.exports = {
  getProfileByUserId,
  updateProfileByUserId,
  getRelativesByUserId,
};
