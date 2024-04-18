import express from "express";
import userController from "../controllers/user.controller";
const router = express.Router();

router.get("/", userController.getAllUsers);
router.get("/users", userController.getUsers);
router.get("/usersDelete", userController.getUsersDelete);
router.get("/usersLock", userController.getUsersLock);
router.post("/", userController.createUser);
router.put("/", userController.updateUser);
router.post("/recover", userController.recoverUser);
router.post("/lock", userController.lockUser);
router.post("/unlock", userController.unlockUser);
router.delete("/", userController.delUser);

export default router;
