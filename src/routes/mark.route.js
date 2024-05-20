import express from "express";
import markController from "../controllers/mark.controller";
const router = express.Router();

router.get("/", markController.getMarksByStudentId);
router.post("/", markController.createMark);
router.put("/", markController.updateMark);
router.delete("/", markController.deleteMark);
router.get("/subjectclass", markController.getMatksOfStudentsInClass);
router.get("/studentsubjectclass", markController.getMatksOfStudentInClassById);

export default router;
