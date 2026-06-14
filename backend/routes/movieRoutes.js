import express from "express";
import {
  getMovieById,
  getMovies,
  getSeats,
  reserveSeat,
  unreserveSeat,
} from "../controllers/movieController.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getMovies);
router.get("/:id", getMovieById);
router.get("/:id/seats", protect, getSeats);
router.post("/:id/reserve", protect, reserveSeat);
router.delete("/:id/unreserve", protect, unreserveSeat);
export default router;
