import express from "express";
import semesterController from "../controllers/semester.controller";
const router = express.Router();

router.get("/", semesterController.getSemester);

export default router;
