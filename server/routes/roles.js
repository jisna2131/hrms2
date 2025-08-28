import express from "express";
import { getRoles, addRole, updateRole, deleteRole } from "../controllers/rolesController.js";

const router = express.Router();

router.get("/", getRoles);
router.post("/", addRole);
router.put("/:id", updateRole);
router.put("/delete/:id", deleteRole);

export default router;
