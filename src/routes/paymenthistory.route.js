import paymenthistoryController from "../controllers/paymenthistory.controller";
import express from "express";
const router = express.Router();

router.post("/feeOfStudent", paymenthistoryController.getPaymentHistory);
router.get("/amountByYear", paymenthistoryController.getAllAmountByYear);

export default router;
