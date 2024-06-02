import express from "express";
import parentController from "../controllers/parent.controller";
const router = express.Router();

router.get("/getfee", parentController.getFeesByParentId);
router.get("/getfeesofstudent", parentController.getFeesOfStudent);

export default router;
