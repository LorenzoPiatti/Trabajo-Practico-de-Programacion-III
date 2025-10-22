import express from "express";
import { 
    createPedido, 
    listPedidos, 
    listMisPedidos, 
    updatePedido, 
    cancelarPedido, 
    deletePedido 
} from "../controllers/pedidoController.js";
import { protect, authorize } from "../middlewares/authMiddlewares.js";

const router = express.Router();

router.post("/", protect, createPedido);
router.get("/mis-pedidos", protect, listMisPedidos);
router.get("/", protect, authorize("admin", "superadmin"), listPedidos);
router.put("/:id", protect, authorize("admin", "superadmin"), updatePedido);
router.put("/:id/cancelar", protect, cancelarPedido);
router.delete("/:id", protect, authorize("superadmin"), deletePedido);

export default router;
