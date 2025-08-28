// import { useState } from "react";
// import axios from "axios";
// import { Button, Box, Typography } from "@mui/material";

// export default function Attendance({ userId = 1 }) {
//   const [checkedIn, setCheckedIn] = useState(false);
//   const [duration, setDuration] = useState(null);

//   const handleCheckIn = async () => {
//     await axios.post(`http://localhost:4000/api/attendance/checkin/${userId}`);
//     setCheckedIn(true);
//     setDuration(null); 
//   };

//   const handleCheckOut = async () => {
//     const res = await axios.post(`http://localhost:4000/api/attendance/checkout/${userId}`);
//     setDuration(res.data.duration);
//     setCheckedIn(false);
//   };

//   return (
//     <Box sx={{ p: 3 }}>
//       {!checkedIn ? (
//         <Button 
//           variant="contained" 
//           color="success" 
//           onClick={handleCheckIn}
//         >
//           Check In
//         </Button>
//       ) : (
//         <Button 
//           variant="contained" 
//           color="error" 
//           onClick={handleCheckOut}
//         >
//           Check Out
//         </Button>
//       )}

//       {duration && (
//         <Typography variant="body1" sx={{ mt: 2 }}>
//           You worked: {duration}
//         </Typography>
//       )}
//     </Box>
//   );
// }
