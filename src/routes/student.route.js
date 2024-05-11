import express from "express";
import studentController from "../controllers/student.controller";
const router = express.Router();

router.get("/assignment", studentController.getAllAssignmentsByStudentId);
router.get("/schoolyear", studentController.getStudentBySchoolyear);

export default router;
