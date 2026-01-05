
import { Link } from "react-router-dom";
import { GraduationCap, Mail, MapPin, MessageCircle } from "lucide-react";

const WHATSAPP_NUMBER = "18154529376";
const WHATSAPP_MESSAGE = encodeURIComponent("Hello BestAcademicWriters, I need help with an assignment.");

const quickLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/guarantees", label: "Our Guarantees" },
  { href: "/prices", label: "Prices" },
];

const serviceLinks = [
  { href: "/services", label: "Our Services" },
  { href: "/how-it-works", label: "How it Works" },
  { href: "/order", label: "Order Now" },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container py-12 md:py-16">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2 font-display font-bold text-xl">
              <GraduationCap className="h-7 w-7" />
              <span>BestAcademicWriters</span>
            </Link>
            <p className="text-sm text-primary-foreground/80 leading-relaxed">
              Professional academic writing support. Original work, confidential service, and fair pricing.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-display font-semibold mb-4">Services</h4>
            <ul className="space-y-2">
              {serviceLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display font-semibold mb-4">Contact</h4>
            <ul className="space-y-3">
              <li>
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                >
                  <MessageCircle className="h-4 w-4" />
                  WhatsApp Support
                </a>
              </li>
              <li>
                <a
                  href="mailto:support@bestacademicwriters.co"
                  className="flex items-center gap-2 text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                >
                  <Mail className="h-4 w-4" />
                  support@bestacademicwriters.co
                </a>
              </li>
              <li className="flex items-center gap-2 text-sm text-primary-foreground/80">
                <MapPin className="h-4 w-4" />
                Nairobi, Kenya
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-primary-foreground/20">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-sm text-primary-foreground/60">
              © {currentYear} BestAcademicWriters. All rights reserved.
            </p>
            <div className="flex items-center gap-4 text-sm text-primary-foreground/60">
              <span>Original work</span>
              <span>•</span>
              <span>Confidential service</span>
              <span>•</span>
              <span>Fair pricing</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
