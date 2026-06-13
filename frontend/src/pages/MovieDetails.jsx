import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";

function MovieDetails() {
  const { id } = useParams();

  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const fetchMovie = async () => {
    try {
      const response = await api.get(`/movies/${id}`);

      setMovie(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchMovie();
  }, []);
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading Movie...
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Movie Not Found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-6xl mx-auto p-6">
        <div className="bg-white rounded-3xl shadow-lg overflow-hidden md:flex">
          {/* Poster */}
          <div className="md:w-1/3">
            <img
              src={movie.poster}
              alt={movie.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Details */}
          <div className="md:w-2/3 p-8">
            <h1 className="text-4xl font-bold">{movie.title}</h1>

            <div className="flex gap-3 mt-4 flex-wrap">
              <span className="bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-sm">
                {movie.genre}
              </span>

              <span className="bg-gray-100 px-3 py-1 rounded-full text-sm">
                {movie.language}
              </span>

              <span className="bg-gray-100 px-3 py-1 rounded-full text-sm">
                {movie.duration}
              </span>
            </div>

            <p className="text-gray-600 mt-6 leading-7">{movie.description}</p>

            <div className="mt-8 border-t pt-6">
              <h3 className="text-xl font-bold">BK Cinemas</h3>

              <p className="text-gray-500 mt-1">Kumbakonam, Tamil Nadu</p>

              <p className="text-sm text-gray-400 mt-2">Today • 7:00 PM</p>

              <button
                onClick={navigate(`/movies/${movie._id}/seats`)}
                className="mt-5 bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-xl font-semibold"
              >
                Select Seats
              </button>
            </div>
          </div>
        </div>
      </div>

      {error && (
        <div className="mt-4 flex items-center gap-2 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl">
          <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse"></div>

          <span className="text-sm font-medium">{error}</span>
        </div>
      )}
    </div>
  );
}

export default MovieDetails;
