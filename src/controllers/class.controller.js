import classService from "../services/class.service";
const getAllClass = async (req, res) => {
  try {
    if (req.query.id) {
      const classes = await classService.getClassById(req.query.id);
      res.status(200).json(classes);
    } else {
      const classes = await classService.getAllClass(
        req.query.limit,
        req.query.page
      );
      console.log(classes);
      res.status(200).json(classes);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const createClass = async (req, res) => {
  try {
    const classes = await classService.createClass(req.body);
    res.status(200).json(classes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const updateClass = async (req, res) => {
  try {
    const classes = await classService.updateClass(req.body);
    res.status(200).json(classes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
module.exports = { getAllClass, createClass, updateClass };
