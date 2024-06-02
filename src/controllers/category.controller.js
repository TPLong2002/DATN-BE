import categoryService from "../services/category.service";
const getCategories = async (req, res) => {
  try {
    const response = await categoryService.getCategories();
    return res.status(response.status).json(response);
  } catch (error) {
    return res
      .status(500)
      .json({ status: 500, code: -1, message: error.message, data: "" });
  }
};
export default { getCategories };
