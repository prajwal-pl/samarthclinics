import { Booking } from "../models/booking.js";
import User from "../models/user.js";
import mongoose from "mongoose";

export const GetBookings = async (req, res) => {
  const { id } = req.params;

  try {
    // Check if the id is a MongoDB ObjectId (doctor's MongoDB ID directly)
    if (mongoose.Types.ObjectId.isValid(id)) {
      const bookings = await Booking.find({
        doctor: id,
      })
        .populate("user", "full_name email")
        .sort({ date: -1, time: -1 });

      if (!bookings || bookings.length === 0) {
        return res.status(404).json({ message: "No bookings found" });
      }

      return res.status(200).json(bookings);
    }

    // Otherwise, assume it's a clerkId
    const doctor = await User.findOne({
      clerkId: id,
    });

    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    const bookings = await Booking.find({
      doctor: doctor._id,
    })
      .populate("user", "full_name email")
      .sort({ date: -1, time: -1 });

    if (!bookings || bookings.length === 0) {
      return res.status(404).json({ message: "No bookings found" });
    }

    res.status(200).json(bookings);
  } catch (error) {
    console.error("Error in GetBookings:", error);
    res.status(500).json({ message: error.message });
  }
};

export const GetBooking = async (req, res) => {
  const { id } = req.params;

  try {
    const booking = await Booking.findById(id);

    if (!booking) {
      return res.status(404).json({ message: "No booking found" });
    }

    res.status(200).json(booking);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const CreateBooking = async (req, res) => {
  const { date, time, user, doctor, issue } = req.body;

  const newBooking = new Booking({
    date,
    time,
    user,
    doctor,
    issue,
  });

  try {
    await newBooking.save();

    res
      .status(201)
      .json({ message: "Booking created successfully", booking: newBooking });
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const UpdateBooking = async (req, res) => {
  const { id } = req.params;
  const booking = req.body;

  try {
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).send(`No booking with id: ${id}`);

    const updatedBooking = await Booking.findByIdAndUpdate(id, booking, {
      new: true,
    });

    res.json(updatedBooking);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export const DeleteBooking = async (req, res) => {
  const { id } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).send(`No booking with id: ${id}`);

    await Booking.findByIdAndDelete(id);

    res.json({ message: "Booking deleted successfully." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export const slotAvailability = async (req, res) => {
  const { date, time, doctorId } = req.body;
  if (!doctorId) {
    return res.status(400).json({ message: "Doctor ID is required" });
  }

  try {
    const booking = await Booking.findOne({ doctor: doctorId, date, time });

    if (!booking) {
      return res.status(200).json({ message: "Slot is available" });
    }

    res.status(409).json({ message: "Slot is not available" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};
