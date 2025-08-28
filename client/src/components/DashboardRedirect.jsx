// import { useEffect, useState } from "react";
// import axios from "axios";
// import {
//   Box,
//   Typography,
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableRow,
//   Paper,
//   Chip,
// } from "@mui/material";

// export default function AdminDashboard() {
//   const [employees, setEmployees] = useState([]);

//   useEffect(() => {
//     const fetchEmployees = async () => {
//       try {
//         const res = await axios.get("http://localhost:4000/api/admin/employees", {
//           withCredentials: true,
//         });

//         const employeesWithAttendance = await Promise.all(
//           res.data.map(async (emp) => {
//             const statusRes = await axios.get(
//               `http://localhost:4000/api/attendance/status/${emp.id}`
//             );
//             return {
//               ...emp,
//               attendance: statusRes.data,
//             };
//           })
//         );

//         setEmployees(employeesWithAttendance);
//       } catch (err) {
//         console.error("Failed to fetch employees:", err);
//       }
//     };

//     fetchEmployees();
//   }, []);

//   return (
//     <Box sx={{ p: 4, backgroundColor: "#f5f7fa", minHeight: "100vh" }}>
//       <Typography variant="h4" sx={{ mb: 4, fontWeight: "bold", color: "#1976d2" }}>
//         Admin Dashboard
//       </Typography>

//       <Paper sx={{ overflowX: "auto", borderRadius: 2, boxShadow: 3 }}>
//         <Table>
//           <TableHead sx={{ backgroundColor: "#1976d2" }}>
//             <TableRow>
//               <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Name</TableCell>
//               <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Email</TableCell>
//               <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Role</TableCell>
//               <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Status</TableCell>
//               <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Check-in</TableCell>
//               <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Check-out</TableCell>
//               <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Total Time</TableCell>
//             </TableRow>
//           </TableHead>

//           <TableBody>
//             {employees.map((emp, idx) => (
//               <TableRow
//                 key={emp.id}
//                 sx={{
//                   backgroundColor: emp.role_id === 1
//                     ? "#bbdefb" // Admin → light blue
//                     : idx % 2 === 0
//                     ? "#e3f2fd" // Employee striped rows
//                     : "#ffffff",
//                   fontWeight: emp.role_id === 1 ? "bold" : "normal",
//                   "&:hover": { backgroundColor: "#90caf9" },
//                 }}
//               >
//                 <TableCell>{emp.name}</TableCell>
//                 <TableCell>{emp.email}</TableCell>
//                 <TableCell>{emp.role_id === 1 ? "Admin" : "Employee"}</TableCell>
//                 <TableCell>
//                   <Chip
//                     label={emp.attendance?.checkedIn ? "Checked In" : "Checked Out"}
//                     color={emp.attendance?.checkedIn ? "success" : "default"}
//                     size="small"
//                   />
//                 </TableCell>
//                 <TableCell>
//                   {emp.attendance?.checkInTime
//                     ? new Date(emp.attendance.checkInTime).toLocaleTimeString()
//                     : "-"}
//                 </TableCell>
//                 <TableCell>
//                   {emp.attendance?.checkOutTime
//                     ? new Date(emp.attendance.checkOutTime).toLocaleTimeString()
//                     : "-"}
//                 </TableCell>
//                 <TableCell>{emp.attendance?.duration || "-"}</TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </Paper>
//     </Box>
//   );
// }
