import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";

function SeatSelection() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [seats, setSeats] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);

  useEffect(() => {
    fetchSeats();
  }, []);

  const handleContinue = async () => {
    try {
      await api.post(`/movies/${id}/reserve`, {
        seatNumbers: selectedSeats,
      });

      navigate(`/movies/${id}/booking`, {
        state: {
          selectedSeats,
          movieId: id,
        },
      });
    } catch (error) {
      alert(error.response?.data?.message);
    }
  };

  const fetchSeats = async () => {
    try {
      const response = await api.get(`/movies/${id}/seats`);

      setSeats(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSeatClick = (seat) => {
    if (seat.status !== "available") return;

    const alreadySelected = selectedSeats.includes(seat.seatNumber);

    if (alreadySelected) {
      setSelectedSeats(
        selectedSeats.filter((item) => item !== seat.seatNumber)
      );

      return;
    }

    if (selectedSeats.length >= 5) {
      alert("You can select only 5 seats");
      return;
    }

    setSelectedSeats([...selectedSeats, seat.seatNumber]);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center">BK Cinemas 🎬</h1>

        <p className="text-center text-gray-500 mt-2">Select Your Seats</p>

        <div className="bg-gray-300 text-center py-3 rounded-lg mt-8 mb-10 font-semibold">
          SCREEN
        </div>

        <div className="grid grid-cols-5 md:grid-cols-10 gap-3">
          {seats.map((seat) => (
            <button
              key={seat.seatNumber}
              onClick={() => handleSeatClick(seat)}
              className={`
                p-2 rounded-lg font-medium
                ${
                  selectedSeats.includes(seat.seatNumber)
                    ? "bg-orange-500 text-white"
                    : seat.status === "available"
                    ? "bg-green-500 text-white"
                    : seat.status === "reserved"
                    ? "bg-yellow-500 text-white"
                    : "bg-red-500 text-white"
                }
              `}
            >
              {seat.seatNumber}
            </button>
          ))}
        </div>

        <div className="flex gap-6 mt-8 justify-center flex-wrap">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-green-500 rounded"></div>
            <span>Available</span>
          </div>

          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-yellow-500 rounded"></div>
            <span>Reserved</span>
          </div>

          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-red-500 rounded"></div>
            <span>Booked</span>
          </div>

          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-orange-500 rounded"></div>
            <span>Selected</span>
          </div>
        </div>

        <div className="mt-8 text-center">
          <h2 className="text-xl font-bold">Selected Seats</h2>

          <p className="text-gray-600 mt-2">
            {selectedSeats.length
              ? selectedSeats.join(", ")
              : "No seats selected"}
          </p>
        </div>

        <div className="flex justify-center">
          <button
            disabled={selectedSeats.length === 0}
            onClick={handleContinue}
            className="mt-8 bg-orange-500 text-white px-8 py-3 rounded-xl disabled:bg-gray-400"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}

export default SeatSelection;
