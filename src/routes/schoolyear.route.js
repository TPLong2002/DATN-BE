import express from "express";
import schoolyearController from "../controllers/schoolyear.controller";
const router = express.Router();

router.get("/", schoolyearController.getAllSchoolyear);

export default router;
