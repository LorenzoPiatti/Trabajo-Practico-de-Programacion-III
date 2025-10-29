import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

export const Pedido = sequelize.define(
    "Pedido",
    {
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: "user_id", 
        },
        productos: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        total: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
        },
        estado: {
            type: DataTypes.ENUM("pendiente", "enviando", "cancelado", "entregado"),
            defaultValue: "pendiente",
        },
        activo: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
        },
    },
    {
        tableName: "pedidos",
        timestamps: true, 
        createdAt: "created_at",
        updatedAt: "updated_at",
    }
);
