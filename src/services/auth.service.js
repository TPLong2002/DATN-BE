import db from "../models";
import bcrypt from "bcryptjs";
import generator from "generate-password";
import sendEmail from "./email.service";

import JWTmdw from "../middleware/JWTmdw";

const salt = bcrypt.genSaltSync(10);

const hashPassword = (password) => {
  let hashPassword = bcrypt.hashSync(password, salt);
  return hashPassword;
};

const register = async (data) => {
  try {
    const user = await db.User.bulkCreate(
      data.map((item) => ({ ...item, password: hashPassword(item.password) }))
    );
    if (user) {
      return { status: 200, message: "register success", code: 0, data: {} };
    }
  } catch (error) {
    return { status: 500, message: "Server Error", code: -1, data: {} };
  }
};

const checkPassword = (Password, hashPassword) => {
  return bcrypt.compareSync(Password, hashPassword);
};

const login = async (data) => {
  try {
    const user = await db.Users.findOne({
      where: {
        username: data.username,
      },
      include: [
        { model: db.Profiles },
        {
          model: db.Groups,
          as: "Group",
        },
      ],

      raw: true,
      nest: true,
    });

    if (user) {
      if (checkPassword(data.password, user.password)) {
        const payload = {
          email: user.email,
          username: user.username,
          group_id: user.group_id,
          role: user.Group.name,
          id: user.id,
          name: user.Profile.firstName + " " + user.Profile.lastName,
        };
        const token = await JWTmdw.createToken(payload);

        return {
          status: 200,
          message: "login success",
          code: 0,
          data: {
            email: user.email,
            username: user.username,
            id: user.id,
            access_token: token,
            group_id: user.group_id,
            role: user.Group.name,
            name: user.Profile.firstName + " " + user.Profile.lastName,
          },
        };
      }
    }
    return {
      status: 400,
      message: "Username or Password is wrong",
      code: 3,
      data: {},
    };
  } catch (error) {
    return { status: 500, message: "Server Error", code: -1, data: {} };
  }
};
const changePassword = async (data) => {
  try {
    const check = await db.Users.findOne({
      where: {
        username: data.username,
      },
      raw: true,
      nest: true,
    });
    if (!check) {
      return {
        status: 200,
        message: "Username is not exist",
        code: 3,
        data: {},
      };
    }
    if (!checkPassword(data.oldPassword, check.password)) {
      return {
        status: 200,
        message: "Old password is wrong",
        code: 3,
        data: {},
      };
    }
    const user = await db.Users.update(
      {
        password: hashPassword(data.password),
      },
      {
        where: {
          username: data.username,
        },
      }
    );
    if (user) {
      return {
        status: 200,
        message: "change password success",
        code: 0,
        data: {},
      };
    }
  } catch (error) {
    return { status: 500, message: error.message, code: -1, data: {} };
  }
};
const forgotPassword = async (data) => {
  try {
    const result = await db.sequelize.transaction(async (t) => {
      console.log(data);

      const user = await db.Users.findOne({
        where: {
          email: data.email,
        },
        raw: true,
        nest: true,
        transaction: t,
      });

      if (!user) {
        return {
          status: 200,
          message: "Email không tồn tại trong hệ thống",
          code: 3,
          data: {},
        };
      }

      const passcode = generator.generate({
        length: 10,
        numbers: true,
      });

      const hashedPassword = hashPassword(passcode);

      const [updateCount] = await db.Users.update(
        {
          password: hashedPassword,
        },
        {
          where: {
            email: data.email,
          },
          transaction: t,
        }
      );

      if (updateCount === 0) {
        throw new Error("Failed to update password");
      }

      const subject = "Cấp lại mật khẩu";
      const text = `Mật khẩu mới là: ${passcode}`;
      const emailSent = await sendEmail(data.email, subject, text);

      if (!emailSent) {
        throw new Error("Failed to send email");
      }

      return {
        status: 200,
        message: "Cấp lại mât khẩu thành công, vui lòng kiểm tra email",
        code: 0,
        data: {},
      };
    });

    return result;
  } catch (error) {
    console.error(error);
    return { status: 500, message: error.message, code: -1, data: {} };
  }
};
module.exports = { register, login, changePassword, forgotPassword };
