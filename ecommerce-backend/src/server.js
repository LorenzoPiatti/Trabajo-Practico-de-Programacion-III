import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

import { sequelize, initDb } from "./config/db.js";
import { User, Product, Pedido } from "./models/index.js";

import authRoutes from "./routes/authRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import pedidoRoutes from "./routes/pedidoRoutes.js";

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", pedidoRoutes);

initDb().then(async () => {
    await sequelize.sync({ alter: false }); // no altera datos existentes
    console.log("✅ Tablas sincronizadas");
    app.listen(PORT, () => console.log(`✅ Servidor corriendo en http://localhost:${PORT}`));
});

