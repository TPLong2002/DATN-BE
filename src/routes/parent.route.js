import express from "express";
import parentController from "../controllers/parent.controller";
const router = express.Router();

router.get("/", parentController.getFeesByParentId);

export default router;
