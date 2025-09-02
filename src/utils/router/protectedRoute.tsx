import { useAuth } from "../contexts/authenticationContext";
import { Navigate, useLocation } from "react-router";
import { LoadingOverlay } from "@mantine/core";
import { getAccessToken, isTokenExpired } from "../helpers";
import { useEffect } from "react";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated, loading, logout } = useAuth();
  const location = useLocation();
  const token = getAccessToken();

  // Check if token exists and is not expired
  useEffect(() => {
    if (token && isTokenExpired(token)) {
      logout();
    }
  }, [token, logout]);

  if (loading) {
    return <LoadingOverlay visible={true} />;
  }

  if (!isAuthenticated || !token) {
    // Redirect to login page with return url
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
