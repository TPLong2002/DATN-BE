import express from "express";
import marktypeController from "../controllers/marktype.controller";
const router = express.Router();

router.get("/", marktypeController.getAllMarkType);
router.put("/", marktypeController.updateMarkType);
router.post("/", marktypeController.createMarkType);
export default router;
