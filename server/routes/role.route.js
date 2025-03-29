import express from "express";
import { roleFunction, updateRole } from "../controllers/role.controller.js";

const router = express.Router();

router.get("/:id", roleFunction);
router.post("/update", updateRole);

export default router;
