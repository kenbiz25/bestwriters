import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, GraduationCap, QrCode } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/prices", label: "Prices" },
  { href: "/order", label: "Order Now" },
  { href: "/services", label: "Our Services" },
  { href: "/how-it-works", label: "How it Works" },
];

const WHATSAPP_NUMBER = "18154529376";
const WHATSAPP_MESSAGE = encodeURIComponent(
  "Hello BestAcademicWriters, I need help with an assignment."
);
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`;

const WECHAT_QR = "/images/wechat-qr.png";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [showWeChat, setShowWeChat] = useState(false);
  const location = useLocation();

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 font-display font-bold text-xl text-primary"
          >
            <GraduationCap className="h-7 w-7" />
            <span className="hidden sm:inline">BestAcademicWriters</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1" aria-label="Primary">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.href;
              return (
                <Link
                  key={link.href}
                  to={link.href}
                  aria-current={isActive ? "page" : undefined}
                  className={cn(
                    "px-3 py-2 text-sm font-medium rounded-md transition-colors",
                    isActive
                      ? "text-primary bg-secondary"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Desktop CTAs */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Theme toggle */}
            <ThemeToggle />

            <Button asChild variant="outline" size="sm">
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                WhatsApp
              </a>
            </Button>

            <Button
              onClick={() => setShowWeChat(true)}
              variant="outline"
              size="sm"
              className="flex items-center gap-1"
            >
              <QrCode className="h-4 w-4" />
              WeChat
            </Button>

            <Button asChild size="sm" className="bg-gradient-primary hover:opacity-90">
              <Link to="/order">Order Now</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 rounded-md hover:bg-secondary/50"
            onClick={() => setIsOpen((prev) => !prev)}
            aria-label="Toggle menu"
            aria-expanded={isOpen}
            aria-controls="mobile-nav"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div
            id="mobile-nav"
            className="lg:hidden border-t border-border bg-background animate-fade-in"
          >
            <nav className="container py-4 space-y-1" aria-label="Mobile">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    to={link.href}
                    onClick={() => setIsOpen(false)}
                    aria-current={isActive ? "page" : undefined}
                    className={cn(
                      "block px-4 py-2.5 text-sm font-medium rounded-md transition-colors",
                      isActive
                        ? "text-primary bg-secondary"
                        : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                    )}
                  >
                    {link.label}
                  </Link>
                );
              })}

              {/* Mobile CTAs */}
              <div className="pt-4 space-y-2 border-t border-border mt-4">
                <ThemeToggle />
                <Button asChild variant="outline" className="w-full">
                  <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                    Chat on WhatsApp
                  </a>
                </Button>
                <Button
                  onClick={() => setShowWeChat(true)}
                  variant="outline"
                  className="w-full flex items-center gap-1"
                >
                  <QrCode className="h-4 w-4" />
                  Chat on WeChat
                </Button>
                <Button asChild className="w-full bg-gradient-primary hover:opacity-90">
                  <Link to="/order" onClick={() => setIsOpen(false)}>
                    Order Now
                  </Link>
                </Button>
              </div>
            </nav>
          </div>
        )}
      </header>

      {/* WECHAT MODAL */}
      {showWeChat && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center">
          <div className="bg-card p-6 rounded-xl relative text-center max-w-sm w-full shadow-xl">
            <button
              onClick={() => setShowWeChat(false)}
              className="absolute top-3 right-3 text-muted-foreground hover:text-foreground"
            >
              <X className="h-5 w-5" />
            </button>

            <h3 className="text-lg font-semibold mb-2">Chat with us on WeChat</h3>
            <p className="text-sm text-muted-foreground mb-4">
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
