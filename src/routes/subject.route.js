import express from "express";
import subjectController from "../controllers/subject.controller";
const router = express.Router();

router.get("/", subjectController.getSubjects);
router.get("/subjects", subjectController.getAllSubjects);
router.post("/", subjectController.createSubject);
router.put("/", subjectController.updateSubject);
router.put("/hidden", subjectController.hiddenSubject);

export default router;
