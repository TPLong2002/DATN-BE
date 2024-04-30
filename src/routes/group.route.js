import groupController from "../controllers/group.controller";
import express from "express";
const router = express.Router();
router.get("/", groupController.getGroups);
export default router;
