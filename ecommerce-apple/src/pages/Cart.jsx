import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { useCartStore } from "../store/CartStore";
import CartItem from "../components/cart/CartItem";
import CartSummary from "../components/cart/CartSummary";

function Cart() {
  const cart = useCartStore((state) => state.cart);
  const clearCart = useCartStore((state) => state.clearCart);

  return (
    <div>
      <h2>Carrito</h2>
      {cart.length === 0 ? (
        <p>Tu carrito está vacío</p>
      ) : (
        <>
          <ul>
            {cart.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
          </ul>
          <CartSummary />
          <button onClick={clearCart}>Vaciar carrito</button>
        </>
      )}
    </div>
  );
}

export default Cart;