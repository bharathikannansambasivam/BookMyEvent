import express from "express";
import { createBooking } from "../controllers/bookingController.js";
import protect from "../middleware/authMiddleware.js";
import { getMyBookings } from "../controllers/movieController.js";

const router = express.Router();

router.post("/", protect, createBooking);
router.get("/my-bookings", protect, getMyBookings);
export default router;
