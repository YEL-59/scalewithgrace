// src/routes/ProtectedRoute.jsx
import { Navigate, Outlet } from "react-router";

const ProtectedRoute = () => {
  const token = sessionStorage.getItem("login_token");

  if (!token) {
    return <Navigate to="/sign-in" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
