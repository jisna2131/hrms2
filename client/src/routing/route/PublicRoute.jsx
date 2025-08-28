import React from "react";

const PublicRoute = ({ children }) => {
  const isAuthenticated=false;
  return !isAuthenticated ? children: <Navigate to ="/auth/login"/>// just render children for now
};

export default PublicRoute;
