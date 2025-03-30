import User from "../models/user.js";
import { ObjectId } from "mongodb";

export const roleFunction = async (req, res) => {
  const { id } = req.params;

  // Validate ID format before attempting to create ObjectId
  if (!id || !ObjectId.isValid(id)) {
    console.log(`Invalid ID format: ${id}`);
    return res.status(400).json({
      message:
        "Invalid user ID format. Must be a 24 character hex string, 12 byte Uint8Array, or an integer.",
    });
  }

  try {
    const user = await User.findById(id);

    console.log(user);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ role: user.role });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateRole = async (req, res) => {
  const { id, role, email } = req.body;
  try {
    const user = await User.findOne({
      // clerkId: id,
      email,
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    await user.updateOne({ role });

    res.status(200).json({ message: "Role updated successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getDoctors = async (req, res) => {
  try {
    const doctors = await User.find({ role: "doctor" }).select(
      "full_name email"
    );

    if (!doctors || doctors.length === 0) {
      return res.status(404).json({ message: "No doctors found" });
    }

    res.status(200).json(doctors);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
