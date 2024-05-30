import express from "express";
import paymentController from "../controllers/payment.controller";
const router = express.Router();

router.post("/create", paymentController.create);
router.post("/callback", paymentController.callback);

export default router;
