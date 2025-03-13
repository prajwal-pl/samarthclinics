import express from "express";
import {
  createPrescription,
  getPrescriptions,
} from "../controllers/prescription.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/", authMiddleware, getPrescriptions);
router.post("/create", authMiddleware, createPrescription);

export default router;
