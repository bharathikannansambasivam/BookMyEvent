import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/authRoutes.js";
import movieRoutes from "./routes/movieRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";
import cors from "cors";

import { createServer } from "http";
import { Server } from "socket.io";

import "./config/redis.js";
dotenv.config();
const PORT = process.env.PORT || 5000;

const app = express();
const server = createServer(app);

export const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log("User Connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("User Disconnected:", socket.id);
  });
});
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

app.use("/auth", authRoutes);
app.use("/movies", movieRoutes);
app.use("/bookings", bookingRoutes);
app.get("/", (req, res) => {
  res.send("Server Running");
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("DB Connected Successfully");
    server.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err.message);
  });
