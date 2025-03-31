import { Booking } from "../models/booking.js";
import Prescription from "../models/prescription.js";
import User from "../models/user.js";
import crypto from "crypto";
import mongoose from "mongoose";

export const getPrescriptions = async (req, res) => {
  try {
    const { id: userId } = req.params;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // Clerk Auth Verification
    const user = await User.findOne({
      clerkId: userId,
    }).select("role");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if user is a doctor
    if (user.role !== "doctor") {
      return res
        .status(403)
        .json({ message: "Forbidden - doctor access required" });
    }

    // FInding all prescriptions for the doctor
    const prescriptions = await Prescription.find({
      doctor: user.id,
    })
      .populate("patient", "full_name email")
      .sort({ dateIssued: -1 });

    return res.status(200).json(prescriptions);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const createPrescription = async (req, res) => {
  const {
    prescriptionText,
    patientId,
    notes,
    paymentAmount,
    expiryDate,
    appointmentId,
  } = req.body;
  try {
    const { id: userId } = req.params;

    // Clerk Auth Verification
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const user = await User.findOne({
      clerkId: userId,
    });

    // Check if user is a doctor
    if (user.role !== "doctor") {
      return res
        .status(403)
        .json({ message: "Forbidden - doctor access required" });
    }

    // Generate unique shareable ID
    const shareableId = crypto.randomBytes(10).toString("hex");

    // Create Prescriptions based on userID
    const prescription = await Prescription.create({
      doctor: user.id,
      prescriptionText,
      patient: patientId,
      notes: notes || "",
      expiryDate: expiryDate || null,
      paymentAmount: paymentAmount || null,
      appointment: appointmentId || null,
      shareableId,
    });

    // update prescription details in the user's prescriptions array
    await user.updateOne({
      $push: { prescriptions: prescription._id },
    });

    res.status(201).json({
      message: "Prescription created successfully",
      prescription,
      shareableUrl: `/prescription/share/${shareableId}`,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getPatientPaymentStatus = async (req, res) => {
  try {
    const { id: userId } = req.params;
    const { patientId } = req.params;

    // Clerk Auth Verification
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // Verify role of the user
    const user = await User.findById(userId).select("role");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if user is a doctor
    if (user.role !== "doctor") {
      return res
        .status(403)
        .json({ message: "Forbidden - doctor access required" });
    }

    // Check if patientId is a valid ObjectId
    const prescriptions = await Prescription.find({
      doctor: userId,
      patient: patientId,
    });

    // Check if prescriptions exist for the patient
    if (!prescriptions || prescriptions.length === 0) {
      return res
        .status(404)
        .json({ message: "No prescriptions found for this patient" });
    }

    res.status(200).json(prescriptions);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updatePaymentStatus = async (req, res) => {
  try {
    const { id: userId } = req.params;
    const { prescriptionId } = req.params;
    const { paymentStatus, paymentDate, paymentAmount } = req.body;

    // Clerk Auth Verification
    if (!userId) {
      console.log("Unauthorized: No userId in request");
      return res.status(401).json({ message: "Unauthorized" });
    }

    const user = await User.findOne({
      clerkId: userId,
    }).select("role");

    // Check if user is a doctor
    if (!user) {
      console.log("User not found for ID:", userId);
      return res.status(404).json({ message: "User not found" });
    }

    if (user.role !== "doctor") {
      console.log("Forbidden - user role is not doctor:", user.role);
      return res
        .status(403)
        .json({ message: "Forbidden - doctor access required" });
    }

    // Find all prescriptions by the id
    const prescription = await Prescription.findById(prescriptionId);

    if (!prescription) {
      return res.status(404).json({ message: "Prescription not found" });
    }

    // Update the payment status in the prescription
    const updatedPrescription = await Prescription.findByIdAndUpdate(
      prescriptionId,
      {
        paymentStatus,
        paymentDate:
          paymentDate || (paymentStatus === "paid" ? new Date() : null),
        paymentAmount,
      },
      { new: true }
    );

    res.status(200).json({
      message: "Payment status updated successfully",
      prescription: updatedPrescription,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getPatientsWithAppointments = async (req, res) => {
  try {
    const { id: userId } = req.params;

    console.log("User ID from request:", userId);

    // Clerk Auth Verification
    if (!userId) {
      console.log(
        "Unauthorized: No userId in request for getPatientsWithAppointments"
      );
      return res.status(401).json({ message: "Unauthorized" });
    }

    const user = await User.findOne({
      clerkId: userId,
    });

    if (!user) {
      console.log("User not found for ID:", userId);
      return res.status(404).json({ message: "User not found" });
    }

    // Check if user is a doctor
    if (user.role !== "doctor") {
      console.log("Forbidden - user role is not doctor:", user.role);
      return res
        .status(403)
        .json({ message: "Forbidden - doctor access required" });
    }

    // Find patients who have appointments with the doctor
    const patientsWithDetails = await Booking.find({ doctor: user.id }).sort({
      dateIssued: -1,
    });

    // return all the patients found in appointments
    const patients = await Promise.all(
      patientsWithDetails.map(async (booking) => {
        const patient = await User.findById(booking.user).select(
          "full_name email phoneNumber"
        );
        return {
          ...patient._doc,
          appointmentDate: booking.date,
          appointmentTime: booking.time,
          appointmentStatus: booking.status,
        };
      })
    );

    console.log(patients);

    res.status(200).json(patients);
  } catch (error) {
    console.log("Error in getPatientsWithAppointments:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getPrescriptionByShareableId = async (req, res) => {
  try {
    const { shareableId } = req.params;

    const prescription = await Prescription.findOne({ shareableId })
      .populate("doctor", "full_name email")
      .populate("patient", "full_name");

    if (!prescription) {
      return res.status(404).json({ message: "Prescription not found" });
    }

    res.status(200).json(prescription);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
