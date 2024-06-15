import db from "../models";

const getRoles = async () => {
  const res = await db.Roles.findAll({
    where: { ishidden: 0 },
    order: [["URL", "ASC"]],
  });
  if (res) {
    return { status: 200, code: 0, message: "success", data: res };
  } else {
    return { status: 500, code: -1, message: "error", data: "" };
  }
};
const addRoles = async (data) => {
  console.log(data);
  const roles = await db.Roles.findAll({
    attributes: ["URL", "description"],
    raw: true,
  });

  let differenceRole = data.filter(
    ({ URL: id1 }) => !roles.some(({ URL: id2 }) => id2 === id1)
  );
  if (differenceRole.length === 0) {
    return { status: 200, code: 0, message: "Notthing create", data: res };
  }
  const res = await db.Roles.bulkCreate(differenceRole);

  if (res) {
    return {
      status: 200,
      code: 0,
      message: `Create success: ${differenceRole.length} role`,
      data: res,
    };
  } else {
    return { status: 500, code: -1, message: "error", data: "" };
  }
};
const updateRoles = async (data) => {
  console.log(data);
  const res = await db.Roles.bulkCreate(data);
  if (res) {
    return { status: 200, code: 0, message: "success", data: res };
  } else {
    return { status: 500, code: -1, message: "error", data: "" };
  }
};
const delRoles = async (id) => {
  const res = await db.Roles.update({
    ishidden: 1,
    where: { id: id },
  });
  if (res) {
    return { status: 200, code: 0, message: "success", data: res };
  } else {
    return { status: 500, code: -1, message: "error", data: "" };
  }
};
const getRolesByGroup = async (id) => {
  const roles = await db.Roles.findAll({
    include: {
      model: db.Groups,
      as: "Role_Groups",
      where: { id: id },
      attributes: [],
    },
    attributes: ["id", "url", "description"],
    raw: true,
    nest: true,
  });
  if (roles) {
    return { status: 200, code: 0, message: "success", data: roles };
  } else {
    return { status: 500, code: -1, message: "error", data: "" };
  }
};

module.exports = { getRoles, addRoles, updateRoles, delRoles, getRolesByGroup };
