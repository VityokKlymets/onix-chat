import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthRedirectRoute from "./AuthRedirectRoute";
import { LoginPage } from "@/pages/LoginPage";
import { ROUTES } from "@/constants/routes";
import { HomePage } from "@/pages/HomePage";
import ProtectedRoute from "./ProtectedRoute";
import { ChatPage } from "@/pages/ChatPage";

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<ProtectedRoute />}>
          <Route path={ROUTES.HOME} element={<HomePage />} />
          <Route path={ROUTES.CHAT} element={<ChatPage />} />
        </Route>
        <Route element={<AuthRedirectRoute />}>
          <Route path={ROUTES.LOGIN} element={<LoginPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
