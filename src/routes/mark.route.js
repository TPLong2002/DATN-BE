import express from "express";
import markController from "../controllers/mark.controller";
const router = express.Router();

router.get("/", markController.getMarksByStudentId);

export default router;
