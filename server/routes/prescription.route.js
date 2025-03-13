import express from "express";
import { getPrescriptions } from "../controllers/prescription.controller";
import { authMiddleware } from "../middleware/auth.middleware";

const router = express.Router();

router.get("/", authMiddleware, getPrescriptions);

export default router;
