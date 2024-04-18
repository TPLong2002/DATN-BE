import db from "../models";
const getAllNews = async () => {
  try {
    const news = await db.News.findAll({
      where: { ishidden: 0 },
      include: [{ model: db.Users, as: "author", attributes: ["username"] }],
    });
    return { status: 200, code: 1, message: "Success", data: news };
  } catch (error) {
    return { status: 500, code: -1, message: error.message, data: "" };
  }
};
const createNews = async (news) => {
  try {
    const newNews = await db.News.create(news);
    return { status: 200, code: 1, message: "Success", data: newNews };
  } catch (error) {
    return { status: 500, code: -1, message: error.message, data: "" };
  }
};
const getNewsById = async (id) => {
  try {
    const news = await db.News.findOne({ where: { id: id } });
    return { status: 200, code: 1, message: "Success", data: news };
  } catch (error) {
    return { status: 500, code: -1, message: error.message, data: "" };
  }
};
const getNewsByUserId = async (id) => {
  try {
    const news = await db.News.findAll({ where: { user_id: id } });
    return { status: 200, code: 1, message: "Success", data: news };
  } catch (error) {
    return { status: 500, code: -1, message: error.message, data: "" };
  }
};
const updateNews = async (data) => {
  try {
    await db.News.update(data, { where: { id: data.id } });
    return { status: 200, code: 1, message: "Success", data: "" };
  } catch (error) {
    return { status: 500, code: -1, message: error.message, data: "" };
  }
};
module.exports = {
  getAllNews,
  createNews,
  getNewsById,
  getNewsByUserId,
  updateNews,
};
