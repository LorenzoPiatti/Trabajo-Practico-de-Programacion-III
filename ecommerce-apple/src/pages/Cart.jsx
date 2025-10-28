import { useState, useContext } from "react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { useCartStore } from "../store/CartStore";
import CartItem from "../components/cart/CartItem";
import CartSummary from "../components/cart/CartSummary";
import { AuthContext } from "../context/AuthContext";
import "../styles/Cart.css";
import Button from "../components/ui/Button";

function Cart() {
  const { user } = useContext(AuthContext);
  const cart = useCartStore((state) => state.cart);
  const clearCart = useCartStore((state) => state.clearCart);
  const [loading, setLoading] = useState(false);

  const handlePurchase = async () => {
    if (!user || !user.token) {
      alert("Debes iniciar sesión para comprar");
      return;
    }
    if (cart.length === 0) {
      alert("El carrito está vacío");
      return;
    }

    if (!window.confirm("¿Confirmar compra?")) return;

    setLoading(true);
    try {
      // Enviamos el carrito como productos al backend
      const res = await fetch("http://localhost:4000/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({
          productos: cart.map((item) => ({
            productId: item.id,
            nombre: item.name,
            cantidad: item.quantity || 1,
            price: item.price,
          })),
          total: cart.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0),
        }),
      });

      const data = await res.json();

      if (data.success) {
        alert("Compra realizada correctamente");
        clearCart();
      } else {
        alert("Hubo un error al procesar la compra");
      }
    } catch (err) {
      console.error(err);
      alert("Hubo un error al procesar la compra");
    }
    setLoading(false);
  };

  return (
    <>
      <Navbar />
      <div className="cart-container">
        <h2>Carrito</h2>
        {cart.length === 0 ? (
          <p className="cart-empty">Tu carrito está vacío</p>
        ) : (
          <>
            <ul>
              {cart.map((item) => (
                <CartItem key={item.id} item={item} />
              ))}
            </ul>

            <div className="cart-summary">
              <CartSummary />
            </div>

            <div style={{ display: "flex", gap: "1rem", justifyContent: "center", marginTop: "20px" }}>
              <Button onClick={clearCart}>Vaciar carrito</Button>
              <Button onClick={handlePurchase} disabled={loading}>
                {loading ? "Procesando..." : "Comprar"}
              </Button>
            </div>
          </>
        )}
      </div>
      <Footer />
    </>
  );
}

export default Cart;
