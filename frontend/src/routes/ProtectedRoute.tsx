import { useAuthStore } from "@/state/accounts";
import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute() {
  const access = useAuthStore((s) => s.access);

  if (!access) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
