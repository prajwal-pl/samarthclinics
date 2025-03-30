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

router.get("/single/:id", GetBooking);
router.get("/:id", GetBookings);
router.post("/create", CreateBooking);
router.post("/update/:id", UpdateBooking);
router.delete("/delete/:id", DeleteBooking);
router.post("/time-slot", slotAvailability);

export default router;
