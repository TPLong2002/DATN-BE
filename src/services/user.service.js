import { raw } from "body-parser";
import db from "../models/index.js";

const getAllUsers = async () => {
  try {
    const users = await db.Users.findAll({
      include: {
        model: db.Groups,
        attributes: ["name", "description"],
      },
      // attributes: ["id", "username", "email", "group_id"],
      raw: true,
      nest: true,
    });
    // const users = await db.Groups.findAll();
    console.log(users);
    return { status: 200, code: 0, message: "success", data: users };
  } catch (err) {
    console.log(err);
    return { status: 500, code: -1, message: "errService", data: [] };
  }
};
module.exports = { getAllUsers };
