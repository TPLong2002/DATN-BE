import express from "express";
import userController from "../controllers/user.controller";
const router = express.Router();

/**
 * @openapi
 * tags:
 *   name: Users
 *   description: API endpoints for managing users
 *
 * /api/v1/user:
 *   get:
 *     summary: Get all users
 *     description: Retrieve a list of all users
 *     responses:
 *       '200':
 *         description: A list of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         email:
 *           type: string
 *         password:
 *           type: string
 *         username:
 *           type: string
 *         group_id:
 *           type: integer
 *         islocked:
 *           type: integer
 *         isdeleted:
 *           type: integer
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 */

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
