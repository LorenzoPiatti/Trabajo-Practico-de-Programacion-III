import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import products from "../data/products";
import { useCartStore } from "../store/CartStore";
import CartItem from "../components/cart/CartItem";
import CartSummary from "../components/cart/CartSummary";
import "../styles/Cart.css";

function Cart() {
  const cart = useCartStore((state) => state.cart);
  const clearCart = useCartStore((state) => state.clearCart);

  return (
    <>
      <Navbar products={products} />
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
            <button onClick={clearCart}>Vaciar carrito</button>
          </>
        )}
      </div>
      <Footer />
    </>
  );
}

export default Cart;