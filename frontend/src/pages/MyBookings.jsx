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
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">My Bookings</h1>

        <div className="space-y-4">
          {bookings.map((booking) => (
            <div key={booking._id} className="bg-white p-6 rounded-2xl shadow">
              <h2 className="text-2xl font-bold">{booking.movieId.title}</h2>

              <p className="mt-2 text-gray-600">
                Seats: {booking.seats.join(", ")}
              </p>

              <p className="mt-2 text-gray-600">
                Booked On: {new Date(booking.createdAt).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MyBookings;
