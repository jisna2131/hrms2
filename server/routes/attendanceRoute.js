import express from "express";
import { checkIn, checkOut, getTodayDuration } from "../controllers/attendanceController.js";

const router = express.Router();

router.post("/attendance/checkin/:userId", checkIn);
router.post("/attendance/checkout/:userId", checkOut);
router.get("/attendance/status/:userId",getTodayDuration);

export default router;
