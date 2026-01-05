
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";

// Public pages
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import GuaranteesPage from "./pages/GuaranteesPage";
import PricesPage from "./pages/PricesPage";
import OrderPage from "./pages/OrderPage";
import ServicesPage from "./pages/ServicesPage";
import HowItWorksPage from "./pages/HowItWorksPage";
import LoginPage from "./pages/LoginPage";
import NotFound from "./pages/NotFound";

// Admin pages
import AdminLoginPage from "./pages/admin/AdminLoginPage";
import AdminLayout from "./pages/admin/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminPricing from "./pages/admin/AdminPricing";
import AdminReviews from "./pages/admin/AdminReviews";
import AdminServices from "./pages/admin/AdminServices";

// Auth context (Firebase)
import { AuthProvider, useAuthContext } from "@/auth/AuthContext";

// Guard for admin routes
function AdminGuard() {
  const { user, loading } = useAuthContext();
  if (loading) return <div className="p-6">Loading...</div>;
  return user ? <Outlet /> : <Navigate to="/admin/login" replace />;
}

const App = () => (
  <TooltipProvider>
    <Toaster />
    <Sonner />
    <AuthProvider>
      <Routes>
        {/* Public site routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/guarantees" element={<GuaranteesPage />} />
        <Route path="/prices" element={<PricesPage />} />
        <Route path="/order" element={<OrderPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/how-it-works" element={<HowItWorksPage />} />
        <Route path="/login" element={<LoginPage />} />

        {/* Admin login (public) */}
        <Route path="/admin/login" element={<AdminLoginPage />} />

        {/* Admin area (protected) */}
        <Route element={<AdminGuard />}>
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="pricing" element={<AdminPricing />} />
            <Route path="reviews" element={<AdminReviews />} />
            <Route path="services" element={<AdminServices />} />
          </Route>
        </Route>

        {/* 404 fallback */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AuthProvider>
  </TooltipProvider>
);

export default App;