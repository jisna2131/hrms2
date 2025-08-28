import { useEffect, useState } from "react";
import axios from "axios";
import { Box, Button, Typography, Paper, Stack } from "@mui/material";

export default function Attendance({ userId }) {
  const [checkedIn, setCheckedIn] = useState(
    JSON.parse(localStorage.getItem("checkedIn")) || false
  );
  const [seconds, setSeconds] = useState(
    Number(localStorage.getItem("seconds")) || 0
  );
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
  
    fetchDuration();

    const interval = setInterval(() => {
      if (checkedIn) {
        setSeconds((s) => {
          const newVal = s + 1;
          localStorage.setItem("seconds", newVal);
          return newVal;
        });
      }
    }, 1000);

    const clockInterval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => {
      clearInterval(interval);
      clearInterval(clockInterval);
    };
  }, [checkedIn]);

  const fetchDuration = async () => {
    try {
      const res = await axios.get(
        `http://localhost:4000/api/attendance/duration/${userId}`
      );

      setCheckedIn(res.data.checkedIn);
      setSeconds(res.data.totalSeconds);

      // save to localStorage
      localStorage.setItem("checkedIn", JSON.stringify(res.data.checkedIn));
      localStorage.setItem("seconds", res.data.totalSeconds);
    } catch (err) {
      console.error("Failed to fetch duration:", err);
    }
  };

  const handleCheckIn = async () => {
    try {
      await axios.post(
        `http://localhost:4000/api/attendance/checkin/${userId}`
      );
      setCheckedIn(true);
      localStorage.setItem("checkedIn", "true");
    } catch (err) {
      alert(err.response?.data?.error || "Check-in failed");
    }
  };

  const handleCheckOut = async () => {
    try {
      await axios.post(
        `http://localhost:4000/api/attendance/checkout/${userId}`
      );
      setCheckedIn(false);
      localStorage.setItem("checkedIn", "false");
      fetchDuration(); // ✅ Refresh from backend (avoid jumps)
    } catch (err) {
      alert(err.response?.data?.error || "Check-out failed");
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="flex-end"
      alignItems="flex-start"
      minHeight="100vh"
      bgcolor="#f5f5f5"
      p={2}
    >
      <Paper
        elevation={4}
        sx={{ p: 3, borderRadius: 3, width: 300, textAlign: "center" }}
      >
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          Attendance
        </Typography>

        {/* Current system time */}
        <Typography variant="body1" sx={{ mb: 1 }}>
          Current Time:{" "}
          {currentTime.toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
          })}
        </Typography>

        {/* Worked Time */}
        <Typography variant="body1" sx={{ mb: 2 }}>
          Worked Time: {Math.floor(seconds / 3600)}h{" "}
          {Math.floor((seconds % 3600) / 60)}m {seconds % 60}s
        </Typography>

        <Stack spacing={2}>
          {!checkedIn ? (
            <Button
              variant="contained"
              color="success"
              onClick={handleCheckIn}
              fullWidth
            >
              Check In
            </Button>
          ) : (
            <Button
              variant="contained"
              color="error"
              onClick={handleCheckOut}
              fullWidth
            >
              Check Out
            </Button>
          )}
        </Stack>
      </Paper>
    </Box>
  );
}
