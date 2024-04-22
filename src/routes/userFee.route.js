import express from "express";
import userFeeController from "../controllers/userFee.controller";
const router = express.Router();

router.get("/", userFeeController.getUserFee);
router.post("/", userFeeController.createUserFee);
router.put("/", userFeeController.updateUserFee);

export default router;
