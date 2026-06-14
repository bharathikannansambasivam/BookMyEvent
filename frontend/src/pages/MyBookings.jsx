import React, { useEffect, useState } from "react";
import api from "../services/api";

function MyBookings() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await api.get("/bookings/my-bookings");

      setBookings(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">My Bookings</h1>

        {bookings.length === 0 ? (
          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-10 text-center">
            <h2 className="text-2xl font-semibold">No Bookings Yet</h2>

            <p className="text-zinc-400 mt-2">
              Start booking your favorite movies.
            </p>
          </div>
        ) : (
          <div className="grid gap-6">
            {bookings.map((booking) => (
              <div
                key={booking._id}
                className="bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden"
              >
                <div className="flex flex-col md:flex-row">
                  {/* Poster */}
                  <img
                    src={booking.movieId.poster}
                    alt={booking.movieId.title}
                    className="w-full md:w-48 h-64 md:h-auto object-cover"
                  />

                  {/* Details */}
                  <div className="p-6 flex-1">
                    <h2 className="text-3xl font-bold">
                      {booking.movieId.title}
                    </h2>

                    <div className="flex gap-2 mt-3 flex-wrap">
                      <span className="bg-orange-500 px-3 py-1 rounded-full text-sm">
                        {booking.movieId.genre}
                      </span>

                      <span className="bg-zinc-800 px-3 py-1 rounded-full text-sm">
                        {booking.movieId.language}
                      </span>

                      <span className="bg-zinc-800 px-3 py-1 rounded-full text-sm">
                        {booking.movieId.duration}
                      </span>
                    </div>

                    <div className="mt-6">
                      <p className="text-zinc-400">Seats</p>

                      <div className="flex gap-2 flex-wrap mt-2">
                        {booking.seats.map((seat) => (
                          <span
                            key={seat}
                            className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm"
                          >
                            {seat}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="mt-6">
                      <p className="text-zinc-400">Booked On</p>

                      <p className="mt-1">
                        {new Date(booking.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default MyBookings;
