import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import Navbar from "../components/Navbar";

function Movies() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    try {
      const response = await api.get("/movies");
      setMovies(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-white text-xl">
        Loading Movies...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
        <h2 className="text-2xl md:text-3xl font-bold mb-6">Now Showing</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">
          {movies.map((movie) => (
            <div
              key={movie._id}
              className="
                bg-zinc-900
                border
               
            
                border-zinc-800
                rounded-3xl
                overflow-hidden
                hover:scale-105
                transition-all
                duration-300
                group
              "
            >
              {/* Poster */}
              <div className="overflow-hidden">
                <img
                  src={movie.poster}
                  alt={movie.title}
                  className="
                    w-full
                    h-60
                    md:h-96
                    object-cover
                    group-hover:scale-110
                    transition-all
                    duration-500
                  "
                />
              </div>

              {/* Movie Info */}
              <div className="p-3 md:p-5">
                <h3 className="text-lg md:text-2xl font-bold line-clamp-1">
                  {movie.title}
                </h3>

                <p className="text-zinc-400 text-xs md:text-sm mt-1 line-clamp-1">
                  {movie.genre}
                </p>

                <div className="flex justify-between mt-3 text-xs md:text-sm text-zinc-500">
                  <span>{movie.language}</span>
                  <span>{movie.duration}</span>
                </div>

                <button
                  onClick={() => navigate(`/movies/${movie._id}`)}
                  className="
                    w-full
                    mt-4
                    bg-orange-500
                    hover:bg-orange-600
                    text-white
                    py-2
                    md:py-3
                    rounded-xl
                    text-sm
                    md:text-base
                    font-semibold
                    transition-all
                  "
                >
                  Book Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Movies;
