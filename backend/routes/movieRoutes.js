import express from "express";
import {
  getMovieById,
  getMovies,
  getSeats,
  reserveSeat,
} from "../controllers/movieController.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getMovies);
router.get("/:id", getMovieById);
router.get("/:id/seats", getSeats);
router.post("/:id/reserve", protect, reserveSeat);
export default router;
