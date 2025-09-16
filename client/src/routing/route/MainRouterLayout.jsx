import React from "react";
import { Route, Routes } from "react-router-dom";
// oo
import DashbaordLayout from "./DashbaordLayout";
// import RoleDashboard from "../../views/auth/Dashboard";
import Attendance from "../../components/CheckInOutButton";
import Navbar from "../../components/Navbar";
import Dashboard from "../../views/auth/Dashboard";
import CalendarPage from "../../pages/calender";
import Overview from "../../pages/overview";
import Holidays from "../../pages/Holidays";
import LeaveBalance from "../../pages/LeaveBalance";
import LeaveRequests from "../../pages/LeaveRequests";
import LeaveSummary from "../../pages/LeaveSummary";
import GoalOverview from "../../pages/GoalOverview";
import AdminDashboard from "../../Admin/AdminDashboard";
import GoalManage from "../../Admin/GoalManage";
import AddRole from "../../Admin/AddRole";


const MainRouterLayout = () => {
  const permission = true;
  return (
<Routes>
  <Route path="/" element={<DashbaordLayout/>}>
    <Route index element={<Overview />} />   {/* default page */}
    <Route index element={<Holidays />} />   {/* default page Holidays aayi */}

    <Route path="dashboard" element={<Dashboard />} />
    <Route path="overview" element={<Overview />} />
    <Route path="calendar" element={<CalendarPage />} />
    
    <Route path="Holidays" element={<Holidays />} />
    <Route path="LeaveBalance" element={<LeaveBalance />} />
    <Route path="LeaveRequests" element={<LeaveRequests />} />
    <Route path="LeaveSummary" element={<LeaveSummary />} />
    <Route path="goalOverview" element={<GoalOverview/>} />
    <Route path="attendance" element={<Attendance />} />
    <Route path="logout" element={<Navbar />} />
  </Route>

  {/* 🔹 Admin routes */}
  <Route path="AdminDashboard" element={<AdminDashboard />}>
    <Route path="add-role" element={<AddRole/>} />
    <Route path="goalmanage" element={<GoalManage />} />
  </Route>
</Routes>

  );
};

export default MainRouterLayout;
