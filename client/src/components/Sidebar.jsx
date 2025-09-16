import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  CssBaseline,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
} from "@mui/material";

// Icons
import HomeIcon from "@mui/icons-material/Home";
import AssignmentIcon from "@mui/icons-material/Assignment";
import GroupsIcon from "@mui/icons-material/Groups";
import PeopleIcon from "@mui/icons-material/People";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import AssessmentIcon from "@mui/icons-material/Assessment";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import logo from "../assets/logo.png";

export const drawerWidth = 90; // 🔹 Compact sidebar

const mainNavItems = [
  { text: "Home", icon: <HomeIcon /> },
  { text: "Roles", icon: <GroupsIcon /> },
  { text: "Goals", icon: <AssessmentIcon /> },
  { text: "LeaveTracker", icon: <CalendarMonthIcon /> },
  { text: "Attendance", icon: <PeopleIcon /> },
  { text: "Tasks", icon: <AssignmentIcon /> },
  { text: "Files", icon: <InsertDriveFileIcon /> },
  { text: "More", icon: <MoreHorizIcon /> },
];

const bottomNavItems = [{ text: "Reports", icon: <AssessmentIcon /> }];

// ✅ Submenus
const TopNav = {
  Home: [{ text: "Overview" }, { text: "Dashboard" }, { text: "Calendar" }],
  Roles: [{ text: "Role Assign" }, { text: "Individual Goals" }],
  Goals: [{ text: "Goaloverview" }, { text: "Individual performance" }],
  Tasks: [{ text: "My Tasks" }, { text: "Assigned Tasks" }],
  LeaveTracker: [
    { text: "Holidays" },
    { text: "Leave Balance" },
    { text: "Leave Request" },
    { text: "Leave Summary" },
  ],
};

export default function Sidebar({ onSubNavChange }) {
  const [activeMenu, setActiveMenu] = useState("main");
  const navigate = useNavigate();

  const itemsToRender =
    activeMenu === "main" ? mainNavItems : TopNav[activeMenu] || [];

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
            backgroundColor: "#161b3fff",
            color: "white",
            overflow: "hidden",
          },
        }}
      >
        {/* ✅ Logo */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            py: 1,
          }}
        >
          <img
            src={logo}
            alt="Logo"
            style={{
              width: "70px",
              height: "60px",
              borderRadius: "6px",
              objectFit: "contain",
            }}
          />
        </Box>

        {/* ✅ Back button if inside submenu */}
        {activeMenu !== "main" && (
          <Box sx={{ display: "flex", alignItems: "center", px: 1 }}>
            <IconButton
              onClick={() => {
                setActiveMenu("main");
                onSubNavChange([]); // reset SubNav
              }}
              sx={{ color: "white" }}
            >
              <ArrowBackIcon fontSize="small" />
            </IconButton>
          </Box>
        )}

        {/* ✅ Navigation */}
        <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
          <List disablePadding>
            {itemsToRender.map((item) => (
              <ListItemButton
                key={item.text}
                sx={{
                  flexDirection: "column", // 🔹 stack icon + text
                  py: 1,
                  minHeight: 64,
                }}
                onClick={() => {
                  if (activeMenu === "main" && TopNav[item.text]) {
                    setActiveMenu(item.text);
                    onSubNavChange(TopNav[item.text]);
                  } else {
                    if (item.text === "Overview") navigate("/overview");
                    else if (item.text === "Calendar") navigate("/calender");
                    else if (item.text === "Dashboard") navigate("/dashboard");
                    else if (item.text === "Holidays") navigate("/Holidays");
                    else if (item.text === "Leave Balance")
                      navigate("/LeaveBalance");
                    else if (item.text === "Leave Request")
                      navigate("/LeaveRequests");
                    else if (item.text === "Leave Summary")
                      navigate("/LeaveSummary");
                    else if (item.text === "GoalOverview")
                      navigate("/goalOverview");
                    else if (item.text === "Home") navigate("/");
                    else console.log("Clicked:", item.text);
                  }
                }}
              >
                <ListItemIcon
                  sx={{
                    color: "white",
                    minWidth: 0,
                    mb: 0.5,
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.text}
                  primaryTypographyProps={{
                    fontSize: "0.7rem", // 🔹 smaller font
                    textAlign: "center",
                  }}
                />
              </ListItemButton>
            ))}
          </List>

          <Box sx={{ flexGrow: 1 }} />

          {/* ✅ Bottom Nav */}
          {activeMenu === "main" && (
            <List disablePadding>
              {bottomNavItems.map((item) => (
                <ListItemButton
                  key={item.text}
                  sx={{
                    flexDirection: "column",
                    py: 1,
                    minHeight: 64,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      color: "white",
                      minWidth: 0,
                      mb: 0.5,
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={item.text}
                    primaryTypographyProps={{
                      fontSize: "0.7rem",
                      textAlign: "center",
                    }}
                  />
                </ListItemButton>
              ))}
            </List>
          )}
        </Box>
      </Drawer>
    </Box>
  );
}
