import express from "express";
import {
  createPrescription,
  getPatientPaymentStatus,
  getPatientsWithAppointments,
  getPrescriptionByShareableId,
  getPrescriptions,
  updatePaymentStatus,
} from "../controllers/prescription.controller.js";

const router = express.Router();

router.post("/create/:id", createPrescription);
router.get("/:id/patients-with-appointments", getPatientsWithAppointments);
router.get("/:id/patient/:patientId/payments", getPatientPaymentStatus);
router.patch("/:id/payment/:prescriptionId", updatePaymentStatus);
router.get("/share/:shareableId", getPrescriptionByShareableId);
router.get("/:id", getPrescriptions);

export default router;
