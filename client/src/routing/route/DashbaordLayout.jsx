import React, { useState } from "react";
import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import TopNav from "../../components/TopNav";



const DashBoardLayout = () => {
    const [subNavItems, setSubNavItems] = useState(  [
    ]);


  return (
    <>
    
    <Box sx={{ display: "flex", height: "100vh", backgroundColor: "#fff" }}>
      {/* Sidebar */}
      <Sidebar onSubNavChange={setSubNavItems} />

      {/* Main */}
      <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
         {/* <TopNav /> */}
{/* <SubNav/> */}
        <TopNav  items={subNavItems} /> 

        {/* Main White Content */}
        <Box sx={{ flexGrow: 1, p: 2, backgroundColor: "#ffffffff" }}>
          <Outlet />
        </Box>

       
      </Box>
    </Box>
    </>
  );
};

export default DashBoardLayout;