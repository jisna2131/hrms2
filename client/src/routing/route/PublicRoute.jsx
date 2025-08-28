import React from "react";
import { Navigate } from "react-router-dom";

const PublicRoute = ({ children }) => {
  console.log("here");
const profile=null //ACTUALLY GETTING THE PROFILE FROM TOKEN
return profile==null?children :<Navigate to="/dashboard"/>
};

export default PublicRoute;
