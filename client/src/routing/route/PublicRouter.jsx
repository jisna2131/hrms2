import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "../../views/auth/Login";
import Signup from "../../views/auth/Signup";
import ForgotPassword from "../../views/auth/Forgotpassword";
import Dashboard from "../../views/auth/Dashboard";
import CheckInOutButton from "../../components/CheckInOutButton";
import WithNavbar from "../../components/WithNavbar"; // <-- import here

const PublicRouter = () => {
  return (
    <Routes>
      {/* Auth pages without Navbar */}
      <Route path="login" element={<Login />} />
      <Route path="signup" element={<Signup />} />
      <Route path="forgotpassword" element={<ForgotPassword />} />

      {/* Pages with Navbar */}
      <Route path="dashboard" element={<WithNavbar><Dashboard /></WithNavbar>} />
      <Route path="attendance" element={<WithNavbar><CheckInOutButton /></WithNavbar>} />
      
    </Routes>
  );
};

export default PublicRouter;
