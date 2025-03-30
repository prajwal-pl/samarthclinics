import express from "express";
import {
  getDoctors,
  roleFunction,
  updateRole,
} from "../controllers/role.controller.js";

const router = express.Router();

router.get("/doctors", getDoctors);
router.post("/update", updateRole);
router.get("/:id", roleFunction);

export default router;
