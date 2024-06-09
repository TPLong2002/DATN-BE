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
router.get("/countfeeavailable", feeController.countFeeAvailable);
router.get("/amountoffees", feeController.amountOfFees);
router.get("/feebyschoolyeargrade", feeController.getFeeBySchoolyearGrade);
router.get("/amountoffee", feeController.amountOfFee);
router.get("/amountoffeesavailable", feeController.amountOfFeesAvailable);
export default router;
