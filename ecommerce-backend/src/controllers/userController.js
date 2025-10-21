import { db } from "../config/db.js";

// Listar todos los usuarios
export const listUsers = async (req, res) => {
    try {
        const [users] = await db.query("SELECT id, name, email, role FROM users");
        res.json({ success: true, users });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};

// Cambiar rol de un usuario
export const updateUserRole = async (req, res) => {
    const { id } = req.params;
    const { role } = req.body;

    if (!["user", "admin", "superadmin"].includes(role)) {
        return res.status(400).json({ success: false, error: "Rol inválido" });
    }

    try {
        const [result] = await db.query("UPDATE users SET role=? WHERE id=?", [role, id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ success: false, error: "Usuario no encontrado" });
        }
        res.json({ success: true, message: "Rol actualizado correctamente" });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};

// Eliminar usuario
export const deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        const [result] = await db.query("DELETE FROM users WHERE id=?", [id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ success: false, error: "Usuario no encontrado" });
        }
        res.json({ success: true, message: "Usuario eliminado correctamente" });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};
