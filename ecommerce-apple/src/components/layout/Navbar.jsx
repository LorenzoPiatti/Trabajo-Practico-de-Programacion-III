import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import "/src/styles/Navbar.css";

function Navbar({ products }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

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

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img src="/assets/logo-apple-2.png" alt="logo" />
        <span>Apple Store</span>
      </div>

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
}

export default Navbar;
