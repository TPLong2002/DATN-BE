import db from "../models/index.js";

const getAllUsers = async () => {
  try {
    const users = await db.Users.findAll();
    return { status: 200, code: 0, message: "success", data: users };
  } catch (err) {
    return { status: 500, code: -1, message: "errService", data: [] };
  }
};
module.exports = { getAllUsers };
