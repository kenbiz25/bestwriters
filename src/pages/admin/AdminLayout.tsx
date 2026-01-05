
import { useState, useEffect } from "react";
import { useNavigate, Link, Outlet, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  GraduationCap,
  LogOut,
  DollarSign,
  Star,
  Briefcase,
  LayoutDashboard,
  Menu,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

// Firebase
import { auth, db } from "@/integrations/firebase/client";
import { signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

// Global auth state (from your AuthContext)
import { useAuthContext } from "@/auth/AuthContext";

const navItems = [
  { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/pricing", label: "Pricing", icon: DollarSign },
  { href: "/admin/reviews", label: "Reviews", icon: Star },
  { href: "/admin/services", label: "Services", icon: Briefcase },
];

type Profile = {
  role?: string;
};

export default function AdminLayout() {
  const [isRoleChecked, setIsRoleChecked] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();

  const { user, loading } = useAuthContext();

  useEffect(() => {
    // Wait until AuthContext resolves
    if (loading) return;

    // Not logged in → send to admin login
    if (!user) {
      navigate("/admin/login");
      return;
    }

    // Check Firestore role
    const checkRole = async () => {
      try {
        const docRef = doc(db, "profiles", user.uid);
        const snap = await getDoc(docRef);
        const profile = snap.exists() ? (snap.data() as Profile) : {};

        if (profile.role !== "admin") {
          await signOut(auth);
          toast({
            title: "Access denied",
            description: "Admin privileges required.",
            variant: "destructive",
          });
          navigate("/admin/login");
          return;
        }

        setIsRoleChecked(true);
      } catch (err: any) {
        // On error, fail closed (deny access)
        await signOut(auth);
        toast({
          title: "Access check failed",
          description: err?.message ?? "Could not verify admin role.",
          variant: "destructive",
        });
        navigate("/admin/login");
      }
    };

    checkRole();
  }, [user, loading, navigate, toast]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast({
        title: "Signed out",
        description: "You have been logged out.",
      });
    } finally {
      navigate("/admin/login");
    }
  };

  // Show loader while auth or role check is in progress
  if (loading || !isRoleChecked) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-secondary/30">
      {/* Mobile Header */}
      <header className="lg:hidden sticky top-0 z-50 bg-background border-b border-border px-4 py-3">
        <div className="flex items-center justify-between">
          <Link
            to="/admin/dashboard"
            className="flex items-center gap-2 font-display font-bold text-lg text-primary"
          >
            <GraduationCap className="h-6 w-6" />
            <span>Admin</span>
          </Link>
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
            {isSidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside
          className={cn(
            "fixed lg:sticky top-0 left-0 z-40 h-screen w-64 bg-background border-r border-border transition-transform lg:translate-x-0",
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          )}
        >
          <div className="flex flex-col h-full">
            {/* Logo */}
            <div className="hidden lg:flex items-center gap-2 p-6 border-b border-border">
              <GraduationCap className="h-7 w-7 text-primary" />
              <span className="font-display font-bold text-lg text-primary">Admin Panel</span>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-4 space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  onClick={() => setIsSidebarOpen(false)}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                    location.pathname === item.href
                      ? "bg-accent text-accent-foreground"
                      : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                  )}
                >
                  <item.icon className="h-5 w-5" />
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* Footer */}
            <div className="p-4 border-t border-border">
              <Button
                variant="ghost"
                className="w-full justify-start text-muted-foreground hover:text-foreground"
                onClick={handleLogout}
              >
                <LogOut className="h-5 w-5 mr-3" />
                Sign Out
              </Button>
              <Link
                to="/"
                className="block mt-2 text-center text-sm text-muted-foreground hover:text-foreground"
              >
                ← Back to Website
              </Link>
            </div>
          </div>
        </aside>

        {/* Backdrop for mobile */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 z-30 bg-background/80 backdrop-blur-sm lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <main className="flex-1 min-h-screen">
          <div className="p-6 lg:p-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
