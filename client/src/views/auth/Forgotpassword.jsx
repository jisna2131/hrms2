import React, { useState } from "react";
import { Box, Button, Container, TextField, Typography, Paper } from "@mui/material";
import axios from "axios";

export default function ForgotPassword() {
  const [step, setStep] = useState(1); // 1=email, 2=otp
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const sendOTP = async () => {
    try {
      await axios.post("http://localhost:4000/api/auth/forgotpassword/send-otp", { email });
      setStep(2);
    } catch (err) {
      console.error(err);
      alert("Failed to send OTP");
    }
  };

  const verifyOTP = async () => {
    try {
      await axios.post("http://localhost:4000/api/auth/forgotpassword/verify-otp", {
        email,
        otp,
        newPassword,
      });
      alert("Password reset successfully!");
      setStep(1);
      setEmail("");
      setOtp("");
      setNewPassword("");
    } catch (err) {
      console.error(err);
      alert(err.response.data.error || "Failed to reset password");
    }
  };

  return (
    <Container maxWidth="sm" sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh" }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 3, width: "100%", textAlign: "center" }}>
        <Typography variant="h5" gutterBottom>Forgot Password</Typography>

        {step === 1 && (
          <>
            <TextField
              label="Email Address"
              type="email"
              fullWidth
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              sx={{ mb: 3 }}
            />
            <Button variant="contained" fullWidth onClick={sendOTP}>Send OTP</Button>
          </>
        )}

        {step === 2 && (
          <>
            <TextField
              label="OTP"
              fullWidth
              required
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              sx={{ mb: 3 }}
            />
            <TextField
              label="New Password"
              type="password"
              fullWidth
              required
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              sx={{ mb: 3 }}
            />
            <Button variant="contained" fullWidth onClick={verifyOTP}>Reset Password</Button>
          </>
        )}
      </Paper>
    </Container>
  );
}
