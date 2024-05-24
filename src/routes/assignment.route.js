import express from "express";
import assignmentController from "../controllers/assignment.controller";
const router = express.Router();

router.get("/", assignmentController.getAssignment);
router.post("/", assignmentController.createAssignment);
router.put("/", assignmentController.updateAssignment);
router.get("/assignments", assignmentController.getAllAssignments);
router.get("/byuser", assignmentController.getAssignmentByUserId);
router.get("/class", assignmentController.getAssignmentClass);
router.get("/assignmentsinclass", assignmentController.getAssignmentByClassId);
router.get(
  "/assignmentsofsubjectinclass",
  assignmentController.getAssignmentOfSubjectByClassId
);
router.get(
  "/classesnotinassignment",
  assignmentController.getClassesNotInAssignmentOfTeacher
);
router.put("/changeClass", assignmentController.changeClass);

export default router;
