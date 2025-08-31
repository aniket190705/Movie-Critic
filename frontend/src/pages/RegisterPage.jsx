import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser, loginUser, getUserById } from "../lib/api";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";
export default function RegisterPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await registerUser({ username, email, password });
      const { token, id } = await loginUser({ email, password });
      const me = await getUserById(id);
      login(token, { ...me.user, _id: id, watchlist: me.user.watchlist });
      navigate("/");
    } catch (e) {
      // e.message comes from backend "username already exists" or "email already exists"
      setError(e.message || "Registration failed");
    }
  };

  return (
    <main className="max-w-md mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Register to use the app</h1>
      <form onSubmit={submit} className="space-y-3 bg-white p-4 rounded shadow">
        {error && <p className="text-red-600">{error}</p>}
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          className="w-full border rounded px-3 py-2"
        />
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
          Register
        </button>
        <h3>
          Already registered?{" "}
          <Link to="/login" className="text-blue-600">
            Login here
          </Link>
        </h3>
      </form>
    </main>
  );
}
