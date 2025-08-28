import { pool } from "../db.js";

// Get all roles
export const getRoles = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM roles WHERE deleted_at IS NULL");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};




// Add new role
export const addRole = async (req, res) => {
  try {
    const { role_name, description } = req.body;

    if (!role_name || role_name.trim() === "") {
      return res.status(400).json({ message: "Role name is required" });
    }

    const [result] = await pool.query(
      "INSERT INTO roles (role_name, description) VALUES (?, ?)",
      [role_name.trim(), description || ""]
    );

    const [rows] = await pool.query("SELECT * FROM roles WHERE id = ?", [result.insertId]);
    res.json(rows[0]);
  } catch (err) {
    console.error("Add role error:", err.message);
    res.status(500).json({ message: "Failed to add role", error: err.message });
  }
};

// Update role
export const updateRole = async (req, res) => {
  try {
    const { id } = req.params;
    const { role_name, description } = req.body;

    if (!role_name || role_name.trim() === "") {
      return res.status(400).json({ message: "Role name is required" });
    }

    await pool.query(
      "UPDATE roles SET role_name = ?, description = ? WHERE id = ?",
      [role_name.trim(), description || "", id]
    );

    const [rows] = await pool.query("SELECT * FROM roles WHERE id = ?", [id]);
    res.json(rows[0]);
  } catch (err) {
    console.error("Update role error:", err.message);
    res.status(500).json({ message: err.message });
  }
};


// Soft delete role
export const deleteRole = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedBy = req.body.deletedBy || null;

    await pool.query(
      "UPDATE roles SET deleted_at = NOW(), deleted_by = ? WHERE id = ?",
      [deletedBy, id]
    );

    res.json({ message: "Role deleted" });
  } catch (err) {
    console.error("Delete role error:", err.message);
    res.status(500).json({ message: err.message });
  }
};
