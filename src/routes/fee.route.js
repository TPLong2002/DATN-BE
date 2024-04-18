import express from "express";
import feeController from "../controllers/fee.controller";
const router = express.Router();

router.get("/", feeController.getAllFee);
router.post("/", feeController.createFee);
router.put("/", feeController.updateFee);

export default router;
