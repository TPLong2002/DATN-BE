import paymenthistoryController from "../controllers/paymenthistory.controller";
import express from "express";
const router = express.Router();

router.post("/feeOfStudent", paymenthistoryController.getPaymentHistory);

export default router;
