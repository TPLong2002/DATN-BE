import express from "express";
import studentController from "../controllers/student.controller";
const router = express.Router();

router.get("/", studentController.getAllAssignmentsByStudentId);

export default router;
