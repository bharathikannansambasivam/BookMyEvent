import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function Home() {
  const navigate = useNavigate();
  useEffect(() => {
    const user = localStorage.getItem("user");

    if (user) {
      navigate("/movies");
    }
  }, []);

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-6">
      <div className="max-w-4xl text-center">
        <div className="inline-block px-4 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-sm mb-6">
          Real-Time Movie Ticket Booking
        </div>

        <h1 className="text-5xl md:text-7xl font-black text-white">
          Book<span className="text-orange-500">MyEvent</span>
        </h1>

        <p className="mt-6 text-zinc-400 text-lg md:text-xl max-w-2xl mx-auto">
          Book movie tickets instantly, reserve seats in real time, and enjoy a
          seamless cinema booking experience.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-10">
          <button
            onClick={() => navigate("/login")}
            className="
              bg-orange-500
              hover:bg-orange-600
              text-white
              px-8
              py-3
              rounded-xl
              font-semibold
              transition-all
            "
          >
            Login
          </button>

          <button
            onClick={() => navigate("/register")}
            className="
              border
              border-zinc-700
              bg-zinc-900
              hover:bg-zinc-800
              text-white
              px-8
              py-3
              rounded-xl
              font-semibold
              transition-all
            "
          >
            Register
          </button>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mt-20">
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
            <h3 className="text-white font-bold text-lg">Real-Time Seats</h3>

            <p className="text-zinc-400 mt-2 text-sm">
              Prevent double booking with live seat reservations.
            </p>
          </div>

          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
            <h3 className="text-white font-bold text-lg">Fast Booking</h3>

            <p className="text-zinc-400 mt-2 text-sm">
              Select seats and confirm tickets within seconds.
            </p>
          </div>

          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
            <h3 className="text-white font-bold text-lg">Mobile Friendly</h3>

            <p className="text-zinc-400 mt-2 text-sm">
              Works smoothly across desktop, tablet and mobile.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
