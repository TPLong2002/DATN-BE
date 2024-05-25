import db from "../models";
import bcrypt from "bcryptjs";

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
      include: [{ model: db.Profiles }],
      raw: true,
      nest: true,
    });

    if (user) {
      if (checkPassword(data.password, user.password)) {
        const payload = {
          email: user.email,
          username: user.username,
          group_id: user.group_id,
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
    return { status: 500, message: "Server Error", code: -1, data: {} };
  }
};
module.exports = { register, login, changePassword };
