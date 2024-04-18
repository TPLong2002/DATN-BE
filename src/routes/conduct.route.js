import express from "express";
import conductController from "../controllers/conduct.controller";
const router = express.Router();

router.get("/", conductController.getConduct);
router.post("/", conductController.createConduct);
router.put("/", conductController.updateConduct);

export default router;
