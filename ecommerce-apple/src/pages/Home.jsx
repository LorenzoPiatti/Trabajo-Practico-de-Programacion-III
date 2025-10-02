import { useNavigate } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import ProductList from "../components/product/ProductList";
import Button from "../components/ui/Button";
import products from "../data/products";

function Home() {
  const navigate = useNavigate();
  const featuredProducts = products.filter(p => p.featured); 
  const bannerStyle = {
    width: "100vw",
    maxWidth: "100%",
    height: "500px",
    backgroundImage: 'url("/assets/banner.png")',
    backgroundSize: "cover",
    backgroundPosition: "center",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
    padding: "0 50px",
    boxSizing: "border-box",
    color: "#fff",
  };

  const bannerTitleStyle = {
    fontSize: "2.5rem",
    fontWeight: "bold",
  };

  const bannerSubtitleStyle = {
    fontSize: "1.5rem",
    marginTop: "10px",
  };

  const bannerButtonStyle = {
    marginTop: "15px",
    padding: "10px 20px",
    backgroundColor: "#000",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  };

  const sectionStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    margin: "40px 0",
    width: "100%",
    boxSizing: "border-box",
  };

  const productContainerStyle = {
    display: "flex",
    justifyContent: "center",
    gap: "20px",
    flexWrap: "wrap",
    width: "100%",
    boxSizing: "border-box",
  };

  const handleGoToFeatured = () => {
    navigate("/catalog"); // lleva al catalogo de destacados
  };

  return (
    <>
      <Navbar products={products} />

      <section style={bannerStyle}>
        <h1 style={bannerTitleStyle}>Los destacados del mes!</h1>
        <p style={bannerSubtitleStyle}>Llévalos ahora!</p>
        <Button onClick={handleGoToFeatured} style={bannerButtonStyle}>
          Comprar
        </Button>
      </section>

      <section style={sectionStyle}>
        <h2>DESTACADOS</h2>
        <div style={productContainerStyle}>
          <ProductList products={featuredProducts} />
        </div>
      </section>

      <Footer />
    </>
  );
}

export default Home;

