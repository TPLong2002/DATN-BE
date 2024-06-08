import express from "express";
import studentController from "../controllers/student.controller";
const router = express.Router();

router.get("/assignments", studentController.getAllAssignmentsByStudentId);
router.get("/schoolyear", studentController.getStudentBySchoolyear);
router.get("/assignment", studentController.getAssignmentById);
router.get("/countgrade", studentController.countStudentByGrade);
router.get("/countschoolyear", studentController.countStudentBySchoolyear);

export default router;
