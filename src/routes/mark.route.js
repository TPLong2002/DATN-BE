import express from "express";
import markController from "../controllers/mark.controller";
const router = express.Router();

router.get("/", markController.getMarksByStudentId);
router.post("/", markController.createMark);
router.put("/", markController.updateMark);
router.delete("/", markController.deleteMark);

export default router;
