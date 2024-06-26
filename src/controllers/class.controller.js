import classService from "../services/class.service";
const getAllClass = async (req, res) => {
  try {
    if (req.query.id) {
      const classes = await classService.getClassById(req.query.id);
      res.status(200).json(classes);
    } else {
      if (req.query.limit && req.query.page) {
        const classes = await classService.getAllClass(
          req.query.limit,
          req.query.page,
          req.query.grade_id,
          req.query.schoolyear_id
        );
        res.status(200).json(classes);
      } else {
        const classes = await classService.getClasses();
        res.status(200).json(classes);
      }
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
const hiddenClass = async (req, res) => {
  try {
    const classes = await classService.hiddenClass(req.body);
    res.status(200).json(classes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const getStudentByClassId = async (req, res) => {
  try {
    const classes = await classService.getStudentByClassId(req.query.id);
    res.status(200).json(classes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const kickUserFromClass = async (req, res) => {
  try {
    const classes = await classService.kickUserFromClass(req.body);
    res.status(200).json(classes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const addStudentToClass = async (req, res) => {
  try {
    const classes = await classService.addStudentToClass(req.body);
    res.status(200).json(classes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const getSubjectsByClassId = async (req, res) => {
  try {
    const classes = await classService.getSubjectsByClassId(req.query.class_id);
    res.status(200).json(classes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const deleteSubjectFromClass = async (req, res) => {
  try {
    const classes = await classService.deleteSubjectFromClass(req.body);
    res.status(200).json(classes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const countClassesByGrade = async (req, res) => {
  try {
    const classes = await classService.countClassesByGrade(req.query.grade_id);
    res.status(200).json(classes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const getGradeByClassId = async (req, res) => {
  try {
    const classes = await classService.getGradeByClassId(req.query.class_id);
    res.status(200).json(classes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const getClassesBySchoolyear = async (req, res) => {
  try {
    const classes = await classService.getClassesBySchoolyear(
      req.query.schoolyear_id
    );
    res.status(200).json(classes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
module.exports = {
  getAllClass,
  createClass,
  updateClass,
  hiddenClass,
  getStudentByClassId,
  kickUserFromClass,
  addStudentToClass,
  getSubjectsByClassId,
  deleteSubjectFromClass,
  countClassesByGrade,
  getGradeByClassId,
  getClassesBySchoolyear,
};
