import express from "express";
import newsController from "../controllers/news.controller";
const router = express.Router();

router.get("/getnewsbysort", newsController.getNewsBySort);
router.post("/create", newsController.createNews);
router.put("/update", newsController.updateNews);
router.get("/byuser", newsController.getNewsByUserId);

export default router;
