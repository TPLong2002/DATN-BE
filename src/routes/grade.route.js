import express from "express";
import gradeController from "../controllers/grade.controller";
const router = express.Router();

router.get("/", gradeController.getAllGrade);

export default router;
