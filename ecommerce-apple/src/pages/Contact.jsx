import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import "../styles/Contact.css";  

function Contact() {
  return (
    <>
      <Navbar />

      <main className="contact-main">
        <div className="contact-container">
          <h1>Contactanos 📞</h1>
          <ul>
            <li><strong> 📧 Mail:</strong> applestore@gmail.com</li>
            <li><strong> 📞 Teléfono:</strong> +54 9 341 123 4567</li>
            <li><strong> 📍 Dirección:</strong> Córdoba 853, Rosario, Santa Fe, Argentina</li>
            <li><strong> 📸 Instagram:</strong> @applestore</li>
            <li><strong> 🎵TikTok:</strong> @apple_store</li>
          </ul>
        </div>
      </main>

      <Footer />
    </>
  );
}

export default Contact;
