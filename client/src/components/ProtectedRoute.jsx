import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ element }) => {
  // Get the auth token or user data from localStorage
  const token = localStorage.getItem("token");

  // If token exists, allow access to the route
  return token ? element : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
