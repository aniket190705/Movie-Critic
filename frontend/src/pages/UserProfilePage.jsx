import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { getUserById, getWatchlist, removeFromWatchlist } from "../lib/api";
import { Link } from "react-router-dom";

export default function UserProfilePage() {
  const { user, token } = useContext(AuthContext);
  const [profile, setProfile] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [watchlist, setWatchlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!user || !token) return;

    const fetchData = async () => {
      try {
        setLoading(true);
        setError("");
        // fetch user info + reviews
        const data = await getUserById(user._id);
        setProfile(data.user);
        setReviews(data.reviews || []);

        // fetch watchlist separately
        const wl = await getWatchlist(user._id, token);
        setWatchlist(wl || []);
      } catch (err) {
        setError("Failed to load profile");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user, token]);

  const handleRemoveFromWatchlist = async (movieId) => {
    try {
      await removeFromWatchlist(user._id, movieId, token);
      setWatchlist(watchlist.filter((m) => m._id !== movieId));
    } catch (err) {
      alert("Failed to remove movie");
    }
  };

  if (loading) return <p className="p-6">Loading...</p>;
  if (error) return <p className="p-6 text-red-600">{error}</p>;

  return (
    <main className="max-w-4xl mx-auto p-6 space-y-8">
      {/* Profile Info */}
      <section className="bg-white p-6 shadow rounded">
        <div className="flex items-center gap-4">
          <img
            src={profile?.profilePic || "https://placehold.co/80x80"}
            alt="Profile"
            className="w-20 h-20 rounded-full object-cover"
          />
          <div>
            <h1 className="text-2xl font-bold">{profile?.username}</h1>
            <p className="text-gray-600">{profile?.email}</p>
            <p className="text-sm text-gray-500">
              Joined: {new Date(profile?.joinDate).toLocaleDateString()}
            </p>
          </div>
        </div>
      </section>

      {/* Review History */}
      <section className="bg-white p-6 shadow rounded">
        <h2 className="text-xl font-semibold mb-4">Review History</h2>
        {reviews.length === 0 ? (
          <p className="text-gray-600">No reviews yet.</p>
        ) : (
          <ul className="space-y-3">
            {reviews.map((r) => (
              <li key={r._id} className="border-b pb-3">
                <Link
                  to={`/movies/${r.movie._id}`}
                  className="font-semibold text-blue-600"
                >
                  {r.movie.title}
                </Link>
                <p className="text-yellow-500">Rating: {r.rating} ★</p>
                <p className="text-gray-700">{r.text}</p>
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* Watchlist */}
      <section className="bg-white p-6 shadow rounded">
        <h2 className="text-xl font-semibold mb-4">My Watchlist</h2>
        {watchlist.length === 0 ? (
          <p className="text-gray-600">No movies in watchlist.</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            {watchlist.map((m) => (
              <div
                key={m._id}
                className="relative bg-white rounded shadow overflow-hidden"
              >
                <Link to={`/movies/${m._id}`}>
                  <img
                    src={m.posterUrl || "https://via.placeholder.com/300x450"}
                    alt={m.title}
                    className="h-48 w-full object-cover"
                  />
                  <div className="p-2">
                    <p className="font-semibold">{m.title}</p>
                    <p className="text-sm text-gray-600">{m.genre}</p>
                  </div>
                </Link>
                <button
                  onClick={() => handleRemoveFromWatchlist(m._id)}
                  className="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 rounded text-xs"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
