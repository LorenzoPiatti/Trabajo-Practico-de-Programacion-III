import { User } from "../models/index.js"; 
import { hashPassword } from "../utils/authUtils.js";


export const createUser = async (req, res) => {
    const { name, email, password, role } = req.body;
    try {
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) return res.status(400).json({ success: false, error: "El email ya está registrado" });

        const hashedPassword = hashPassword(password);

        const newUser = await User.create({ name, email, password: hashedPassword, role: role || "user" });
        res.status(201).json({ success: true, message: "Usuario creado correctamente", userId: newUser.id });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};


export const listUsers = async (req, res) => {
    try {
        const users = await User.findAll({ attributes: ["id", "name", "email", "role"] });
        res.json({ success: true, users });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};


export const getUserById = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findByPk(id, { attributes: ["id", "name", "email", "role"] });
        if (!user) return res.status(404).json({ success: false, error: "Usuario no encontrado" });
        res.json({ success: true, user });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};


export const updateUser = async (req, res) => {
    const { id } = req.params;
    const { name, email, password, role } = req.body;

    if (role && !["user", "admin", "superadmin"].includes(role)) {
        return res.status(400).json({ success: false, error: "Rol inválido" });
    }

    try {
        const user = await User.findByPk(id);
        if (!user) return res.status(404).json({ success: false, error: "Usuario no encontrado" });

        let newPassword = user.password;
        if (password) newPassword = hashPassword(password);

        await user.update({ name: name || user.name, email: email || user.email, password: newPassword, role: role || user.role });
        res.json({ success: true, message: "Usuario actualizado correctamente" });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};


export const deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findByPk(id);
        if (!user) return res.status(404).json({ success: false, error: "Usuario no encontrado" });

        await user.destroy();
        res.json({ success: true, message: "Usuario eliminado correctamente" });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};
