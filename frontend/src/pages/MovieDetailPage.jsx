import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  addReview,
  getMovieById,
  addToWatchlist,
  removeFromWatchlist,
} from "../lib/api";
import { AuthContext } from "../context/AuthContext";
import StarRating from "../components/StarRating";

export default function MovieDetailPage() {
  const { id } = useParams();
  const [movieData, setMovieData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [rating, setRating] = useState(0);
  const [text, setText] = useState("");
  const [error, setError] = useState(""); // <-- added
  const { user, token } = useContext(AuthContext);

  const fetchMovie = () => {
    getMovieById(id)
      .then(setMovieData)
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchMovie();
  }, [id]);

  const submitReview = async (e) => {
    e.preventDefault();

    if (!rating || rating < 1 || rating > 5) {
      setError("Please select a star rating (1–5).");
      return;
    }

    try {
      await addReview(id, { rating, text }, token);
      setText("");
      setRating(0);
      setError(""); // clear any previous error
      fetchMovie();
    } catch (err) {
      setError("Failed to submit review. Try again.");
    }
  };

  const toggleWatchlist = async () => {
    if (!token) {
      setError("Login to add to watchlist.");
      return;
    }
    if (user.watchlist?.includes(id)) {
      await removeFromWatchlist(user._id, id, token);
    } else {
      await addToWatchlist(user._id, id, token);
    }
  };

  if (loading) return <div className="p-6">Loading...</div>;
  if (!movieData) return <div className="p-6">Movie not found</div>;

  const { movie, reviews } = movieData;

  return (
    <main className="max-w-5xl mx-auto p-6 space-y-6">
      {/* Movie Details */}
      <div className="flex flex-col md:flex-row gap-6 bg-white p-4 rounded shadow">
        <img
          src={movie.posterUrl || "https://placehold.co/400x600"}
          alt={movie.title}
          className="w-64 h-96 object-cover rounded"
        />
        <div>
          <h1 className="text-3xl font-bold">{movie.title}</h1>
          <p className="text-gray-600">
            {movie.genre} • {movie.releaseYear}
          </p>
          <p className="mt-2 text-yellow-600 font-semibold">
            Avg Rating: {movie.averageRating ?? "N/A"}
          </p>
          <button
            onClick={toggleWatchlist}
            className="mt-4 px-4 py-2 rounded bg-gray-900 text-white"
          >
            {user?.watchlist?.includes(id)
              ? "Remove from Watchlist"
              : "Add to Watchlist"}
          </button>
          <p className="mt-4">{movie.synopsis || "No synopsis"}</p>
        </div>
      </div>

      {/* Reviews Section */}
      <section>
        <h2 className="text-xl font-bold mb-2">Reviews</h2>
        {reviews?.length ? (
          <ul className="space-y-3">
            {reviews.map((r) => (
              <li key={r._id} className="border p-3 rounded">
                <div className="flex justify-between">
                  <span className="font-medium">{r.user?.username}</span>
                  <StarRating value={r.rating} readOnly />
                </div>
                <p>{r.text}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No reviews yet.</p>
        )}
      </section>

      {/* Review Form */}
      {token && (
        <form onSubmit={submitReview} className="space-y-3">
          {error && <p className="text-red-600">{error}</p>}{" "}
          {/* error shown here */}
          <StarRating value={rating} onChange={setRating} />
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Write a review..."
            className="w-full border p-2 rounded"
          />
          <button className="px-4 py-2 bg-blue-600 text-white rounded">
            Post Review
          </button>
        </form>
      )}
    </main>
  );
}
