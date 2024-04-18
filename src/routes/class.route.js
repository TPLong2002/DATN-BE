import express from "express";
import classController from "../controllers/class.controller";
const router = express.Router();

router.get("/", classController.getAllClass);
router.post("/", classController.createClass);
router.put("/", classController.updateClass);

export default router;
