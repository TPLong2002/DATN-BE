import db from "../models";
const getRolesByGroupId = async (id) => {
  const roles = await db.Roles.findAll({
    include: {
      model: db.Groups,
      as: "Role_Groups",
      where: { id: id },
      attributes: [],
    },
    attributes: ["id", "URL", "description"],
    raw: true,
    nest: true,
  });
  if (roles) {
    return { status: 200, code: 0, message: "success", data: roles };
  } else {
    return { status: 500, code: 1, message: "fail", data: "" };
  }
};
module.exports = { getRolesByGroupId };
