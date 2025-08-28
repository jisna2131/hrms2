import { pool } from "../db.js";

// ✅ CHECK-IN
export const checkIn = async (req, res) => {
  const { userId } = req.params;
  const now = new Date();

  try {
    // Find last IN
    const [lastInRows] = await pool.query(
      `SELECT * FROM attendance 
       WHERE user_id=? AND check_type='IN' 
       ORDER BY check_timestamp DESC LIMIT 1`,
      [userId]
    );

    // Find last OUT
    const [lastOutRows] = await pool.query(
      `SELECT * FROM attendance 
       WHERE user_id=? AND check_type='OUT' 
       ORDER BY check_timestamp DESC LIMIT 1`,
      [userId]
    );

    // ✅ If last IN exists and there’s no OUT after it → still checked in
    // if (
    //   lastInRows.length &&
    //   (!lastOutRows.length ||
    //     new Date(lastOutRows[0].check_timestamp) < new Date(lastInRows[0].check_timestamp))
    // ) {
    //   return res.status(400).json({ error: "Already checked in" });
    // }

    // Insert IN record
    await pool.query(
      "INSERT INTO attendance (user_id, check_timestamp, check_type) VALUES (?, ?, 'IN')",
      [userId, now]
    );

    res.json({ success: true, checkInTime: now });
  } catch (err) {
    console.error("Check-in failed:", err);
    res.status(500).json({ error: "Check-in failed" });
  }
};

// ✅ CHECK-OUT
export const checkOut = async (req, res) => {
  const { userId } = req.params;
  const now = new Date();

  try {
    // Find last IN
    const [lastInRows] = await pool.query(
      `SELECT * FROM attendance 
       WHERE user_id=? AND check_type='IN' 
       ORDER BY check_timestamp DESC LIMIT 1`,
      [userId]
    );

    if (!lastInRows.length) {
      return res.status(400).json({ error: "No active check-in found" });
    }

    const lastIn = lastInRows[0];

    // Find last OUT
    const [lastOutRows] = await pool.query(
      `SELECT * FROM attendance 
       WHERE user_id=? AND check_type='OUT' 
       ORDER BY check_timestamp DESC LIMIT 1`,
      [userId]
    );

    // ✅ If OUT already exists after IN → already checked out
    // if (
    //   lastOutRows.length &&
    //   new Date(lastOutRows[0].check_timestamp) > new Date(lastIn.check_timestamp)
    // ) {
    //   return res.status(400).json({ error: "Already checked out" });
    // }

    // Calculate worked seconds
    const seconds = Math.floor((now - new Date(lastIn.check_timestamp)) / 1000);

    // Insert OUT
    await pool.query(
      "INSERT INTO attendance (user_id, check_timestamp, check_type, difference) VALUES (?, ?, 'OUT', ?)",
      [userId, now, seconds]
    );

    // Update IN with difference
    await pool.query("UPDATE attendance SET difference=? WHERE id=?", [
      seconds,
      lastIn.id,
    ]);

    res.json({ success: true, duration: seconds });
  } catch (err) {
    console.error("Check-out failed:", err);
    res.status(500).json({ error: "Check-out failed" });
  }
};

// ✅ GET TODAY’S TOTAL DURATION
export const getTodayDuration = async (req, res) => {
  const { userId } = req.params;

  try {
    const [rows] = await pool.query(
      `SELECT * FROM attendance 
       WHERE user_id=? AND DATE(check_timestamp)=CURDATE() 
       ORDER BY check_timestamp ASC`,
      [userId]
    );

    let totalSeconds = 0;
    let lastInTime = null;

    rows.forEach((rec) => {
      if (rec.check_type === "IN") {
        lastInTime = new Date(rec.check_timestamp);
      } else if (rec.check_type === "OUT" && lastInTime) {
        totalSeconds += rec.difference || 0;
        lastInTime = null;
      }
    });

    // ✅ Add live running session (if checked in but not out yet)
    if (lastInTime) {
      totalSeconds += Math.floor((new Date() - lastInTime) / 1000);
    }

    res.json({ checkedIn: !!lastInTime, totalSeconds });
  } catch (err) {
    console.error("Fetching duration failed:", err);
    res.status(500).json({ error: "Failed to fetch duration" });
  }
};
