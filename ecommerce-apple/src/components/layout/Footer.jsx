import React from "react";
import "/src/styles/Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <p>&copy; {new Date().getFullYear()} Apple Store. Todos los derechos reservados.</p>
        <ul className="footer-links">
          <li><a href="/contact">Contacto</a></li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;