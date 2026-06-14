import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import api from "../services/api";

function Navbar() {
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = async () => {
    try {
      await api.post("/auth/logout");

      localStorage.removeItem("user");
      localStorage.removeItem("reservationExpiry");
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <nav className="bg-zinc-900 border-b border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <h1
          onClick={() => navigate("/movies")}
          className="text-2xl font-bold text-orange-500 cursor-pointer"
        >
          BookMyEvent
        </h1>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-4">
          <button
            onClick={() => navigate("/my-bookings")}
            className="text-zinc-300 hover:text-orange-500"
          >
            My Bookings
          </button>

          <div className="w-10 h-10 rounded-full bg-orange-500 text-white flex items-center justify-center font-bold">
            {user?.username?.charAt(0)?.toUpperCase() || "U"}
          </div>

          <button
            onClick={handleLogout}
            className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg"
          >
            Logout
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-white text-2xl"
        >
          {isOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden border-t border-zinc-800 bg-zinc-900 px-4 py-4">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-orange-500 text-white flex items-center justify-center font-bold">
              {user?.username?.charAt(0)?.toUpperCase() || "U"}
            </div>

            <p className="text-white">{user?.username}</p>
          </div>

          <button
            onClick={() => {
              navigate("/my-bookings");
              setIsOpen(false);
            }}
            className="block w-full text-left text-zinc-300 py-2"
          >
            My Bookings
          </button>

          <button
            onClick={handleLogout}
            className="mt-3 w-full bg-orange-500 text-white py-2 rounded-lg"
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
