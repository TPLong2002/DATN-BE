import express from "express";
import roleCtl from "../controllers/role.controller";
const router = express.Router();

router.get("/roles", roleCtl.getRoles);
router.post("/roles", roleCtl.addRoles);
router.delete("/roles", roleCtl.delRoles);
router.put("/roles", roleCtl.updateRole);
router.get("/rolesgroup", roleCtl.getRolesByGroup);
router.get("/getrolebyid", roleCtl.getRoleById);

export default router;
