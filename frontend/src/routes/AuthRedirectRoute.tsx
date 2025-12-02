import { ROUTES } from "@/constants/routes";
import { useAuthStore } from "@/state/accounts";
import { Navigate, Outlet } from "react-router-dom";

export default function AuthRedirectRoute() {
  const access = useAuthStore((s) => s.access);

  if (access) {
    return <Navigate to={ROUTES.CHAT} replace />;
  }

  return <Outlet />;
}
