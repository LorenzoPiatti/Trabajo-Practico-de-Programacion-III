import { db } from "../config/db.js";
import bcrypt from "bcryptjs";

// Listar usuarios
export const listUsers = async (req, res) => {
    try {
        const [users] = await db.query("SELECT id, name, email, role FROM users");
        res.json({ success: true, users });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};

// Actualizar usuario
export const updateUser = async (req, res) => {
    const { id } = req.params;
    const { name, email, password, role } = req.body;

    if (role && !["user", "admin", "superadmin"].includes(role)) {
        return res.status(400).json({ success: false, error: "Rol inválido" });
    }

    try {
        let query = "UPDATE users SET name=?, email=?";
        const params = [name, email];

        if (password) {
            const hashed = await bcrypt.hash(password, 10);
            query += ", password=?";
            params.push(hashed);
        }

        if (role) {
            query += ", role=?";
            params.push(role);
        }

        query += " WHERE id=?";
        params.push(id);

        const [result] = await db.query(query, params);
        if (result.affectedRows === 0) return res.status(404).json({ success: false, error: "Usuario no encontrado" });

        res.json({ success: true, message: "Usuario actualizado correctamente" });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};

// Eliminar usuario
export const deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        const [result] = await db.query("DELETE FROM users WHERE id=?", [id]);
        if (result.affectedRows === 0) return res.status(404).json({ success: false, error: "Usuario no encontrado" });
        res.json({ success: true, message: "Usuario eliminado correctamente" });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};
