import express from "express";
import parentController from "../controllers/parent.controller";
const router = express.Router();

router.get("/getfee", parentController.getFeesByParentId);
router.get("/getfeesofstudent", parentController.getFeesOfStudent);
router.get("/getstudents", parentController.getStudentsByParentId);
router.get("/getmarksofstudent", parentController.getMarksByStudentId);

export default router;
