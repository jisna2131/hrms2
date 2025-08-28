import express from "express";
import { register, login, refresh, sendResetOTP, verifyResetOTP } from "../controllers/authController.js";

const router = express.Router();

// Auth routes
router.post("/register", register);
router.post("/login", login);
router.post("/refresh", refresh);

// Forgot Password routes
router.post("/forgotpassword/send-otp", sendResetOTP);      // send OTP to email
router.post("/resetpassword/verify-otp", verifyResetOTP);     // verify OTP and reset password

export default router;
