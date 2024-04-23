import express from "express";
import assignment_classController from "../controllers/assignment_class.controller";
const router = express.Router();

router.get("/class", assignment_classController.getAssignmentOfClass);
router.get("/", assignment_classController.getAssingment_Classes);
router.post("/", assignment_classController.addAssignment_Class);
router.put("/", assignment_classController.updateAssignment_Class);
router.delete("/", assignment_classController.hideAssignment_Class);

export default router;
