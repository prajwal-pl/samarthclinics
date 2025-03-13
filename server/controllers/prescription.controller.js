import Prescription from "../models/prescription";
import User from "../models/user";

export const getPrescriptions = async (req, res) => {
  try {
    const userId = req.userId;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const role = await User.findById(userId).select("role");

    if (!role) {
      return res.status(404).json({ message: "Role not found" });
    }

    if (role.role !== "doctor") {
      return res.status(403).json({ message: "Forbidden" });
    }

    const prescriptions = await Prescription.find({
      doctor: userId,
    });

    if (!prescriptions) {
      return res.status(404).json({ message: "Prescriptions not found" });
    }

    res.status(200).json(prescriptions);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
