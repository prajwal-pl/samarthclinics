import { Booking } from "../models/booking.js";

export const GetBookings = async (req, res) => {
  try {
    const bookings = await Booking.find();

    if (!bookings) {
      return res.status(404).json({ message: "No bookings found" });
    }

    res.status(200).json(bookings);
  } catch (error) {
    res.status(404).json({ message: error.message });
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
  const booking = req.body;

  const newBooking = new Booking(booking);

  try {
    await newBooking.save();

    res.status(201).json(newBooking);
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

    await Booking.findByIdAndRemove(id);

    res.json({ message: "Booking deleted successfully." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export const slotAvailability = async (req, res) => {
  const { doctorId, date, time } = req.body;

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
