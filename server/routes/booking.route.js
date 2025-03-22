import express from "express";
import {
  CreateBooking,
  DeleteBooking,
  GetBooking,
  GetBookings,
  UpdateBooking,
} from "../controllers/booking.controller.js";

const router = express.Router();

router.get("/", GetBookings);
router.get("/:id", GetBooking);
router.post("/create/:id", CreateBooking);
router.post("/update/:id", UpdateBooking);
router.delete("/delete/:id", DeleteBooking);

export default router;
