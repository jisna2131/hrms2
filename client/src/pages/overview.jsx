import React, { useEffect, useState, useMemo } from "react";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Avatar,
  Button,
  Divider,
  Stack,
  Box,
  Paper,
} from "@mui/material";
import Chart from "react-apexcharts";

// Time Display
const TimeDisplay = React.memo(({ time }) => (
  <Typography variant="h5" sx={{ my: 1 }}>
    {time.toLocaleTimeString()}
  </Typography>
));

TimeDisplay.displayName = "TimeDisplay";

function Overview() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const greeting = () => {
    const hr = time.getHours();
    if (hr < 12) return "Good Morning";
    if (hr < 18) return "Good Afternoon";
    return "Good Evening";
  };

  // Memoized schedule data
  const scheduleData = useMemo(
    () => [
      { day: "Sun 31", hours: 0, status: "Weekend", color: "#888" },
      { day: "Mon 01", hours: 8, status: "Remote In", color: "#1976d2" },
      { day: "Tue 02", hours: 0, status: "Absent", color: "red" },
      { day: "Wed 03", hours: 7.2, status: "Remote In", color: "#1976d2" },
      { day: "Thu 04", hours: 6.5, status: "Remote In", color: "#1976d2" },
      { day: "Fri 05", hours: 0, status: "Remote In", color: "#1976d2" },
      { day: "Sat 06",     hours: 0, status: "Weekend", color: "#888" },
    ],
    []
  );

  // Apex chart config
const chartOptions = {
  chart: { type: "bar", toolbar: { show: false } },
  plotOptions: { bar: { borderRadius: 6, columnWidth: "40%" } },
  xaxis: {
    categories: scheduleData.map((d) => d.day),
    labels: {
      formatter: function (value,index) {
        const day = scheduleData.find(e=>e.day == value);
        console.log(scheduleData)
        // Show Day + Status
        return `${value}\n${day.status}`;
      },
      style: {
        fontSize: "12px",
        colors: scheduleData.map((d) =>
          d.status === "Remote In"
            ? "green"
            : d.status === "Absent"
            ? "red"
            : "#888"
        ),
      },
    },
  },
  colors: ["#1976d2"],
  dataLabels: { enabled: false },
  grid: { borderColor: "#eee" },
};

const chartSeries = [
  { name: "Hours Worked", data: scheduleData.map((d) => d.hours) },
];


  return (
    <Grid container spacing={2}>
      {/* Left Sidebar - Check-In Box */}
      <Grid item xs={12} md={3}>
        <Card
          sx={{
            borderRadius: 3,
            boxShadow: 3,
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CardContent sx={{ textAlign: "center" }}>
            <Avatar
              src="https://api.dicebear.com/9.x/micah/svg?seed=Jisna"
              sx={{ width: 100, height: 100, mb: 2, mx: "auto" }}
            />
            <Typography variant="h6" fontWeight="bold">
              Jisna Kurian
            </Typography>
            <Typography variant="body2" color="text.secondary">
              MERN Stack Intern
            </Typography>

            <Typography sx={{ mt: 2, color: "green", fontWeight: "bold" }}>
              Remote In
            </Typography>

            <TimeDisplay time={time} />

            <Stack direction="row" spacing={2} justifyContent="center">
              <Button variant="contained" color="success">
                Check-In
              </Button>
              <Button variant="contained" color="error">
                Check-Out
              </Button>
            </Stack>
          </CardContent>
        </Card>
      </Grid>

      {/* Right Side */}
      <Grid item size={{xs:12,md:9}} >
        <Stack spacing={2} sx={{ width: "100%" }}>
          {/* Greeting + Logo */}
          <Card sx={{ borderRadius: 6, boxShadow: 3, width: "100%" }}>
            <CardContent
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              {/* Logo left side */}
              <img
                src="https://www.intervaledu.com/static/web/images/logo/logo-dark.png"
                alt="Interval Logo"
                style={{ width: 120, marginRight: 30 }}
              />

              {/* Greeting Center Side */}
              <Box sx={{ flex: 1, textAlign: "center" }}>
                <Typography variant="h6" fontWeight="bold">
                  {greeting()}, Jisna Kurian
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Have a productive day!
                </Typography>
              </Box>
            </CardContent>
          </Card>

          {/* ✅ Work Schedule with Paper + Apex Chart */}
          <Card sx={{ p: 3, mb: 2 }}>
            <Typography variant="h6" sx={{ mb: 1 }}>
              Work Schedule
            </Typography>
            <Typography sx={{ mb: 2 }}>
              31-Aug-2025 - 06-Sep-2025
            </Typography>

            <Paper
              elevation={2}
              sx={{
                bgcolor: "#eef6ff",
                p: 2,
                borderRadius: 2,
              }}
            >
              <Typography variant="body2" sx={{ mb: 1 }}>
                <strong>Technical</strong>{" "}
                <span style={{ color: "#1976d2" }}>10:00 AM - 7:00 PM</span>
              </Typography>

              {/* Apex Graph */}
              <Box sx={{ height: 250 }}>
                <Chart
                  options={chartOptions}
                  series={chartSeries}
                  type="bar"
                  height="100%"
                />
              </Box>

              <Divider sx={{ my: 2 }} />

              {/* Day-wise status */}
              {/* <Grid container spacing={2}>
        
                {scheduleData.map((day) => (
                  <Grid item key={day.day}>
                    <Typography sx={{ color: day.color }}>{day.day}</Typography>
                    <Typography
                      sx={{
                        fontSize: 12,
                        color:
                          day.status === "Remote In"
                            ? "green"
                            : day.status === "Absent"
                            ? "red"
                            : "#888",
                      }}
                    >
                      {day.status}
                    </Typography>
                    {day.hours > 0 && (
                      <Typography sx={{ fontSize: 12 }}>
                        {day.hours.toFixed(2)} Hrs
                      </Typography>
                    )}
                  </Grid>
                ))}
              </Grid> */}
            </Paper>
          </Card>
        </Stack>
      </Grid>
    </Grid>
  );
}

export default React.memo(Overview);
