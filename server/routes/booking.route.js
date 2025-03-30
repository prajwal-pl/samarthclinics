import express from "express";
import {
  CreateBooking,
  DeleteBooking,
  GetBooking,
  getBookingId,
  GetBookings,
  slotAvailability,
  UpdateBooking,
} from "../controllers/booking.controller.js";

const router = express.Router();

router.get("/single/:id", GetBooking);
router.get("/:id", GetBookings);
router.post("/create", CreateBooking);
router.post("/update/:id", UpdateBooking);
router.delete("/delete/:id", DeleteBooking);
router.post("/time-slot", slotAvailability);
router.post("/:doctorId/details/:userId", getBookingId);

export default router;
