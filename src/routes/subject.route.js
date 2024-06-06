import express from "express";
import subjectController from "../controllers/subject.controller";
const router = express.Router();

router.get("/", subjectController.getAllSubjects);
router.get("/subjects", subjectController.getSubjects);
router.post("/", subjectController.createSubject);
router.put("/", subjectController.updateSubject);
router.put("/hidden", subjectController.hiddenSubject);
router.get("/grade", subjectController.getSubjectByGradeId);
router.get("/class", subjectController.getSubjectByClassId);

export default router;
