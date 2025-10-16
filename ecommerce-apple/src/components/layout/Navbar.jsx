import { Link, useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import "/src/styles/Navbar.css";
import { ThemeContext } from "../../context/ThemeContext"; // ✅ import del contexto

function Navbar({ products }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  // ✅ Traemos el tema actual y la función para cambiarlo
  const { theme, toggleTheme } = useContext(ThemeContext);

  // Estado de sesión
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const handleChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value.length > 0) {
      const results = products.filter((p) =>
        p.name.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredProducts(results);
      setShowDropdown(true);
    } else {
      setShowDropdown(false);
    }
  };

  const handleSelect = (product) => {
    navigate(`/product/${product.id}`);
    setSearchTerm("");
    setShowDropdown(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("currentUser");
    navigate("/login");
  };

  return (
    <nav className="navbar">
      {/* Logo */}
      <div className="navbar-logo">
        <img src="/assets/logo-apple-2.png" alt="logo" />
        <span>Apple Store</span>
      </div>

      {/* Buscador */}
      <div className="navbar-search">
        <input
          type="text"
          placeholder="Buscar"
          value={searchTerm}
          onChange={handleChange}
        />
        {showDropdown && filteredProducts.length > 0 && (
          <ul className="search-dropdown">
            {filteredProducts.map((p) => (
              <li key={p.id} onClick={() => handleSelect(p)}>
                {p.name}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Links */}
      <ul className="navbar-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/catalog">Destacados</Link></li>
        <li><Link to="/catalog/iPhone">iPhones</Link></li>
        <li><Link to="/catalog/Mac">Mac</Link></li>
        <li><Link to="/catalog/iPad">iPad</Link></li>
        <li><Link to="/catalog/Accesorios">Accesorios</Link></li>
      </ul>

      {/* Acciones de usuario */}
      <div className="navbar-actions">
        {isLoggedIn && currentUser ? (
          <>
            <span className="navbar-user">👤 {currentUser.email}</span>
            <button onClick={handleLogout}>Logout</button>
            <button onClick={() => navigate("/cart")}>🛒</button>
          </>
        ) : (
          <>
            <button onClick={() => navigate("/login")}>Inicia Sesión</button>
            <button onClick={() => navigate("/register")}>Registrarse</button>
            <button onClick={() => navigate("/cart")}>🛒</button>
          </>
        )}

        {/* 🌙 Botón de cambio de tema */}
        <button className="theme-toggle-btn" onClick={toggleTheme}>
          {theme === "light" ? "🌙" : "☀️"}
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
