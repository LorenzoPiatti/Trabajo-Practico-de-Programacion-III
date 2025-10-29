import { db } from "../config/db.js";

export const createPedido = async (req, res) => {
    const { productos, total } = req.body;
    const user_id = req.user.id;

    try {
        const [result] = await db.query(
            "INSERT INTO pedidos (user_id, productos, total, estado) VALUES (?, ?, ?, ?)",
            [user_id, JSON.stringify(productos), total, "pendiente"] // estado inicial
        );

        const [pedido] = await db.query("SELECT * FROM pedidos WHERE id=?", [result.insertId]);

        res.status(201).json({ success: true, pedido: pedido[0] });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};

export const listPedidos = async (req, res) => {
    try {
        const [rows] = await db.query("SELECT * FROM pedidos WHERE activo=TRUE");
        res.json({ success: true, pedidos: rows });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};


export const listMisPedidos = async (req, res) => {
    const user_id = req.user.id;

    try {
        const [rows] = await db.query("SELECT * FROM pedidos WHERE user_id=? AND activo=TRUE", [user_id]);
        res.json({ success: true, pedidos: rows });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};


export const updatePedido = async (req, res) => {
    const { id } = req.params;
    const { estado } = req.body;

    const estadosValidos = ["pendiente", "enviando", "cancelado", "entregado"];
    if (!estadosValidos.includes(estado)) {
        return res.status(400).json({ success: false, error: "Estado inválido" });
    }

    try {
        await db.query("UPDATE pedidos SET estado=? WHERE id=?", [estado, id]);
        res.json({ success: true, message: "Pedido actualizado" });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};


export const cancelarPedido = async (req, res) => {
    const { id } = req.params;

    try {
        const [rows] = await db.query("SELECT estado FROM pedidos WHERE id=?", [id]);
        if (!rows.length) {
            return res.status(404).json({ success: false, error: "Pedido no encontrado" });
        }
        if (["cancelado", "entregado"].includes(rows[0].estado)) {
            return res.status(400).json({ success: false, error: "No se puede cancelar este pedido" });
        }
        await db.query("UPDATE pedidos SET estado='cancelado' WHERE id=?", [id]);
        res.json({ success: true, message: "Pedido cancelado correctamente" });
    } catch (err) {
        console.error("Error al cancelar pedido:", err);
        res.status(500).json({ success: false, error: "Error interno del servidor" });
    }
};



export const deletePedido = async (req, res) => {
    const { id } = req.params;

    try {
        await db.query("UPDATE pedidos SET activo=FALSE WHERE id=?", [id]);
        res.json({ success: true, message: "Pedido eliminado (inactivo)" });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};
