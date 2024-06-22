import db from "../models";
const getNewsBySort = async (
  limit,
  page,
  schoolyear_id,
  semester_id,
  category_id,
  user_id,
  role
) => {
  if (!limit) limit = 10;
  if (!page) page = 1;
  const offset = (page - 1) * limit;
  try {
    const condition1 = semester_id ? { semester_id: semester_id } : {};
    const condition2 = schoolyear_id ? { schoolyear_id: schoolyear_id } : {};
    const condition3 = category_id ? { category_id: category_id } : {};
    const condition4 = user_id && role != "admin" ? { user_id: user_id } : {};
    const { count, rows } = await db.News.findAndCountAll({
      where: { ...condition1, ...condition2, ...condition3, ...condition4 },
      include: [
        {
          model: db.Users,
          as: "author",
          attributes: ["username"],
          include: [
            {
              model: db.Profiles,
              attributes: ["firstName", "lastName"],
            },
          ],
        },
        {
          model: db.Categories,
          as: "category",
          attributes: ["description"],
        },
        {
          model: db.Schoolyears,
          as: "schoolyear",
          attributes: ["name"],
        },
        {
          model: db.Semesters,
          as: "semester",
          attributes: ["name"],
        },
      ],
      order: [["createdAt", "DESC"]],
      limit: +limit,
      offset: +offset,
      raw: true,
      nest: true,
    });
    return { status: 200, code: 0, message: "Success", data: { count, rows } };
  } catch (error) {
    return { status: 500, code: -1, message: error.message, data: "" };
  }
};
const createNews = async (news) => {
  try {
    const newNews = await db.News.create(news);
    return { status: 200, code: 0, message: "Success", data: newNews };
  } catch (error) {
    return { status: 500, code: -1, message: error.message, data: "" };
  }
};
const getNewsById = async (id, user_id, role) => {
  console.log(user_id, role);
  try {
    const news = await db.News.findOne({
      where: { id: id },
      include: [
        {
          model: db.Users,
          as: "author",
          attributes: ["username"],
          include: [
            {
              model: db.Profiles,
              attributes: ["firstName", "lastName"],
            },
          ],
        },
        {
          model: db.Categories,
          as: "category",
          attributes: ["description"],
        },
      ],
      nest: true,
      raw: true,
    });
    if (
      news.user_id == user_id ||
      role == "admin" ||
      (user_id == undefined && role == undefined)
    )
      return { status: 200, code: 0, message: "Success", data: news };
    return { status: 403, code: -1, message: "Forbidden", data: "" };
  } catch (error) {
    return { status: 500, code: -1, message: error.message, data: "" };
  }
};
const getNewsByUserId = async (id) => {
  try {
    const news = await db.News.findAll({ where: { user_id: id } });
    return { status: 200, code: 0, message: "Success", data: news };
  } catch (error) {
    return { status: 500, code: -1, message: error.message, data: "" };
  }
};
const updateNews = async (data) => {
  try {
    await db.News.update(data, { where: { id: data.id } });
    return { status: 200, code: 0, message: "Success", data: "" };
  } catch (error) {
    return { status: 500, code: -1, message: error.message, data: "" };
  }
};
module.exports = {
  getNewsBySort,
  createNews,
  getNewsById,
  getNewsByUserId,
  updateNews,
};
