import { db } from "../config/db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


export const register = async (req, res) => {
    const { name, email, password, role } = req.body;

    try {

        const [existing] = await db.query("SELECT * FROM users WHERE email = ?", [email]);
        if (existing.length > 0) {
            return res.status(400).json({ success: false, error: "Usuario ya registrado" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);


        await db.query("INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)", [
            name,
            email,
            hashedPassword,
            role || "user",
        ]);

        res.status(201).json({ success: true, message: "Usuario registrado correctamente" });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};


export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const [rows] = await db.query("SELECT * FROM users WHERE email = ?", [email]);
        if (rows.length === 0) {
            return res.status(400).json({ success: false, error: "Email o contraseña incorrectos" });
        }

        const user = rows[0];

        
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ success: false, error: "Email o contraseña incorrectos" });
        }

        const token = jwt.sign(
            { id: user.id, name: user.name, role: user.role, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        res.json({
            success: true,
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};
