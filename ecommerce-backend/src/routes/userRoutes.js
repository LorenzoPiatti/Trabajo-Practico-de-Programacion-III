import express from "express";
import { listUsers, updateUser, deleteUser } from "../controllers/userController.js";
import { protect, authorize } from "../middlewares/authMiddlewares.js";

const router = express.Router();

router.get("/", protect, authorize("superadmin"), listUsers);
router.put("/:id", protect, authorize("superadmin"), updateUser); 
router.delete("/:id", protect, authorize("superadmin"), deleteUser);

export default router;
