import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../services/api";

function Booking() {
  const location = useLocation();
  const navigate = useNavigate();

  const selectedSeats = location.state?.selectedSeats || [];
  const movieId = location.state?.movieId;

  const [movie, setMovie] = useState(null);
  const [timeLeft, setTimeLeft] = useState(120);
  const [loading, setLoading] = useState(false);

  const ticketPrice = 150;
  const totalAmount = selectedSeats.length * ticketPrice;

  useEffect(() => {
    fetchMovie();
  }, []);

  useEffect(() => {
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

  const handleConfirmBooking = async () => {
    try {
      setLoading(true);

      const response = await api.post("/bookings", {
        movieId,
        seatNumbers: selectedSeats,
      });

      alert(response.data.message);

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
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="bg-white rounded-3xl shadow-lg p-8 w-full max-w-2xl">
        <h1 className="text-3xl font-bold text-center">Booking Summary</h1>

        <div className="mt-8 space-y-4">
          <div>
            <h2 className="font-semibold text-gray-500">Movie</h2>

            <p className="text-xl font-bold">{movie?.title || "Loading..."}</p>
          </div>

          <div>
            <h2 className="font-semibold text-gray-500">Theatre</h2>

            <p className="text-xl font-bold">BK Cinemas</p>
          </div>

          <div>
            <h2 className="font-semibold text-gray-500">Seats</h2>

            <p className="text-xl font-bold">{selectedSeats.join(", ")}</p>
          </div>

          <div>
            <h2 className="font-semibold text-gray-500">Tickets</h2>

            <p className="text-xl font-bold">{selectedSeats.length}</p>
          </div>

          <div>
            <h2 className="font-semibold text-gray-500">Price Per Ticket</h2>

            <p className="text-xl font-bold">₹{ticketPrice}</p>
          </div>

          <div>
            <h2 className="font-semibold text-gray-500">Total Amount</h2>

            <p className="text-2xl font-bold text-green-600">₹{totalAmount}</p>
          </div>
        </div>

        <div className="mt-8 bg-red-50 border border-red-200 rounded-xl p-4 text-center">
          <p className="text-red-600 font-semibold">Reservation expires in</p>

          <h2 className="text-3xl font-bold text-red-600">
            {minutes}:{seconds}
          </h2>
        </div>

        <button
          onClick={handleConfirmBooking}
          disabled={loading}
          className="w-full mt-8 bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-xl font-semibold disabled:bg-gray-400"
        >
          {loading ? "Booking..." : "Confirm Booking"}
        </button>
      </div>
    </div>
  );
}

export default Booking;
