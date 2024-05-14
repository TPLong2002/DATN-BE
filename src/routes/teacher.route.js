import express from "express";
import teacherController from "../controllers/teacher.controller";
const router = express.Router();

router.get("/classsubject", teacherController.getClassSubjectByTeacherId);
router.get("/subject", teacherController.getSubjectByTeacherId);
router.post("/regsubject", teacherController.registerSubject);
router.delete("/deletesubject", teacherController.delSubjectOfTeacher);
router.get("/teachers", teacherController.getTeachers);
router.get("/teacherswithoutgvcn", teacherController.getTeacherWithoutGVCN);
router.get("/teachersnotinsubject", teacherController.getTeachersNotInSubject);
router.post("/addteachertosubject", teacherController.addTeacherToSubject);

export default router;
