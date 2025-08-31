import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser, getUserById } from "../lib/api";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";
export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      // backend should return token + id
      const { token, id } = await loginUser({ email, password });
      console.log(token, id);
      const me = await getUserById(id);
      login(token, { ...me.user, _id: id, watchlist: me.user.watchlist });
      navigate("/");
    } catch (e) {
      setError(e.message || "Login failed");
    }
  };

  return (
    <main className="max-w-md mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Login to use the app</h1>
      <form onSubmit={submit} className="space-y-3 bg-white p-4 rounded shadow">
        {error && <p className="text-red-600">{error}</p>}
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="Email"
          className="w-full border rounded px-3 py-2"
        />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Password"
          className="w-full border rounded px-3 py-2"
        />
        <button className="w-full px-4 py-2 rounded bg-blue-600 text-white">
          Login
        </button>
        <h3>
          Not registered?{" "}
          <Link to="/register" className="text-blue-600">
            Register here
          </Link>
        </h3>
      </form>
    </main>
  );
}
