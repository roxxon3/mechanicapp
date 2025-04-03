
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: "user" | "mechanic";
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  requiredRole 
}) => {
  const { isAuthenticated, userRole } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && userRole !== requiredRole) {
    // Redirect to the appropriate dashboard
    if (userRole === "user") {
      return <Navigate to="/user-dashboard" replace />;
    } else if (userRole === "mechanic") {
      return <Navigate to="/mechanic-dashboard" replace />;
    }
  }

  return <>{children}</>;
};

export default ProtectedRoute;
