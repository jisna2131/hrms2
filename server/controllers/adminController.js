import { pool } from "../db.js";


// Get all employees
export const getEmployees = async (req, res) => {
try {
const [rows] = await pool.query(
"SELECT id, name, email, role_id, is_active FROM users WHERE role_id != 1"
);
res.json(rows);
} catch (err) {
res.status(500).json({ error: "Failed to fetch employees" });
}
};


// Update employee role (e.g., promote to HR)
export const updateRole = async (req, res) => {
const { id, roleId } = req.body;
try {
await pool.query("UPDATE users SET role_id=? WHERE id=?", [roleId, id]);
res.json({ message: "Role updated" });
} catch (err) {
res.status(500).json({ error: "Failed to update role" });
}
};


// Deactivate an employee
export const deactivateEmployee = async (req, res) => {
const { id } = req.params;
try {
await pool.query("UPDATE users SET is_active=0 WHERE id=?", [id]);
res.json({ message: "Employee deactivated" });
} catch (err) {
res.status(500).json({ error: "Failed to deactivate" });
}
};