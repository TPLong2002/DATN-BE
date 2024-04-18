import newsService from "../services/news.service";
const getAllNews = async (req, res) => {
  try {
    if (req.query.id) {
      const response = await newsService.getNewsById(req.query.id);
      return res.status(response.status).json(response);
    } else {
      const response = await newsService.getAllNews();
      return res.status(response.status).json(response);
    }
  } catch (error) {
    return res
      .status(500)
      .json({ status: 500, code: -1, message: error.message, data: "" });
  }
};
const createNews = async (req, res) => {
  try {
    const response = await newsService.createNews(req.body);
    return res.status(response.status).json(response);
  } catch (error) {
    return res
      .status(500)
      .json({ status: 500, code: -1, message: error.message, data: "" });
  }
};
const getNewsByUserId = async (req, res) => {
  try {
    const response = await newsService.getNewsByUserId(req.query.id);
    return res.status(response.status).json(response);
  } catch (error) {
    return res
      .status(500)
      .json({ status: 500, code: -1, message: error.message, data: "" });
  }
};
const updateNews = async (req, res) => {
  try {
    const response = await newsService.updateNews(req.body);
    return res.status(response.status).json(response);
  } catch (error) {
    return res
      .status(500)
      .json({ status: 500, code: -1, message: error.message, data: "" });
  }
};
module.exports = { getAllNews, createNews, getNewsByUserId, updateNews };
