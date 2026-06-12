import Movie from "../models/Movie.js";
import redisClient from "../config/redis.js";
import Booking from "../models/Booking.js";

export const getMovies = async (req, res) => {
  try {
    const movies = await Movie.find();

    res.status(200).json(movies);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getMovieById = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);

    if (!movie) {
      return res.status(404).json({
        message: "Movie Not Found",
      });
    }

    res.status(200).json(movie);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
export const getSeats = async (req, res) => {
  try {
    const rows = ["A", "B", "C", "D", "E"];

    const seats = [];
    const bookings = await Booking.find({
      movieId: req.params.id,
    });
    const bookedSeats = bookings.flatMap((booking) => booking.seats);
    for (const row of rows) {
      for (let i = 1; i <= 10; i++) {
        const seatNumber = `${row}${i}`;

        let status = "available";

        // Check booked
        if (bookedSeats.includes(seatNumber)) {
          status = "booked";
        } else {
          // Check Redis reservation
          const key = `seat:${req.params.id}:${seatNumber}`;

          const reserved = await redisClient.get(key);

          if (reserved) {
            status = "reserved";
          }
        }

        seats.push({
          seatNumber,
          status,
        });
      }
    }

    res.status(200).json(seats);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const reserveSeat = async (req, res) => {
  try {
    const { seatNumbers } = req.body;

    for (const seat of seatNumbers) {
      const key = `seat:${req.params.id}:${seat}`;

      const existingSeat = await redisClient.get(key);

      if (existingSeat) {
        return res.status(400).json({
          message: `${seat} already reserved`,
        });
      }
    }

    for (const seat of seatNumbers) {
      const key = `seat:${req.params.id}:${seat}`;

      await redisClient.set(key, req.userId, {
        EX: 120,
      });
    }

    res.status(200).json({
      message: "Seats reserved successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({
      userId: req.userId,
    }).populate("movieId");

    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
