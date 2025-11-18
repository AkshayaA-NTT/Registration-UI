import { Routes, Route, Navigate } from "react-router-dom";
import { Suspense, lazy } from "react";
import Loader from "../components/common/loader";
import ProtectedRoute from "../components/common/ProtectedRoute";

// Lazy-loaded pages
const Login = lazy(() => import("../pages/Login"));
const Registration = lazy(() => import("../pages/Registration"));
const DealForm = lazy(() => import("../pages/DealForm"));
const SpocSelection = lazy(() => import("../pages/SpocSelection"));
const Confirmation = lazy(() => import("../pages/Confirmation"));

export default function AppRoutes() {
  return (
    <Suspense fallback={<Loader message="Loading..." />}>
      <Routes>

        {/* ---------- PUBLIC ROUTES ---------- */}
        <Route path="/" element={<Login />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Registration" element={<Registration />} />

        {/* ---------- PROTECTED ROUTES ---------- */}
        <Route
          path="/deal-form"
          element={
            <ProtectedRoute>
              <DealForm />
            </ProtectedRoute>
          }
        />

        <Route
          path="/spoc-selection"
          element={
            <ProtectedRoute>
              <SpocSelection />
            </ProtectedRoute>
          }
        />

        <Route
          path="/confirmation"
          element={
            <ProtectedRoute>
              <Confirmation />
            </ProtectedRoute>
          }
        />

        {/* ---------- FALLBACK ---------- */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  );
}
