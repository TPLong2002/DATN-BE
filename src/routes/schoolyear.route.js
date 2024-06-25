import express from "express";
import schoolyearController from "../controllers/schoolyear.controller";
const router = express.Router();

router.get("/", schoolyearController.getAllSchoolyear);
router.post("/", schoolyearController.createSchoolyear);

export default router;
