import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Button,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";
import { Add, Edit, Delete } from "@mui/icons-material";

export default function RoleDashboard() {
  const [roles, setRoles] = useState([]);
  const [openAdd, setOpenAdd] = useState(false);
  const [newRole, setNewRole] = useState({ role_name: "", description: "" });
  const [openEdit, setOpenEdit] = useState(false);
  const [editRole, setEditRole] = useState({ id: null, role_name: "", description: "" });

  useEffect(() => {
    fetchRoles();
  }, []);

  const fetchRoles = async () => {
    try {
      const res = await axios.get("http://localhost:4000/api/roles");
      setRoles(res.data);
    } catch (err) {
      console.error("Failed to fetch roles", err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this role?")) return;
    try {
      await axios.put(`http://localhost:4000/api/roles/delete/${id}`, { deletedBy: 1 });
      fetchRoles();
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  const handleEditOpen = (role) => {
    setEditRole(role);
    setOpenEdit(true);
  };

  const handleUpdateRole = async () => {
    if (!editRole.role_name.trim()) return alert("Role Name is required!");
    try {
      await axios.put(`http://localhost:4000/api/roles/${editRole.id}`, editRole);
      setOpenEdit(false);
      fetchRoles();
    } catch (err) {
      console.error("Update failed", err);
    }
  };

  const handleAddRole = async () => {
    if (!newRole.role_name.trim()) return alert("Role Name is required!");
    try {
      await axios.post("http://localhost:4000/api/roles", newRole);
      setOpenAdd(false);
      setNewRole({ role_name: "", description: "" });
      fetchRoles();
    } catch (err) {
      console.error("Add role failed", err);
    }
  };

  return (
    <Box p={4}>
      <Typography variant="h5" gutterBottom>
        Roles Dashboard
      </Typography>

      <Button
        variant="contained"
        startIcon={<Add />}
        onClick={() => setOpenAdd(true)}
        sx={{ mb: 2 }}
      >
        Add Role
      </Button>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Role Name</TableCell>
              <TableCell>Description</TableCell>
             
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {roles.map((role) => (
              <TableRow key={role.id}>
                <TableCell>{role.id}</TableCell>
                <TableCell>{role.role_name}</TableCell>
                <TableCell>{role.description}</TableCell>
               
                <TableCell>
                  <Button
                    variant="outlined"
                    color="primary"
                    startIcon={<Edit />}
                    sx={{ mr: 1 }}
                    onClick={() => handleEditOpen(role)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    startIcon={<Delete />}
                    onClick={() => handleDelete(role.id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Add Role Modal */}
      <Dialog open={openAdd} onClose={() => setOpenAdd(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Add New Role</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Role Name"
            fullWidth
            value={newRole.role_name}
            onChange={(e) => setNewRole({ ...newRole, role_name: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Description"
            fullWidth
            multiline
            rows={3}
            value={newRole.description}
            onChange={(e) => setNewRole({ ...newRole, description: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenAdd(false)} color="secondary">
            Cancel
          </Button>
          <Button variant="contained" onClick={handleAddRole}>
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* Edit Role Modal */}
      <Dialog open={openEdit} onClose={() => setOpenEdit(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Edit Role</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Role Name"
            fullWidth
            value={editRole.role_name}
            onChange={(e) => setEditRole({ ...editRole, role_name: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Description"
            fullWidth
            multiline
            rows={3}
            value={editRole.description}
            onChange={(e) => setEditRole({ ...editRole, description: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEdit(false)} color="secondary">
            Cancel
          </Button>
          <Button variant="contained" onClick={handleUpdateRole}>
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
