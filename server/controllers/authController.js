import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { pool } from "../db.js";
import nodemailer from "nodemailer";

// JWT token generators
const genAccessToken = (user) =>
  jwt.sign(user, process.env.JWT_ACCESS_SECRET, { expiresIn: "15m" });

const genRefreshToken = (user) =>
  jwt.sign(user, process.env.JWT_REFRESH_SECRET, { expiresIn: "7d" });

// ------------------- REGISTER -------------------
export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const [users] = await pool.query("SELECT COUNT(*) as cnt FROM users");
    const isFirstUser = users[0].cnt === 0;

    const hashed = await bcrypt.hash(password, 10);
    const roleId = isFirstUser ? 1 : 2;

    const [result] = await pool.query(
      "INSERT INTO users (name,email,password_hash,role_id,is_active) VALUES (?,?,?,?,1)",
      [name, email, hashed, roleId]
    );

    res.status(201).json({ message: "Registered", id: result.insertId, roleId });
  } catch (err) {
    console.error("Register error:", err);
    res.status(500).json({ error: "Registration failed" });
  }
};

// ------------------- LOGIN -------------------
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const [rows] = await pool.query("SELECT * FROM users WHERE email=?", [email]);
    if (!rows.length) return res.status(400).json({ error: "Invalid credentials" });

    const user = rows[0];
    const match = await bcrypt.compare(password, user.password_hash);
    if (!match) return res.status(400).json({ error: "Invalid credentials" });

    const role = user.role_id === 1 ? "admin" : "employee";
    const payload = { id: user.id, role, email: user.email, name: user.name };

    const accessToken = genAccessToken(payload);
    const refreshToken = genRefreshToken(payload);

    // Delete old refresh tokens & save new
    await pool.query("DELETE FROM refresh_tokens WHERE user_id=?", [user.id]);
    await pool.query("INSERT INTO refresh_tokens (user_id, token) VALUES (?, ?)", [user.id, refreshToken]);

    res.cookie("refreshToken", refreshToken, { httpOnly: true, sameSite: "strict" });
    res.json({ accessToken, user: payload });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: "Login failed" });
  }
};

// ------------------- REFRESH -------------------
export const refresh = async (req, res) => {
  const token = req.cookies.refreshToken;
  if (!token) return res.status(401).json({ error: "No token" });

  try {
    const [rows] = await pool.query("SELECT * FROM refresh_tokens WHERE token=?", [token]);
    if (!rows.length) return res.status(403).json({ error: "Invalid refresh" });

    jwt.verify(token, process.env.JWT_REFRESH_SECRET, (err, user) => {
      if (err) return res.status(403).json({ error: "Token expired" });

      const accessToken = genAccessToken({ id: user.id, email: user.email, role: user.role });
      res.json({ accessToken });
    });
  } catch (err) {
    console.error("Refresh error:", err);
    res.status(500).json({ error: "Refresh failed" });
  }
};

// ------------------- FORGOT PASSWORD OTP -------------------
export const sendResetOTP = async (req, res) => {
  const { email } = req.body;

  try {
    const [users] = await pool.query("SELECT * FROM users WHERE email=?", [email]);
    if (!users.length) return res.status(400).json({ error: "User not found" });

    const user = users[0];
    const otp = Math.floor(100000 + Math.random() * 900000); // 6-digit
    const expires = new Date(Date.now() + 5 * 60 * 1000); // 5 min

    await pool.query(
      `INSERT INTO password_resets (user_id, otp, expires_at) 
       VALUES (?, ?, ?) 
       ON DUPLICATE KEY UPDATE otp=?, expires_at=?`,
      [user.id, otp, expires, otp, expires]
    );

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: { user: "jisnakurian357@gmail.com",
         pass: "ntaexxboqwppmowd"}
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Password Reset OTP",
      text: `Your OTP for password reset is: ${otp}. Valid for 5 minutes.`,
    });

    res.json({ success: true, message: "OTP sent to email" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to send OTP" });
  }
};

// ------------------- VERIFY OTP & RESET -------------------
export const verifyResetOTP = async (req, res) => {
  const { email, otp, newPassword } = req.body;

  try {
    const [users] = await pool.query("SELECT * FROM users WHERE email=?", [email]);
    if (!users.length) return res.status(400).json({ error: "User not found" });

    const user = users[0];
    const [otpRows] = await pool.query(
      "SELECT * FROM password_resets WHERE user_id=? AND otp=? AND expires_at>NOW()",
      [user.id, otp]
    );

    if (!otpRows.length) return res.status(400).json({ error: "Invalid or expired OTP" });

    const hashed = await bcrypt.hash(newPassword, 10);
    await pool.query("UPDATE users SET password_hash=? WHERE id=?", [hashed, user.id]);
    await pool.query("DELETE FROM password_resets WHERE user_id=?", [user.id]);

    res.json({ success: true, message: "Password reset successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Password reset failed" });
  }
};
