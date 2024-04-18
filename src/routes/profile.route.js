import express from "express";
import profileController from "../controllers/profile.controller";
const router = express.Router();

router.get("/", profileController.getProfileByUserId);
router.post("/", profileController.updateProfileByUserId);

export default router;
