import express from "express";
import profileController from "../controllers/profile.controller";
const router = express.Router();

router.get("/", profileController.getProfileByUserId);
router.put("/", profileController.updateProfileByUserId);
router.get("/relatives", profileController.getRelativesByUserId);

export default router;
