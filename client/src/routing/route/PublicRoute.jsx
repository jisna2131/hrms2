// import React from "react";
// import { Navigate } from "react-router-dom";

// const PublicRoute = ({ children }) => {

// const profile=null //ACTUALLY GETTING THE PROFILE FROM TOKEN
// return profile==null?children :<Navigate to="/dashboard"/>
// };

// export default PublicRoute;
import React from "react";
import { Navigate } from "react-router-dom";

const PublicRoute = ({ children }) => {
  const token = localStorage.getItem("token"); 
  return token ? <Navigate to="/" replace /> : children;
};

export default PublicRoute;