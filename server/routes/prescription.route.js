import express from "express";
import {
  createPrescription,
  getPatientPaymentStatus,
  getPrescriptions,
  updatePaymentStatus,
} from "../controllers/prescription.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/", authMiddleware, getPrescriptions);
router.post("/create", authMiddleware, createPrescription);
router.get(
  "/patient/:patientId/payments",
  authMiddleware,
  getPatientPaymentStatus
);
router.patch("/payment/:prescriptionId", authMiddleware, updatePaymentStatus);

export default router;
