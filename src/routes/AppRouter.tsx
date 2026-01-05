
// src/routes/AppRouter.tsx
import { BrowserRouter, Routes, Route, Navigate, Outlet } from "react-router-dom";
import Header from "@/components/Header";
import HomePage from "@/pages/HomePage";
import LoginPage from "@/pages/LoginPage";
import NotFound from "@/pages/NotFound";

// Admin pages
import AdminLoginPage from "@/pages/admin/AdminLoginPage";
import AdminLayout from "@/pages/admin/AdminLayout";
import AdminDashboard from "@/pages/admin/AdminDashboard";
import AdminPricing from "@/pages/admin/AdminPricing";
import AdminReviews from "@/pages/admin/AdminReviews";
import AdminServices from "@/pages/admin/AdminServices";

import { useAuthContext } from "@/auth/AuthContext";

function AdminGuard() {
  const { user, loading } = useAuthContext();
  if (loading) return <div className="p-6">Loading...</div>;
  return user ? <Outlet /> : <Navigate to="/admin/login" replace />;
}

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        {/* Public site */}
        <Route path="/" element={<HomePage />} />
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
    </BrowserRouter>
  );
}
