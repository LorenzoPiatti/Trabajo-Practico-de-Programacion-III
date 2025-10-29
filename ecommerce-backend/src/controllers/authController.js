import { User } from "../models/index.js"; 
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "tu_clave_secreta";

export const register = async (req, res) => {
    const { name, email, password, role } = req.body;
    try {
        const existing = await User.findOne({ where: { email } });
        if (existing) return res.status(400).json({ success: false, error: "Usuario ya registrado" });

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ name, email, password: hashedPassword, role: role || "user" });

        res.status(201).json({ success: true, message: "Usuario registrado", user });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ where: { email } });
        if (!user) return res.status(400).json({ success: false, error: "Email o contraseña incorrectos" });

        const match = await bcrypt.compare(password, user.password);
        if (!match) return res.status(400).json({ success: false, error: "Email o contraseña incorrectos" });

        const token = jwt.sign({ id: user.id, name: user.name, role: user.role, email: user.email }, JWT_SECRET, { expiresIn: "1d" });
        res.json({ success: true, token, user: { id: user.id, name: user.name, email: user.email, role: user.role } });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};

