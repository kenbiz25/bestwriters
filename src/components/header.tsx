
import { Link } from "react-router-dom";
import { useAuthContext } from "@/auth/AuthContext";

export default function Header() {
  const { user, logout } = useAuthContext();

  return (
    <header className="flex items-center justify-between p-4 border-b">
      <nav className="flex items-center gap-4">
        <Link to="/">Home</Link>
        <Link to="/services">Our Services</Link>
        <Link to="/how-it-works">How it Works</Link>
        <Link to="/prices">Prices</Link>
        <Link to="/guarantees">Our Guarantees</Link>
        <Link to="/order">Order Now</Link>
      </nav>

      <div className="flex items-center gap-3">
        {user ? (
          <>
            <span className="text-sm">Signed in as {user.email}</span>
            <button
              className="bg-gray-800 text-white px-3 py-1 rounded"
              onClick={logout}
            >
              Logout
            </button>
          </>
        ) : (
          <Link
            to="/login"
            className="bg-black text-white px-3 py-1 rounded"
          >
            Login
          </Link>
        )}
      </div>
    </header>
  );
}
