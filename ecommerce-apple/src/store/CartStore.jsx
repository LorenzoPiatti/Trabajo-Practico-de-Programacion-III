import { useCart } from "../context/CartContext"; 
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import Button from "../components/ui/Button";

function Cart() {
  const { cart, addToCart, removeFromCart, clearCart } = useCart();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (cart.length === 0)
    return (
      <>
        <Navbar />
        <main>
          <h1>Carrito</h1>
          <p>No hay productos en el carrito.</p>
        </main>
        <Footer />
      </>
    );

  return (
    <>
      <Navbar />
      <main>
        <h1>Carrito</h1>
        {cart.map((item) => (
          <div key={item.id} style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
            <span>{item.name}</span>
            <span>Cantidad: {item.quantity}</span>
            <span>Precio: ${item.price}</span>
            <Button onClick={() => addToCart(item)}>+</Button>
            <Button onClick={() => removeFromCart(item.id)}>-</Button>
          </div>
        ))}
        <h2>Total: ${total}</h2>
        <Button onClick={clearCart}>Vaciar Carrito</Button>
      </main>
      <Footer />
    </>
  );
}

export default Cart;
