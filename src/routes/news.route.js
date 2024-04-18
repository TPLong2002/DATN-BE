import express from "express";
import newsController from "../controllers/news.controller";
const router = express.Router();

router.get("/", newsController.getAllNews);
router.post("/", newsController.createNews);
router.put("/", newsController.updateNews);
router.get("/byuser", newsController.getNewsByUserId);

export default router;
