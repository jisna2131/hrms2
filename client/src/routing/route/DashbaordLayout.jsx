import { Box } from '@mui/material'
import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '../../components/Sidebar'
const DashbaordLayout = () => {
  console.log('running')
  return (
  <>
  NAVBAR
  <Box sx={{display:'flex', justifyContent:'space-between'}}>
   <Box>
    <Sidebar/>
       </Box>
   <Box border={2}>
     <Outlet/>
   </Box>
  </Box>

  Footer
  </>
  )
}

export default DashbaordLayout