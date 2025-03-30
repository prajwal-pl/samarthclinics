import express from "express";
import {
  CreateBooking,
  DeleteBooking,
  GetBooking,
  GetBookings,
  slotAvailability,
  UpdateBooking,
} from "../controllers/booking.controller.js";

const router = express.Router();

router.get("/", GetBookings);
router.get("/:id", GetBooking);
router.post("/create", CreateBooking);
router.post("/update/:id", UpdateBooking);
router.delete("/delete/:id", DeleteBooking);
router.post("/time-slot", slotAvailability); // Assuming this is for getting available time slots

export default router;
