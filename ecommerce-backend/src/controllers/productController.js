import { Product } from "../models/index.js"; 
export const getProducts = async (req, res) => {
    try {
        const products = await Product.findAll();
        res.json({ success: true, products });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};

export const getProductById = async (req, res) => {
    const { id } = req.params;
    try {
        const product = await Product.findByPk(id);
        if (!product) return res.status(404).json({ success: false, error: "Producto no encontrado" });
        res.json({ success: true, product });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};

export const createProduct = async (req, res) => {
    const { name, description, price, category, image, featured } = req.body;
    try {
        const product = await Product.create({ name, description, price, category, image, featured: featured || false });
        res.status(201).json({ success: true, productId: product.id });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};

export const updateProduct = async (req, res) => {
    const { id } = req.params;
    const { name, description, price, category, image, featured } = req.body;
    try {
        const product = await Product.findByPk(id);
        if (!product) return res.status(404).json({ success: false, error: "Producto no encontrado" });
        await product.update({ name, description, price, category, image, featured });
        res.json({ success: true, message: "Producto actualizado" });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};

export const deleteProduct = async (req, res) => {
    const { id } = req.params;
    try {
        const product = await Product.findByPk(id);
        if (!product) return res.status(404).json({ success: false, error: "Producto no encontrado" });
        await product.destroy();
        res.json({ success: true, message: "Producto eliminado" });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};
