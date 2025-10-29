import { useCart } from "../../context/CartContext";

function CartSummary() {
  const { cart } = useCart(); // ✅ usamos contexto en lugar de zustand

  const total = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div>
      <h3>Resumen del carrito</h3>
      <p>Total: ${total}</p>
    </div>
  );
}

export default CartSummary;