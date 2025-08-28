// components/Navbar.jsx
import React from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/auth/login");
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: "#000" }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        {/* Left side: Logo + Links */}
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <img
            src="https://www.intervaledu.com/static/web/images/logo/logo-dark.png"
            alt="Interval Logo"
            style={{ width: 120, marginRight: 30 }}
          />
          <Button
            component={Link}
            to="/auth/dashboard"
            sx={{ color: "#fff", textTransform: "none", fontWeight: 500 }}
          >
        
          </Button>
          <Button
            component={Link}
            to="/auth/attendance"
            sx={{ color: "#fff", textTransform: "none", fontWeight: 500, ml: 2 }}
          >
            
          </Button>
        </Box>

        {/* Right side: Logout */}
        <Button
          onClick={handleLogout}
          sx={{
            backgroundColor: "#8B0000",
            color: "#fff",
            "&:hover": { backgroundColor: "#b22222" },
            textTransform: "none",
            fontWeight: 500,
          }}
          variant="contained"
        >
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
}
