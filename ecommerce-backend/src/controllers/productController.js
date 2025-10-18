import { db } from "../config/db.js";

export const getProducts = async (req, res) => {
    try {
        const [rows] = await db.query("SELECT * FROM products");
        res.json({ success: true, products: rows });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};

export const getProductById = async (req, res) => {
    const { id } = req.params;
    try {
        const [rows] = await db.query("SELECT * FROM products WHERE id = ?", [id]);
        if (rows.length === 0) {
            return res.status(404).json({ success: false, error: "Producto no encontrado" });
        }
        res.json({ success: true, product: rows[0] });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};

export const createProduct = async (req, res) => {
    const { name, description, price, category, image, featured } = req.body;
    try {
        const [result] = await db.query(
            "INSERT INTO products (name, description, price, category, image, featured) VALUES (?, ?, ?, ?, ?, ?)",
            [name, description, price, category, image, featured || false]
        );
        res.status(201).json({ success: true, productId: result.insertId });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};

export const updateProduct = async (req, res) => {
    const { id } = req.params;
    const { name, description, price, category, image, featured } = req.body;
    try {
        await db.query(
            "UPDATE products SET name=?, description=?, price=?, category=?, image=?, featured=? WHERE id=?",
            [name, description, price, category, image, featured, id]
        );
        res.json({ success: true, message: "Producto actualizado" });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};

export const deleteProduct = async (req, res) => {
    const { id } = req.params;
    try {
        await db.query("DELETE FROM products WHERE id=?", [id]);
        res.json({ success: true, message: "Producto eliminado" });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};
