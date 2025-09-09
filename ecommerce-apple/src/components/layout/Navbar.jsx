import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav style={{ padding: "1rem", backgroundColor: "#f5f5f5" }}>
      <ul style={{ display: "flex", listStyle: "none", gap: "1rem" }}>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/catalog">Catálogo</Link></li>
        <li><Link to="/cart">Carrito</Link></li>
        <li><Link to="/checkout">Checkout</Link></li>
        <li><Link to="/contact">Contacto</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;