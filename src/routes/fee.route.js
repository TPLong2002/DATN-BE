import express from "express";
import feeController from "../controllers/fee.controller";
const router = express.Router();

router.get("/", feeController.getAllFee);
router.post("/", feeController.createFee);
router.put("/", feeController.updateFee);
router.get("/studentsoffee", feeController.getStudentsOfFee);
router.delete("/studentsoffee", feeController.deleteUsersOfFee);
router.post("/studentsoffee", feeController.addUsersToFee);
router.get("/studentnotinfofee", feeController.getStudentNotInFee);
export default router;
