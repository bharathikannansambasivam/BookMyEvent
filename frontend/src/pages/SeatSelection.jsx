import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";
import socket from "../socket";

function SeatSelection() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [seats, setSeats] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [error, setError] = useState("");
  useEffect(() => {
    fetchSeats();
  }, []);
  useEffect(() => {
    socket.on("seat-reserved", (data) => {
      console.log("Received socket Event:", data);

      if (data.movieId === id) {
        fetchSeats();
      }
    });

    return () => {
      console.log("Removing seat-reserved listener");
      socket.off("seat-reserved");
    };
  }, [id]);
  const handleContinue = async () => {
    try {
      await api.post(`/movies/${id}/reserve`, {
        seatNumbers: selectedSeats,
      });
      localStorage.setItem("reservationExpiry", Date.now() + 300000);
      navigate(`/movies/${id}/booking`, {
        state: {
          selectedSeats,
          movieId: id,
        },
      });
    } catch (error) {
      setError(
        error.response?.data?.message || "Some seats are already reserved"
      );

      fetchSeats();
    }
  };

  const fetchSeats = async () => {
    try {
      const response = await api.get(`/movies/${id}/seats`);

      setSeats(response.data);

      const myReservedSeats = response.data
        .filter((seat) => seat.status === "my-reserved")
        .map((seat) => seat.seatNumber);
      setSelectedSeats(myReservedSeats);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSeatClick = async (seat) => {
    if (seat.status === "my-reserved") {
      try {
        await api.delete(`/movies/${id}/unreserve`, {
          data: {
            seatNumber: seat.seatNumber,
          },
        });

        fetchSeats();

        return;
      } catch (error) {
        console.log(error);
      }
    }
    if (seat.status === "reserved" || seat.status === "booked") {
      return;
    }

    const alreadySelected = selectedSeats.includes(seat.seatNumber);

    if (alreadySelected) {
      setSelectedSeats(
        selectedSeats.filter((item) => item !== seat.seatNumber)
      );

      return;
    }

    if (selectedSeats.length >= 5) {
      setError("You can select only 5 seats");
      return;
    }

    setSelectedSeats([...selectedSeats, seat.seatNumber]);
  };
  return (
    <div className="min-h-screen bg-zinc-950 text-white py-10 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center">BK Cinemas</h1>

        <p className="text-center text-zinc-400 mt-2">Choose Your Seats</p>
        {/* Screen */}
        <div className="flex justify-center mt-16">
          <div className="w-[75%]">
            <div className="h-2 rounded-full bg-orange-500 shadow-[0_0_30px_#f97316]"></div>

            <p className="text-center text-zinc-500 mt-4 tracking-[0.3em] text-sm">
              SCREEN
            </p>
          </div>
        </div>
        {error && (
          <div className="mt-6 max-w-xl mx-auto bg-red-500/10 border border-red-500 text-red-400 px-4 py-3 rounded-xl text-center">
            {error}
          </div>
        )}

        {/* Legend */}
        <div className="flex justify-center gap-8 mt-10 flex-wrap">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-gray-300"></div>
            <span className="text-sm text-zinc-300">Available</span>
          </div>

          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <span className="text-sm text-zinc-300">Reserved</span>
          </div>

          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <span className="text-sm text-zinc-300">Booked</span>
          </div>

          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-orange-500"></div>
            <span className="text-sm text-zinc-300">Selected</span>
          </div>
        </div>

        {/* Seats */}
        <div className="mt-16 flex justify-center">
          <div className="grid grid-cols-11 gap-5 p-2">
            {seats.map((seat, index) => (
              <React.Fragment key={seat.seatNumber}>
                {index % 10 === 5 && <div></div>}

                <button
                  onClick={() => handleSeatClick(seat)}
                  className={`
                    w-8 h-9
                  sm:w-12 sm:h-10
                  rounded-t-lg rounded-b-md
                  font-semibold text-xs
                  transition-all duration-200
                  hover:scale-110
                  ${
                    selectedSeats.includes(seat.seatNumber)
                      ? "bg-orange-500 text-white shadow-lg shadow-orange-500/40"
                      : seat.status === "available"
                      ? "bg-gray-200 text-black hover:bg-white"
                      : seat.status === "my-reserved"
                      ? "bg-yellow-500 text-white"
                      : seat.status === "reserved"
                      ? "bg-yellow-500 text-white"
                      : "bg-red-500 text-white"
                  }
                `}
                >
                  {seat.seatNumber}
                </button>
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Selected Seats */}
        <div className="max-w-2xl mx-auto mt-16">
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
            <h2 className="text-xl font-bold">Selected Seats</h2>

            <div className="mt-4 flex flex-wrap gap-2">
              {selectedSeats.length > 0 ? (
                selectedSeats.map((seat) => (
                  <span
                    key={seat}
                    className="px-4 py-2 bg-orange-500 rounded-full text-sm font-medium"
                  >
                    {seat}
                  </span>
                ))
              ) : (
                <p className="text-zinc-400">No seats selected</p>
              )}
            </div>

            <button
              disabled={selectedSeats.length === 0}
              onClick={handleContinue}
              className="
              w-full
              mt-6
              bg-orange-500
              hover:bg-orange-600
              py-4
              rounded-xl
              font-semibold
              transition-all
              disabled:bg-zinc-700
            "
            >
              Continue Booking
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SeatSelection;
