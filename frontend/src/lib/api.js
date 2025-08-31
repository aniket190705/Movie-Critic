const BASE = import.meta.env.VITE_API_BASE?.replace(/\/$/, '') || "http://localhost:5000/api";

async function http(path, { method = "GET", token, body } = {}) {
    console.log(`API Request: ${method} ${BASE}${path}`);
    const res = await fetch(`${BASE}${path}`, {
        method,
        headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: body ? JSON.stringify(body) : undefined,
    });

    if (!res.ok) {
        let msg = "Something went wrong";
        try {
            const data = await res.json();
            msg = data.message || msg;
        } catch (err) {
            console.error("Error parsing error response:", err);
        }
        throw new Error(msg);  // ✅ Always throw with message
    }


    return res.status === 204 ? null : res.json();
}

// ---------- AUTH ----------
export const registerUser = (data) => {
    console.log(data);
    return http("/auth/register", { method: "POST", body: data });
};

export const loginUser = (data) =>
    http("/auth/login", { method: "POST", body: data });

// ---------- MOVIES ----------
export const getMovies = (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return http(`/movies${query ? `?${query}` : ""}`);
};

export const getMovieById = (id) => http(`/movies/${id}`);

export const addReview = (id, { rating, text }, token) =>
    http(`/movies/${id}/reviews`, { method: "POST", token, body: { rating, text } });

// ---------- USERS ----------
export const getUserById = (id) => http(`/users/${id}`);

export const updateUser = (id, updates, token) =>
    http(`/users/${id}`, { method: "PUT", token, body: updates });

export const getWatchlist = (id, token) =>
    http(`/users/${id}/watchlist`, { token });

export const addToWatchlist = (id, movieId, token) =>
    http(`/users/${id}/watchlist`, { method: "POST", token, body: { movieId } });

export const removeFromWatchlist = (id, movieId, token) =>
    http(`/users/${id}/watchlist/${movieId}`, { method: "DELETE", token });
