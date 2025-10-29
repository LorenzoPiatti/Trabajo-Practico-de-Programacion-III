import { Pedido } from "../models/index.js"; 

export const createPedido = async (req, res) => {
    const { productos, total } = req.body;
    const userId = req.user.id;
    try {
        const pedido = await Pedido.create({ userId, productos: JSON.stringify(productos), total, estado: "pendiente" });
        res.status(201).json({ success: true, pedido });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};

export const listPedidos = async (req, res) => {
    try {
        const pedidos = await Pedido.findAll({ where: { activo: true } });
        res.json({ success: true, pedidos });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};

export const listMisPedidos = async (req, res) => {
    const userId = req.user.id;
    try {
        const pedidos = await Pedido.findAll({ where: { userId, activo: true } });
        res.json({ success: true, pedidos });
    } catch (err) {
        console.error("Error al crear pedido:", err);
        res.status(500).json({ success: false, error: err.message });
    }
};

export const updatePedido = async (req, res) => {
    const { id } = req.params;
    const { estado } = req.body;
    const estadosValidos = ["pendiente", "enviando", "cancelado", "entregado"];
    if (!estadosValidos.includes(estado)) return res.status(400).json({ success: false, error: "Estado inválido" });

    try {
        const pedido = await Pedido.findByPk(id);
        if (!pedido) return res.status(404).json({ success: false, error: "Pedido no encontrado" });
        await pedido.update({ estado });
        res.json({ success: true, message: "Pedido actualizado" });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};

export const cancelarPedido = async (req, res) => {
    const { id } = req.params;
    try {
        const pedido = await Pedido.findByPk(id);
        if (!pedido) return res.status(404).json({ success: false, error: "Pedido no encontrado" });
        if (["cancelado", "entregado"].includes(pedido.estado)) {
            return res.status(400).json({ success: false, error: "No se puede cancelar este pedido" });
        }
        await pedido.update({ estado: "cancelado" });
        res.json({ success: true, message: "Pedido cancelado correctamente" });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};

export const deletePedido = async (req, res) => {
    const { id } = req.params;
    try {
        const pedido = await Pedido.findByPk(id);
        if (!pedido) return res.status(404).json({ success: false, error: "Pedido no encontrado" });
        await pedido.update({ activo: false });
        res.json({ success: true, message: "Pedido eliminado (inactivo)" });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};
