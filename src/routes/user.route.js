import express from "express";
import userController from "../controllers/user.controller";
const router = express.Router();

/**
 * @openapi
 * /api/v1/user:
 *   get:
 *     tags:
 *      - Users
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
/**
 * @openapi
 * /api/v1/user/users:
 *   get:
 *     tags:
 *      - Users
 *     summary: Get all users nothidden
 *     description: Retrieve a list of all users
 *     responses:
 *       '200':
 *         description: A list of users nothidden
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */
router.get("/users", userController.getUsers);
/**
 * @openapi
 * /api/v1/user/usersDelete:
 *   get:
 *     tags:
 *      - Users
 *     summary: get all users isdelete = true
 *     description: get all users isdelete = true
 *     responses:
 *       '200':
 *         description: get all users isdelete = true
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */
router.get("/usersDelete", userController.getUsersDelete);
/**
 * @openapi
 * /api/v1/user/usersLock:
 *   get:
 *     tags:
 *      - Users
 *     summary: Get all users locked
 *     description: Get all users locked
 *     responses:
 *       '200':
 *         description: Get all users locked
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */
router.get("/usersLock", userController.getUsersLock);
/**
 * @openapi
 * /api/v1/user:
 *   post:
 *     tags:
 *      - Users
 *     summary: Create a new user
 *     description: Create a new user with the provided username, email, group ID, and password.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               group_id:
 *                 type: integer
 *               password:
 *                 type: string
 *             example:
 *               username: HS230004
 *               email: test@gmail.com
 *               group_id: 2
 *               password: 123Admin
 *     responses:
 *       '201':
 *         description: User created successfully
 *       '400':
 *         description: Bad request, missing or invalid parameters
 */
router.post("/", userController.createUser);
/**
 * @openapi
 * /api/v1/user:
 *   put:
 *     tags:
 *       - Users
 *     summary: Edit a user
 *     description: Edit an existing user with the provided ID, username, email, group ID, and password.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               group_id:
 *                 type: integer
 *               password:
 *                 type: string
 *             example:
 *               id: 9
 *               username: HS230005
 *               email: test@gmail.com
 *               group_id: 2
 *               password: 123Adminn
 *     responses:
 *       '200':
 *         description: User updated successfully
 *       '400':
 *         description: Bad request, missing or invalid parameters
 */

router.put("/", userController.updateUser);
/**
 * @openapi
 * /api/v1/user/recover:
 *   post:
 *     tags:
 *      - Users
 *     summary: Recover a user
 *     description: Recover a user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *             example:
 *               id: 8
 *     responses:
 *       '201':
 *         description: User created successfully
 *       '400':
 *         description: Bad request, missing or invalid parameters
 */
router.post("/recover", userController.recoverUser);
/**
 * @openapi
 * /api/v1/user/lock:
 *   post:
 *     tags:
 *      - Users
 *     summary: Lock a user
 *     description: Lock a user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *             example:
 *               id: 9
 *     responses:
 *       '201':
 *         description: User created successfully
 *       '400':
 *         description: Bad request, missing or invalid parameters
 */
router.post("/lock", userController.lockUser);
/**
 * @openapi
 * /api/v1/user/unlock:
 *   post:
 *     tags:
 *      - Users
 *     summary: Unlock a user
 *     description: Unlock a user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *             example:
 *               id: 9
 *     responses:
 *       '201':
 *         description: User created successfully
 *       '400':
 *         description: Bad request, missing or invalid parameters
 */
router.post("/unlock", userController.unlockUser);
/**
 * @openapi
 * /api/v1/user:
 *   delete:
 *     tags:
 *      - Users
 *     summary: Delete a user
 *     description: Delete a user with the provided ID.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *             example:
 *               id: 8
 *     responses:
 *       '200':
 *         description: User deleted successfully
 *       '400':
 *         description: Bad request, missing or invalid parameters
 */
router.delete("/", userController.delUser);

router.get("/countusersofgroup", userController.countUsersOfGroup);

export default router;
