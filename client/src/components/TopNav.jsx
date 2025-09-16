import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  Box,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const TopNav = ({ items = [], subNavItems = [] }) => {

console.log(items,subNavItems)
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();

  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

//   const handleMenuAction = (action) => {
//     if (action === "logout") {
//       localStorage.removeItem("authToken");
//       sessionStorage.clear();
//       navigate("/auth/login");
//     }
//     handleMenuClose();
//   };
const handleMenuAction = (action) => {
  if (action === "logout") {
    localStorage.clear();
    sessionStorage.clear();
    handleMenuClose();
    navigate("/auth/login", { replace: true });
  } else {
    handleMenuClose();
  }
};


  return (
    <Box>
      {/* Top bar */}
      <AppBar position="static" sx={{ backgroundColor: "#1b2a4e", boxShadow: "none" }}>
        <Toolbar sx={{ minHeight: "48px !important", display: "flex", justifyContent: "space-between" }}>
          <Box sx={{ display: "flex" }}>
            {items.map((item) => (
              <Typography
                key={item.text}
                sx={{ mr: 3, cursor: "pointer" }}
                onClick={() => {
                  if (item.text === "Overview") navigate("/overview");
                  else if (item.text === "Calendar") navigate("/calendar");
                  else if(item.text === "Holidays") navigate('/Holidays');
                else if (item.text === "Leave Balance") navigate("/LeaveBalance");
                else if (item.text === "Leave Request") navigate("/LeaveRequests");
                else if (item.text === "Leave Summary") navigate("/LeaveSummary");
                 else if (item.text === "Goaloverview") navigate("/goaloverview");
                }}
              >
                {item.text}
              </Typography>
            ))}
          </Box>

          <IconButton onClick={handleMenuOpen} sx={{ p: 0 }}>
            <Avatar alt="User Profile" src="/static/images/avatar/1.jpg" />
          </IconButton>

          <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
            <MenuItem onClick={() => handleMenuAction("profile")}>My Profile</MenuItem>
            <MenuItem onClick={() => handleMenuAction("settings")}>Settings</MenuItem>
            <MenuItem onClick={() => handleMenuAction("logout")}>Logout</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>

      {/* Submenu row
      {subNavItems.length > 0 && (
        <Box sx={{ display: "flex", alignItems: "center", background: "#1f2559", px: 2, py: 1 }}>
          {subNavItems.map((item) => {
            console.log(ite)
            return (
            <Button
              key={item.text}
              sx={{ color: "white", mx: 1 }}
              onClick={() => {
                if (item.text === "Holidays") navigate('/Holidays');
                else if (item.text === "Leave Balance") navigate("/LeaveBalance");
                else if (item.text === "Leave Request") navigate("/LeaveRequests");
                else if (item.text === "Leave Summary") navigate("/LeaveSummary");
              }}
            >
              {item.text}
            </Button>
          )})}
        </Box>
      )} */}
    </Box>
  );
};

export default TopNav;
