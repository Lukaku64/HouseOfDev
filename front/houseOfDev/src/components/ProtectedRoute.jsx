import { Navigate } from "react-router-dom";
import { getCookieValue } from "../utils/api";
import jwtDecode from "jwt-decode";

export const ProtectedRoute = ({
  children,
  onlyAdmin = false,
  onlyAdminOrAgent = false,
}) => {
  const token = getCookieValue("token");

  if (!token) return <Navigate to="/" replace />;

  const user = jwtDecode(token);

  const isAdmin = user.role === "admin";
  const isAdminOrAgent = user.role === "admin" || user.role === "agente";
  if (onlyAdmin && !isAdmin) return <Navigate to="/" replace />;
  if (onlyAdminOrAgent && !isAdminOrAgent) return <Navigate to="/" replace />;
  return children ? children : <Navigate to="/404" replace />;
};
