import db from "../models";
const getCategories = async () => {
  try {
    const categories = await db.Categories.findAll();
    if (categories) {
      return { status: 200, code: 0, message: "Success", data: categories };
    } else {
      return { status: 500, code: 1, message: "Not Found", data: "" };
    }
  } catch (error) {
    return { status: 500, code: -1, message: error.message, data: "" };
  }
};
module.exports = { getCategories };
