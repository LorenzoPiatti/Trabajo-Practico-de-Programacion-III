import express from "express";
import { listUsers, updateUserRole, deleteUser } from "../controllers/userController.js";
import { protect, authorize } from "../middlewares/authMiddlewares.js";

const router = express.Router();

router.get("/", protect, authorize("superadmin"), listUsers);
router.put("/:id/role", protect, authorize("superadmin"), updateUserRole);
router.delete("/:id", protect, authorize("superadmin"), deleteUser);

export default router;