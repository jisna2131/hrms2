import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Divider,
} from "@mui/material";

export default function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
      const res = await fetch("http://localhost:4000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok) {
        setMessage("✅ Signup successful! You can now login.");
      } else {
        setMessage("❌ " + (data.message || "Signup failed"));
      }
    } catch (error) {
      setMessage("⚠️ Server error, please try again later.");
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        background: "linear-gradient(135deg, #e3f2fd, #bbdefb)",
        p: 2,
      }}
    >
      <Paper
        elevation={6}
        sx={{
          width: "100%",
          maxWidth: 420,
          p: 5,
          borderRadius: 3,
          backgroundColor: "#fff",
        }}
      >
        <Typography
          variant="h4"
          sx={{
            textAlign: "center",
            mb: 2,
            fontWeight: "700",
            color: "primary.main",
          }}
        >
          Create Account
        </Typography>

        <Divider sx={{ mb: 3 }} />

        {/* Signup Form */}
        <form onSubmit={handleSubmit}>
          <TextField
            name="name"
            label="Full Name"
            variant="outlined"
            fullWidth
            required
            margin="normal"
            value={formData.name}
            onChange={handleChange}
          />
          <TextField
            name="email"
            label="Email Address"
            type="email"
            variant="outlined"
            fullWidth
            required
            margin="normal"
            value={formData.email}
            onChange={handleChange}
          />
          <TextField
            name="password"
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            required
            margin="normal"
            value={formData.password}
            onChange={handleChange}
            helperText="Password must be at least 6 characters"
          />

          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              mt: 3,
              py: 1.5,
              fontWeight: "600",
              fontSize: "1rem",
              textTransform: "none",
              borderRadius: 2,
              "&:hover": {
                backgroundColor: "primary.dark",
                transform: "scale(1.02)",
                transition: "0.2s",
              },
            }}
          >
            Register
          </Button>
        </form>

        {message && (
          <Typography sx={{ mt: 2, textAlign: "center", color: "red" }}>
            {message}
          </Typography>
        )}

        <Typography sx={{ mt: 3, textAlign: "center" }}>
          Already have an account?{" "}
          <Link
            to="/auth/login"
            style={{
              color: "#1976d2",
              fontWeight: "600",
              textDecoration: "none",
            }}
          >
            Login
          </Link>
        </Typography>
      </Paper>
    </Box>
  );
}
