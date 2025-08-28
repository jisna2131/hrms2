import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

import authRoutes from "./routes/authRoutes.js";
import { register, login, refresh } from "./controllers/authController.js";
import { getEmployees, updateRole, deactivateEmployee } from "./controllers/adminController.js";
 import attendanceRoute from "./routes/attendanceRoute.js";
import roleRoutes from "./routes/roles.js";
dotenv.config();
const app = express();



// ===== Middlewares =====
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173", // frontend URL
    credentials: true,
  })
);

// ===== Auth Routes =====
app.post("/api/auth/register", register);
app.post("/api/auth/login", login);
app.get("/api/auth/refresh", refresh);
app.use("/api/auth", authRoutes); 
app.use("/api/roles", roleRoutes);


// ===== Admin Routes =====
app.get("/api/admin/employees", getEmployees);
app.put("/api/admin/role/:id", updateRole);
app.put("/api/admin/deactivate/:id", deactivateEmployee);



 app.use("/api",attendanceRoute); 

// ===== Test Route =====
app.get("/", (req, res) => {
  res.send("✅ HRMS API running...");
});

// ===== Start server =====
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
