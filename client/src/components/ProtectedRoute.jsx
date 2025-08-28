import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, allowedRoles }) {
  const { user } = useSelector((state) => state.auth);

  if (!user) return <Navigate to="/auth/login" />; // not logged in

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    // role not allowed
    return <Navigate to="/not-authorized" />;
  }

  return children;
}
