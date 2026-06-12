import Booking from "../models/Booking.js";
import redisClient from "../config/redis.js";

export const createBooking = async (req, res) => {
  try {
    const { movieId, seatNumbers } = req.body;

    for (const seat of seatNumbers) {
      const key = `seat:${movieId}:${seat}`;

      const lockUserId = await redisClient.get(key);

      if (!lockUserId) {
        return res.status(400).json({
          message: `${seat} reservation expired`,
        });
      }
      //127.0.0.1:6379> get "seat:6a2adaeb38d95a36db5737d7:A2,D1,B1,D2"
      //"6a2aa7b74cf029aa0aa53e42"
      if (lockUserId !== req.userId) {
        return res.status(403).json({
          message: `${seat} reserved by another user`,
        });
      }
    }

    const booking = await Booking.create({
      movieId,
      userId: req.userId,
      seats: seatNumbers,
    });

    for (const seat of seatNumbers) {
      const key = `seat:${movieId}:${seat}`;
      await redisClient.del(key);
    }

    res.status(201).json({
      message: "Booking Created Successfully",
      booking,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
