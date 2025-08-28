import React from 'react'
import { Route, Routes } from 'react-router-dom';

const InhouseRouter = () => {
  return (
    <Routes>
       <Route path="/dashboard" element={<Dashboard />} /> 
    </Routes>
  );
}

export default InhouseRouter