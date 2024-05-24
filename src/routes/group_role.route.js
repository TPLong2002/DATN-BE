import express from "express";
import grouproleCtl from "../controllers/group_role.controller";

const router = express.Router();

router.post("/grouproles", grouproleCtl.addGroupRole);

export default router;
