import { useAuth } from "../contexts/authenticationContext";
import { Navigate, useLocation } from "react-router";
import { LoadingOverlay } from "@mantine/core";
import { getAccessToken, isTokenExpired } from "../helpers";
import { useEffect } from "react";
import { useBreadcrumb } from "../contexts/breadCrumpContext";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  breadcrumb,
}: {
  children: React.ReactNode;
  breadcrumb?: string;
}) => {
  const { isAuthenticated, loading, logout, user } = useAuth();
  const location = useLocation();
  const token = getAccessToken();
  const { appendBreadcrumb } = useBreadcrumb();

  // Check if token exists and is not expired
  // useEffect(() => {
  //   if (token && isTokenExpired(token)) {
  //     logout();
  //   }
  // }, [token, logout]);

  useEffect(() => {
    if (breadcrumb) {
      // Append the breadcrumb from route config
      appendBreadcrumb(window.location.pathname, breadcrumb);
    }
  }, [breadcrumb, appendBreadcrumb]);

  if (loading) {
    return <LoadingOverlay visible={true} />;
  }

  // Restrict admin routes to admin users only
  if (window.location.pathname.includes("admin")) {
    if (!user?.isAdmin) {
      return <Navigate to="/" replace />;
    }
  }

  if (!isAuthenticated || !token) {
    // Redirect to login page with return url
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
