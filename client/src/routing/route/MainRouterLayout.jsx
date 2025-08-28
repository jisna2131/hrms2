import React from "react";
import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import DashbaordLayout from "./DashbaordLayout";
import RoleDashboard from "../../views/auth/Dashboard";
import Attendance from "../../components/CheckInOutButton";
import Navbar from "../../components/Navbar";


const MainRouterLayout = () => {
  const permission = true;
  return (
    <Routes>
      <Route
        element={
          // <ProtectedRoute>
            <DashbaordLayout />
          // </ProtectedRoute>
        }
      >
        <Route path="dashboard" element={<RoleDashboard />} />
        <Route path="attendance" element={<Attendance />} />
        <Route path="logout" element={<Navbar />} />
      </Route>
    </Routes>
  );
};

export default MainRouterLayout;
