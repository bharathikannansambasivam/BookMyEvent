import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../services/api";

function Booking() {
  const location = useLocation();
  const navigate = useNavigate();

  const selectedSeats = location.state?.selectedSeats || [];
  const movieId = location.state?.movieId;

  const [movie, setMovie] = useState(null);
  const [timeLeft, setTimeLeft] = useState(null);
  const [loading, setLoading] = useState(false);

  const ticketPrice = 150;
  const totalAmount = selectedSeats.length * ticketPrice;

  useEffect(() => {
    fetchMovie();
  }, []);

  useEffect(() => {
    if (timeLeft === null) return;

    if (timeLeft <= 0) {
      alert("Reservation expired");
      navigate(`/movies/${movieId}/seats`);
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);
  const fetchMovie = async () => {
    try {
      const response = await api.get(`/movies/${movieId}`);

      setMovie(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const expiry = Number(localStorage.getItem("reservationExpiry"));

    if (!expiry) return;

    const remaining = Math.floor((expiry - Date.now()) / 1000);

    setTimeLeft(remaining > 0 ? remaining : 0);
  }, []);
  const handleConfirmBooking = async () => {
    try {
      setLoading(true);

      const response = await api.post("/bookings", {
        movieId,
        seatNumbers: selectedSeats,
      });

      alert(response.data.message);
      localStorage.removeItem("reservationExpiry");

      navigate("/my-bookings");
    } catch (error) {
      console.log(error);

      alert(error.response?.data?.message || "Booking failed");
    } finally {
      setLoading(false);
    }
  };

  const minutes = String(Math.floor(timeLeft / 60)).padStart(2, "0");

  const seconds = String(timeLeft % 60).padStart(2, "0");

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-3xl shadow-2xl p-6">
        <h1 className="text-2xl font-bold text-center text-white">
          Booking Summary
        </h1>

        <div className="mt-5 bg-orange-500/10 border border-orange-500 rounded-xl p-4 text-center">
          <p className="text-orange-400 text-sm">
            Reservation expires in{" "}
            <span className="font-bold">
              {minutes}:{seconds}
            </span>
          </p>
        </div>

        <div className="mt-6 flex gap-4 items-center">
          <img
            src={movie?.poster}
            alt={movie?.title}
            className="w-20 h-28 rounded-xl object-cover"
          />

          <div>
            <h2 className="text-2xl font-semibold text-white">
              {movie?.title || "Loading..."}
            </h2>

            <p className="text-zinc-400 mt-1">BK Cinemas</p>

            <div className="flex gap-2 mt-2">
              <span className="bg-zinc-800 text-zinc-300 px-2 py-1 rounded-lg text-xs">
                {movie?.language}
              </span>

              <span className="bg-zinc-800 text-zinc-300 px-2 py-1 rounded-lg text-xs">
                {movie?.duration}
              </span>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <p className="text-sm text-zinc-400 mb-3">Selected Seats</p>

          <div className="flex flex-wrap gap-2">
            {selectedSeats.map((seat) => (
              <span
                key={seat}
                className="px-3 py-1 bg-orange-500 text-white rounded-full text-sm font-medium"
              >
                {seat}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-6 border-t border-zinc-700 pt-4 space-y-3">
          <div className="flex justify-between">
            <span className="text-zinc-400">Tickets</span>

            <span className="font-semibold text-white">
              {selectedSeats.length}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-zinc-400">Price / Ticket</span>

            <span className="font-semibold text-white">₹{ticketPrice}</span>
          </div>

          <div className="flex justify-between text-lg font-bold">
            <span className="text-white">Total Amount</span>

            <span className="text-orange-500">₹{totalAmount}</span>
          </div>
        </div>

        <button
          onClick={handleConfirmBooking}
          disabled={loading}
          className="w-full mt-6 bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-xl font-semibold transition-all disabled:bg-zinc-700"
        >
          {loading ? "Booking..." : "Confirm Booking"}
        </button>
      </div>
    </div>
  );
}

export default Booking;
