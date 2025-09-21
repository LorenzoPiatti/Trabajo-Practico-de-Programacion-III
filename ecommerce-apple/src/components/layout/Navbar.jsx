import { Link } from "react-router-dom";
import "/src/styles/Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img src="/src/assets/logo-apple-2.png" alt="logo" />
        <span>Apple Store</span>
      </div>

      <div className="navbar-search">
        <input type="text" placeholder="Buscar" />
      </div>

      <ul className="navbar-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/catalog">Destacados</Link></li>
        <li><Link to="/catalog">iPhones</Link></li>
        <li><Link to="/catalog">Mac</Link></li>
        <li><Link to="/catalog">iPad</Link></li>
        <li><Link to="/catalog">Accesorios</Link></li>
      </ul>

      <div className="navbar-actions">
        <button>Inicia Sesión</button>
        <button>🛒</button>
      </div>
    </nav>
  );
};

export default Navbar;