import express from "express";
import {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
} from "../controllers/productController.js";
import { protect, authorize } from "../middlewares/authMiddlewares.js";

const router = express.Router();

router.get("/", getProducts);
router.get("/:id", getProductById);
router.post("/", protect, authorize("admin", "superadmin"), createProduct);
router.put("/:id", protect, authorize("admin", "superadmin"), updateProduct);
router.delete("/:id", protect, authorize("admin", "superadmin"), deleteProduct);

export default router;
