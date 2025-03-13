import express from "express";
import { authFunction } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/", authFunction);
router.post("/user-info");

export default router;
