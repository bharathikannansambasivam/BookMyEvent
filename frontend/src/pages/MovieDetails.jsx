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
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-6xl mx-auto p-6">
        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden md:flex shadow-2xl">
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
            <h1 className="text-5xl font-bold">{movie.title}</h1>

            <div className="flex gap-3 mt-5 flex-wrap">
              <span className="bg-orange-500 text-white px-4 py-2 rounded-full text-sm font-medium">
                {movie.genre}
              </span>

              <span className="bg-zinc-800 text-zinc-300 px-4 py-2 rounded-full text-sm">
                {movie.language}
              </span>

              <span className="bg-zinc-800 text-zinc-300 px-4 py-2 rounded-full text-sm">
                {movie.duration}
              </span>
            </div>

            <p className="text-zinc-400 mt-8 leading-8 text-lg">
              {movie.description}
            </p>

            <div className="mt-10 border-t border-zinc-700 pt-6">
              <h3 className="text-2xl font-bold">BK Cinemas</h3>

              <p className="text-zinc-400 mt-2">Kumbakonam, Tamil Nadu</p>

              <p className="text-sm text-zinc-500 mt-2">Today • 7:00 PM</p>

              <button
                onClick={() => navigate(`/movies/${movie._id}/seats`)}
                className="mt-6 bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-xl font-semibold transition-all"
              >
                Select Seats
              </button>
            </div>
          </div>
        </div>
      </div>

      {error && (
        <div className="max-w-4xl mx-auto mt-4">
          <div className="flex items-center gap-2 bg-red-500/10 border border-red-500 text-red-400 px-4 py-3 rounded-xl">
            <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse"></div>

            <span className="text-sm font-medium">{error}</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default MovieDetails;
