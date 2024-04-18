import express from "express";
import marktypeController from "../controllers/marktype.controller";
const router = express.Router();

router.get("/", marktypeController.getAllMarkType);
router.put("/", marktypeController.updateMarkType);
// router.put("/", marktypeController.updateFee);

export default router;
