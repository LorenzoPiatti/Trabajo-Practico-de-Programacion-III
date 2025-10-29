import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

export const Product = sequelize.define(
    "Product",
    {
        name: { type: DataTypes.STRING(255), allowNull: false },
        description: { type: DataTypes.TEXT },
        price: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
        category: { type: DataTypes.STRING(50) },
        image: { type: DataTypes.STRING(255) },
        featured: { type: DataTypes.BOOLEAN, defaultValue: false }
    },
    {
        tableName: "products",
        timestamps: false
    }
);
