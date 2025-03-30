import Prescription from "../models/prescription.js";
import User from "../models/user.js";

export const getPrescriptions = async (req, res) => {
  try {
    const userId = req.userId;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const user = await User.findById(userId).select("role");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.role !== "doctor") {
      return res
        .status(403)
        .json({ message: "Forbidden - doctor access required" });
    }

    const prescriptions = await Prescription.find({
      doctor: userId,
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
  const { prescriptionText, patientId, notes, paymentAmount, expiryDate } =
    req.body;
  try {
    const userId = req.userId;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.role !== "doctor") {
      return res
        .status(403)
        .json({ message: "Forbidden - doctor access required" });
    }

    const prescription = await Prescription.create({
      doctor: userId,
      prescriptionText,
      patient: patientId,
      notes: notes || "",
      expiryDate: expiryDate || null,
      paymentAmount: paymentAmount || null,
    });

    await user.updateOne({
      $push: { prescriptions: prescription._id },
    });

    res
      .status(201)
      .json({ message: "Prescription created successfully", prescription });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getPatientPaymentStatus = async (req, res) => {
  try {
    const userId = req.userId;
    const { patientId } = req.params;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const user = await User.findById(userId).select("role");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.role !== "doctor") {
      return res
        .status(403)
        .json({ message: "Forbidden - doctor access required" });
    }

    const prescriptions = await Prescription.find({
      doctor: userId,
      patient: patientId,
    }).populate("patient", "full_name email");

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
    const userId = req.userId;
    const { prescriptionId } = req.params;
    const { paymentStatus, paymentDate, paymentAmount } = req.body;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const user = await User.findById(userId).select("role");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.role !== "doctor") {
      return res
        .status(403)
        .json({ message: "Forbidden - doctor access required" });
    }

    const prescription = await Prescription.findById(prescriptionId);

    if (!prescription) {
      return res.status(404).json({ message: "Prescription not found" });
    }

    if (prescription.doctor.toString() !== userId) {
      return res
        .status(403)
        .json({ message: "Not authorized to update this prescription" });
    }

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
