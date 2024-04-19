import express from "express";
import class_subject_userController from "../controllers/class_subject_user.controller";
const router = express.Router();

router.get("/", class_subject_userController.getClassSubjectUser);
router.post("/", class_subject_userController.createClassSubjectUser);
router.put("/", class_subject_userController.updateClassSubjectUser);

export default router;
