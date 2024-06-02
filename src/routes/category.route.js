import express from "express";
import categoryController from "../controllers/category.controller";
const router = express.Router();

router.get("/getcategories", categoryController.getCategories);
export default router;
