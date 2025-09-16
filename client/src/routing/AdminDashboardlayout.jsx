// // import React from 'react';
// // import { Link, useLocation, Outlet } from 'react-router-dom';
// // import { 
// //   Box, 
// //   Drawer, 
// //   List, 
// //   ListItem, 
// //   ListItemIcon, 
// //   ListItemText, 
// //   Typography, 
// //   Toolbar, 
// //   AppBar, 
// //   CssBaseline 
// // } from '@mui/material';
// // import AddCircleIcon from '@mui/icons-material/AddCircle';
// // import FlagIcon from '@mui/icons-material/Flag';
// // import ExitToAppIcon from '@mui/icons-material/ExitToApp';

// // const drawerWidth = 240;

// // const menuItems = [
// //   { text: 'Add New Role', icon: <AddCircleIcon />, path: 'add-role' },   // ✅ relative
// //   { text: 'Goal Manage', icon: <FlagIcon />, path: 'goal-manage' },     // ✅ relative
// //   { text: 'Logout', icon: <ExitToAppIcon />, path: '/logout' }          // ✅ absolute
// // ];

// // const AdminDashboardLayout = () => {
// //   const location = useLocation();

// //   return (
// //     <Box sx={{ display: 'flex' }}>
// //       <CssBaseline />
      
// //       {/* Top AppBar */}
// //       <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
// //         <Toolbar>
// //           <Typography variant="h6" noWrap component="div">
// //             Admin Panel
// //           </Typography>
// //         </Toolbar>
// //       </AppBar>

// //       {/* Sidebar Drawer */}
// //       <Drawer
// //         variant="permanent"
// //         sx={{
// //           width: drawerWidth,
// //           flexShrink: 0,
// //           '& .MuiDrawer-paper': {
// //             width: drawerWidth,
// //             boxSizing: 'border-box',
// //             backgroundColor: '#7596b9ff',
// //             color: '#fff',
// //           },
// //         }}
// //       >
// //         <Toolbar />
// //         <Box sx={{ overflow: 'auto' }}>
// //           <List>
// //             {menuItems.map((item) => (
// //               <ListItem
// //                 key={item.text}
// //                 component={Link}
// //                 to={item.path}
// //                 sx={{
// //                   cursor: 'pointer',
// //                   backgroundColor: location.pathname.includes(item.path) ? '#3e566eff' : 'transparent',
// //                   '&:hover': { backgroundColor: '#6390bdff' },
// //                 }}
// //               >
// //                 <ListItemIcon sx={{ color: '#fff' }}>
// //                   {item.icon}
// //                 </ListItemIcon>
// //                 <ListItemText primary={item.text} />
// //               </ListItem>
// //             ))}
// //           </List>
// //         </Box>
// //       </Drawer>

// //       {/* Main Content with Outlet */}
// //       <Box
// //         component="main"
// //         sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
// //       >
// //         {/* Push content below AppBar */}
// //         <Toolbar />
        
// //         {/* Nested pages render here */}
// //         <Outlet />
// //       </Box>
// //     </Box>
// //   );
// // };




// // export default AdminDashboardLayout;
// import React, { useState } from "react";
// import { Box } from "@mui/material";
// import { Outlet } from "react-router-dom";
// import Sidebar from "../../components/AdminSidebar";
// import TopNav from "../../components/TopNav";

// const AdminDashboardLayout = () => {
//   const [subNavItems, setSubNavItems] = useState([]);

//   return (
//     <Box sx={{ display: "flex", height: "100vh", backgroundColor: "#fff" }}>
//       {/* Sidebar */}
//       <Sidebar onSubNavChange={setSubNavItems} />

//       {/* Main Content Area */}
//       <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
//         {/* Top Navbar */}
//         <TopNav items={subNavItems} />

//         {/* White Content Area */}
//         <Box sx={{ flexGrow: 1, p: 2, backgroundColor: "#fff" }}>
//           <Outlet />
//         </Box>
//       </Box>
//     </Box>
//   );
// };

// export default AdminDashboardLayout;
