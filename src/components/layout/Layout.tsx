import { Footer } from "./Footer";
import { WhatsAppButton } from "./WhatsAppButton";
import { Header } from "./Header"; // ✅ use named import

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      {/* HEADER: Header now handles WeChat modal internally */}
      <Header />

      {/* MAIN CONTENT */}
      <main className="flex-1">{children}</main>

      {/* FOOTER */}
      <Footer />

      {/* FLOATING WHATSAPP BUTTON */}
      <WhatsAppButton />
    </div>
  );
}
