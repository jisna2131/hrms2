import React from "react";
import Navbar from "./Navbar";

const WithNavbar = ({ children }) => (
  <>
    <Navbar />
    <div style={{ marginTop: "64px" }}>{children}</div>
  </>
);

export default WithNavbar;
