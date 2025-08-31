// src/pages/MovieListPage.jsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getMovies } from "../lib/api";

function extractMovies(data) {
  if (!data) return [];
  return Array.isArray(data) ? data : data.movies || [];
}

export default function MovieListPage() {
  const [allMovies, setAllMovies] = useState([]); // original fetched list
  const [movies, setMovies] = useState([]); // currently displayed (filtered)
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [genre, setGenre] = useState("");
  const [year, setYear] = useState("");
  const [rating, setRating] = useState("");

  useEffect(() => {
    fetchMovies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [genre, year, rating]);

  const fetchMovies = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await getMovies({ genre, year, rating });
      const list = extractMovies(data);
      setAllMovies(list);
      setMovies(list);
    } catch (err) {
      setError("Failed to load movies");
      setAllMovies([]);
      setMovies([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const q = search.trim().toLowerCase();
    if (!q) {
      // empty search -> restore full fetched list
      setMovies(allMovies);
      return;
    }
    // always filter from the original fetched list (allMovies)
    const filtered = allMovies.filter((m) =>
      (m.title || "").toLowerCase().includes(q)
    );
    setMovies(filtered);
  };

  // optional: live search as user types (uncomment if you want)
  // useEffect(() => {
  //   const q = search.trim().toLowerCase();
  //   if (!q) return setMovies(allMovies);
  //   setMovies(allMovies.filter(m => (m.title||'').toLowerCase().includes(q)));
  // }, [search, allMovies]);

  return (
    <main className="max-w-7xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Movie List</h1>

      {/* Search + Filters */}
      <form
        onSubmit={handleSearch}
        className="flex flex-col md:flex-row gap-4 mb-6 bg-white p-4 shadow rounded"
      >
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by title..."
          className="flex-1 border rounded px-3 py-2"
        />

        <select
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
          className="border rounded px-3 py-2"
        >
          <option value="">All Genres</option>
          <option value="Sci-Fi">Sci-Fi</option>
          <option value="Drama">Drama</option>
          <option value="Action">Action</option>
          <option value="Comedy">Comedy</option>
        </select>

        <input
          type="number"
          value={year}
          onChange={(e) => setYear(e.target.value)}
          placeholder="Year"
          className="w-28 border rounded px-3 py-2"
        />

        <select
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          className="border rounded px-3 py-2"
        >
          <option value="">All Ratings</option>
          <option value="4">4★ & up</option>
          <option value="3">3★ & up</option>
          <option value="2">2★ & up</option>
        </select>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Search
        </button>
      </form>

      {/* Results */}
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-600">{error}</p>
      ) : movies.length === 0 ? (
        <p>No movies found</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {movies.map((movie) => (
            <Link
              to={`/movies/${movie._id}`}
              key={movie._id}
              className="bg-white rounded shadow overflow-hidden group hover:shadow-lg"
            >
              <img
                src={movie.posterUrl || "https://via.placeholder.com/300x450"}
                alt={movie.title}
                className="h-72 w-full object-cover group-hover:scale-105 transition-transform"
              />
              <div className="p-4">
                <h2 className="text-lg font-semibold">{movie.title}</h2>
                <p className="text-sm text-gray-600">
                  {movie.genre} - {movie.releaseYear}
                </p>
                <p className="font-semibold text-yellow-500">
                  Rating: {movie.averageRating || "N/A"}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}
