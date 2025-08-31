import { Link, NavLink, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Header() {
  const { user, logout } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
        <Link to="/" className="text-xl font-black">
          MovieCritic
        </Link>
        <button
          onClick={() => setOpen(!open)}
          className="sm:hidden px-3 py-2 border rounded"
        >
          ☰
        </button>
        <nav
          className={`${
            open ? "block" : "hidden"
          } sm:block absolute sm:static left-0 right-0 top-full bg-white sm:bg-transparent border-b sm:border-0`}
        >
          <ul className="sm:flex gap-4 p-4 sm:p-0">
            <li>
              <NavLink to="/" className="px-2 py-1 block">
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/movies" className="px-2 py-1 block">
                Movies
              </NavLink>
            </li>
            {user ? (
              <>
                <li>
                  <NavLink to="/profile" className="px-2 py-1 block">
                    Profile
                  </NavLink>
                </li>
                <li>
                  <button
                    onClick={() => {
                      logout();
                      navigate("/");
                    }}
                    className="px-3 py-1 rounded bg-gray-900 text-white"
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <NavLink to="/login" className="px-2 py-1 block">
                    Login
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/register" className="px-2 py-1 block">
                    Register
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
}
