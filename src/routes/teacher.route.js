import express from "express";
import teacherController from "../controllers/teacher.controller";
const router = express.Router();

router.get("/classsubject", teacherController.getClassSubjectByTeacherId);
router.get("/subject", teacherController.getSubjectByTeacherId);
router.post("/regsubject", teacherController.registerSubject);
router.delete("/deletesubject", teacherController.delSubjectOfTeacher);
router.get("/teachers", teacherController.getTeachers);
router.get("/teacherswithoutgvcn", teacherController.getTeacherWithoutGVCN);
router.get("/teachersnotinsubject", teacherController.getTeachersNotInSubject);
router.post("/addteachertosubject", teacherController.addTeacherToSubject);
router.get("/subjectisteaching", teacherController.getSubjectIsTeaching);
router.get(
  "/classofsubjectisteaching",
  teacherController.getClassOfSubjectIsTeaching
);
router.get(
  "/assignmentbyteacherid",
  teacherController.getAssignmentByTeacherId
);
router.get("/assignmentbyid", teacherController.getAssignmentById);
router.put("/updateassignment", teacherController.updateAssignment);
router.get(
  "/classesnotinassignment",
  teacherController.getClassesNotInAssignmentOfTeacher
);
router.put("/changeclass", teacherController.changeClass);
router.post("/createassignment", teacherController.createAssignment);
router.get(
  "/classesinassignment",
  teacherController.getClassesInAssignmentOfTeacher
);
router.post("/addclasstoassignment", teacherController.addClassToAssignment);
router.delete(
  "/deleteclassfromassignment",
  teacherController.deleteClassFromAssignment
);
router.get(
  "/teacherbyclasssubject",
  teacherController.getTeacherByClassSubject
);
router.get("/countteacherbysubject", teacherController.countTeacherBySubject);

export default router;
