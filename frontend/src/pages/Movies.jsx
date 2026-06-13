import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

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
      <div className="min-h-screen flex items-center justify-center">
        Loading Movies...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-5">
          <h1 className="text-3xl font-bold text-orange-500">BookMyEvent 🎬</h1>

          <p className="text-gray-500 mt-1">
            Book tickets for the latest movies
          </p>
        </div>
      </div>

      {/* Movies */}
      <div className="max-w-7xl mx-auto px-6 py-10">
        <h2 className="text-2xl font-bold mb-6">Now Showing</h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {movies.map((movie) => (
            <div
              key={movie._id}
              className="bg-white rounded-2xl overflow-hidden shadow hover:shadow-lg transition  shadow-xl"
            >
              <img
                src={movie.poster}
                alt={movie.title}
                className="w-full h-80 object-cover"
              />

              <div className="p-4">
                <h3 className="text-xl font-bold">{movie.title}</h3>

                <p className="text-gray-500 text-sm mt-1">{movie.genre}</p>

                <div className="flex justify-between mt-3 text-sm text-gray-600">
                  <span>{movie.language}</span>
                  <span>{movie.duration}</span>
                </div>

                <button
                  onClick={() => navigate(`/movies/${movie._id}`)}
                  className="w-full mt-4 bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-xl font-medium"
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
