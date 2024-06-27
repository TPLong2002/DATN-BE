import express from "express";
import classController from "../controllers/class.controller";
const router = express.Router();

router.get("/", classController.getAllClass);
router.post("/", classController.createClass);
router.put("/", classController.updateClass);
router.put("/hidden", classController.hiddenClass);
router.get("/students", classController.getStudentByClassId);
router.delete("/students", classController.kickUserFromClass);
router.post("/students", classController.addStudentToClass);
router.get("/subjects", classController.getSubjectsByClassId);
router.delete("/subjects", classController.deleteSubjectFromClass);
router.get("/countclasses", classController.countClassesByGrade);
router.get("/grade", classController.getGradeByClassId);
router.get("/schoolyear", classController.getClassesBySchoolyear);

export default router;
