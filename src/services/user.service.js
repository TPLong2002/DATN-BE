import { raw } from "body-parser";
import db from "../models/index.js";

const getAllUsers = async () => {
  try {
    const users = await db.Users.findAll({
      where: { group_id: 4 },
      include: {
        model: db.Classes,
        // as: "Student_Class",
        where: { id: 1 },
      },
      // raw: true,
      nest: true,
    });
    return { status: 200, code: 0, message: "success", data: users };
  } catch (err) {
    console.log(err);
    return { status: 500, code: -1, message: "errService", data: [] };
  }
};
module.exports = { getAllUsers };
