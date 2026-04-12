import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// allowedRoles: array of role strings, e.g. ["ADMIN"]
function ProtectedRoute({ children, allowedRoles }) {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    // Redirect to their own dashboard
    if (user.role === "ADMIN") return <Navigate to="/admin" replace />;
    if (user.role === "PROJECT_OWNER") return <Navigate to="/owner" replace />;
    if (user.role === "BUYER") return <Navigate to="/buyer" replace />;
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;