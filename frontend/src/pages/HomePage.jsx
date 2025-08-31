import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getMovies } from "../lib/api";

export default function HomePage() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMovies({ limit: 6 })
      .then((res) => setMovies(res.movies || res))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="p-6">Loading...</div>;

  return (
    <main className="max-w-7xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Trending Movies</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {movies.map((m) => (
          <Link
            to={`/movies/${m._id}`}
            key={m._id}
            className="bg-white rounded-xl shadow hover:shadow-lg"
          >
            <img
              src={m.posterUrl || "https://via.placeholder.com/300x450"}
              alt={m.title}
              className="h-64 w-full object-cover"
            />
            <div className="p-3">
              <h2 className="font-semibold">{m.title}</h2>
              <p className="text-sm text-gray-600">{m.genre}</p>
              <p className="text-sm font-medium text-yellow-600">
                ★ {m.averageRating ?? "N/A"}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
