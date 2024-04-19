import express from "express";
import teacherController from "../controllers/teacher.controller";
const router = express.Router();

router.get("/classsubject", teacherController.getClassSubjectByTeacherId);
router.get("/subject", teacherController.getSubjectByTeacherId);
router.post("/regsubject", teacherController.registerSubject);

export default router;
