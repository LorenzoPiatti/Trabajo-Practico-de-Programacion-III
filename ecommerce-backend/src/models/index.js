import { User } from "./user.js";
import { Product } from "./product.js";
import { Pedido } from "./pedido.js";


Pedido.belongsTo(User, { foreignKey: "userId" });
User.hasMany(Pedido, { foreignKey: "userId" });

export { User, Product, Pedido };
