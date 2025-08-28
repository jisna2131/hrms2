import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../redux/Features/authSlice";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, user } = useSelector((state) => state.auth);

  const [form, setForm] = useState({ email: "", password: "" });

  // Redirect after login success
  // Single useEffect for role-based redirect
  useEffect(() => {
    if (user) {
      if (user.role === "admin") {
        navigate("/dashboard"); // admin dashboard
      } else {
        navigate("/dashboard"); // employee attendance page
      }
    }
  }, [user, navigate]);


  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(form));
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "#f9fafc",
        p: 3,
      }}
    >
      {/* Logo */}
      <Box
        component="img"
        src="https://www.intervaledu.com/static/web/images/logo/logo-dark.png"
        sx={{ width: 150, mt: "30px", mb: 2 }}
      />

      {/* Small Map Animation */}
      <Box
        component="img"
        src="https://portal.teaminterval.net/static/media/map.7dd1ec7c87cddefd09e4.gif"
        alt="Map Animation"
        sx={{ width: 50, mt: "12px", mb: 2 }}
      />

      {/* Title */}
      <Typography
        sx={{
          color: "#212B36",
          fontSize: "28px",
          fontFamily: "sans-serif",
          fontWeight: "700",
          lineHeight: "normal",
          mb: 3,
          textAlign: "center",
        }}
      >
        Let's Verify Your Email
      </Typography>

      {/* Illustration */}
      <Box
        component="img"
        src="https://portal.teaminterval.net/static/media/otp.f01e9083470e4376f6f4.jpg"
        alt="Login Illustration"
        sx={{
          width: "420px",
          height: "320px",
          objectFit: "cover",
          mt: "20px",
          mb: 3,
          borderRadius: "12px",
        }}
      />

      {/* Login Form */}
      <Box
        sx={{
          width: "100%",
          maxWidth: 400,
          backgroundColor: "#fff",
          p: 3,
          borderRadius: 2,
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        }}
      >
        <Typography variant="h5" sx={{ textAlign: "center", mb: 2, fontWeight: "600" }}>
          Login
        </Typography>

        {error && (
          <Typography color="error" sx={{ mb: 1, textAlign: "center" }}>
            {error}
          </Typography>
        )}

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
            style={{
              width: "100%",
              padding: "10px",
              marginBottom: "12px",
              borderRadius: "6px",
              border: "1px solid #ccc",
            }}
          />
          <input
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
            style={{
              width: "100%",
              padding: "10px",
              marginBottom: "12px",
              borderRadius: "6px",
              border: "1px solid #ccc",
            }}
          />
          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              padding: "10px",
              backgroundColor: "#1976d2",
              color: "#fff",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              fontWeight: "600",
            }}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <Box sx={{ mt: 2, textAlign: "center" }}>
          <Link to="/auth/forgotpassword">Forgot Password?</Link>
        </Box>
        <Box sx={{ mt: 1, textAlign: "center" }}>
          Don&apos;t have an account? <Link to="/auth/signup">Sign Up</Link>
        </Box>
      </Box>
    </Box>
  );
}
