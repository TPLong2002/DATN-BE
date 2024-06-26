import db from "../models";
import bcrypt from "bcryptjs";
const salt = bcrypt.genSaltSync(10);
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
      include: {
        model: db.Users,
        as: "User",
        attributes: ["id", "email", "password"],
      },
      raw: true,
      nest: true,
    });

    if (created) {
      return {
        status: 200,
        code: 0,
        message: "created success",
        data: [profile],
      };
    } else {
      if (profile) {
        const { User, ...profileData } = profile;
        return {
          status: 200,
          code: 0,
          message: "success",
          data: [
            {
              ...profileData,
              email: User.email,
              password: User.password,
            },
          ],
        };
      } else return { status: 500, code: 1, message: "fail", data: [] };
    }
  } catch (error) {
    return { status: 500, code: -1, message: error.message, data: "" };
  }
};
const hashPassword = (password) => {
  let hashPassword = bcrypt.hashSync(password, salt);
  return hashPassword;
};
const updateProfileByUserId = async (data) => {
  const t = await db.sequelize.transaction();
  try {
    const { email, id, ...defaultdata } = data;

    // Cập nhật mật khẩu trong bảng user
    if (data.newPassword) {
      const updatedUser = await db.Users.update(
        { password: hashPassword(data.newPassword) }, // Thay đổi password thành giá trị mới
        { where: { id: data.user_id }, transaction: t }
      );
    }

    // Cập nhật thông tin trong bảng profiles
    const [profile, created] = await db.Profiles.findOrCreate({
      where: { user_id: data.user_id },
      defaults: {
        phoneNumber: defaultdata.phoneNumber,
        firstName: defaultdata.firstName,
        lastName: defaultdata.lastName,
        avt: defaultdata.avt,
        address: defaultdata.address,
        dateOfBirth: defaultdata.dateOfBirth,
        CCCD: defaultdata.CCCD,
      },
      transaction: t,
    });

    if (!created && profile) {
      // Nếu profile tồn tại và không phải là lần đầu tạo mới, cập nhật thông tin
      await db.Profiles.update(
        {
          phoneNumber: defaultdata.phoneNumber,
          firstName: defaultdata.firstName,
          lastName: defaultdata.lastName,
          avt: defaultdata.avt,
          address: defaultdata.address,
          dateOfBirth: defaultdata.dateOfBirth,
          CCCD: defaultdata.CCCD,
        },
        { where: { user_id: data.user_id }, transaction: t }
      );
    }

    await t.commit(); // Commit giao dịch
    return {
      status: 200,
      code: 0,
      message: "success",
      data: profile,
    };
  } catch (error) {
    await t.rollback(); // Rollback giao dịch nếu có lỗi
    return { status: 500, code: -1, message: error.message, data: "" };
  }
};

const getRelativesByUserId = async (userId) => {
  try {
    const user = await db.Users.findOne({
      where: { id: userId },
      include: { model: db.Groups, as: "Group" },
      raw: true,
      nest: true,
    });

    let isRelative = null;
    if (user.Group.name === "parent") {
      isRelative = "User_Parents";
    } else if (user.Group.name === "student") {
      isRelative = "User_Students";
    }

    // Lấy danh sách relatives
    const res = await db.Users.findAll({
      where: { id: userId },
      include: [
        {
          as: isRelative,
          model: db.Users,
          include: {
            model: db.Profiles,
          },
          attributes: ["id", "email", "password"],
        },
      ],
      raw: true,
      nest: true,
    });

    if (res && res.length > 0) {
      const relatives = await Promise.all(
        res.map(async (parent) => {
          const [profile, created] = await db.Profiles.findOrCreate({
            where: { user_id: parent[isRelative].id },
            defaults: {
              firstname: "Default Firstname", // Điều chỉnh thông tin profile theo yêu cầu
              lastname: "Default Lastname",
            },
          });
          return {
            ...profile.get({ plain: true }),
            email: parent[isRelative].email,
            password: parent[isRelative].password,
            user_id: parent[isRelative].id,
          };
        })
      );

      return {
        status: 200,
        code: 0,
        message: "success",
        data: relatives,
      };
    } else {
      return { status: 500, code: 1, message: "fail", data: "" };
    }
  } catch (error) {
    return { status: 500, code: -1, message: error.message, data: "" };
  }
};

module.exports = {
  getProfileByUserId,
  updateProfileByUserId,
  getRelativesByUserId,
};
