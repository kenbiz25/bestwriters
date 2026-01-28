import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "@/auth/AuthContext";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { QrCode, X } from "lucide-react";

const WECHAT_QR = "/images/wechat-qr.png";

export default function Header() {
  const { user, logout } = useAuthContext();
  const [showWeChat, setShowWeChat] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-50 bg-header/95 backdrop-blur border-b border-border">
        <div className="container flex items-center justify-between h-16 px-4">
          {/* LEFT: BRAND */}
          <Link
            to="/"
            className="font-display font-bold text-xl text-header hover:text-accent transition"
          >
            BestAcademicWriters
          </Link>

          {/* CENTER: NAV (desktop) */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            <Link to="/" className="hover:text-accent transition">
              Home
            </Link>
            <Link to="/services" className="hover:text-accent transition">
              Services
            </Link>
            <Link to="/how-it-works" className="hover:text-accent transition">
              How it Works
            </Link>
            <Link to="/prices" className="hover:text-accent transition">
              Prices
            </Link>
            <Link to="/guarantees" className="hover:text-accent transition">
              Guarantees
            </Link>
            <Link
              to="/order"
              className="text-accent font-semibold hover:underline transition"
            >
              Order Now
            </Link>
          </nav>

          {/* RIGHT: ACTIONS */}
          <div className="flex items-center gap-3">
            {/* Theme Toggle */}
            <ThemeToggle />

            {/* WeChat */}
            <button
              onClick={() => setShowWeChat(true)}
              className="hidden md:flex items-center gap-1 px-3 py-1 rounded-md bg-accent text-accent-foreground text-sm hover:opacity-90 transition"
            >
              <QrCode className="h-4 w-4" />
              WeChat
            </button>

            {/* Auth */}
            {user ? (
              <>
                <span className="hidden md:inline text-xs text-muted-foreground">
                  {user.email}
                </span>
                <button
                  onClick={logout}
                  className="px-3 py-1 rounded-md bg-muted hover:bg-muted/80 text-sm transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="px-3 py-1 rounded-md bg-primary text-primary-foreground text-sm hover:opacity-90 transition"
              >
                Login
              </Link>
            )}

            {/* Mobile menu toggle */}
            <button
              className="md:hidden p-2 rounded-md text-header hover:text-accent transition"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation menu"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {mobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* MOBILE NAVIGATION */}
        {mobileMenuOpen && (
          <nav className="md:hidden bg-header/95 border-t border-border">
            <ul className="flex flex-col gap-2 px-4 py-4 text-sm font-medium">
              <li>
                <Link
                  to="/"
                  className="block hover:text-accent transition"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/services"
                  className="block hover:text-accent transition"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  to="/how-it-works"
                  className="block hover:text-accent transition"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  How it Works
                </Link>
              </li>
              <li>
                <Link
                  to="/prices"
                  className="block hover:text-accent transition"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Prices
                </Link>
              </li>
              <li>
                <Link
                  to="/guarantees"
                  className="block hover:text-accent transition"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Guarantees
                </Link>
              </li>
              <li>
                <Link
                  to="/order"
                  className="block text-accent font-semibold hover:underline transition"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Order Now
                </Link>
              </li>
              <li>
                <button
                  onClick={() => setShowWeChat(true)}
                  className="flex items-center gap-1 px-3 py-1 rounded-md bg-accent text-accent-foreground text-sm hover:opacity-90 transition mt-2"
                >
                  <QrCode className="h-4 w-4" />
                  WeChat
                </button>
              </li>
            </ul>
          </nav>
        )}
      </header>

      {/* -------------------- WECHAT MODAL -------------------- */}
      {showWeChat && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center">
          <div className="bg-card p-6 rounded-xl relative text-center max-w-sm w-full shadow-xl dark:bg-card-dark">
            <button
              onClick={() => setShowWeChat(false)}
              className="absolute top-3 right-3 text-muted-foreground hover:text-foreground"
            >
              <X className="h-5 w-5" />
            </button>

            <h3 className="text-lg font-semibold mb-2 text-foreground">
              Chat with us on WeChat
            </h3>
            <p className="text-sm text-muted-foreground mb-4 dark:text-muted-foreground/80">
              Open WeChat and scan the QR code below
            </p>

            <img
              src={WECHAT_QR}
              alt="WeChat QR"
              className="w-48 h-48 mx-auto border rounded-lg"
            />
          </div>
        </div>
      )}
    </>
  );
}
