import { useParams } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import ProductList from "../components/product/ProductList";
import products from "../data/products";

function Catalog() {
  const { category } = useParams();

  // Filtrar según categoría o destacados
  const filteredProducts = category
    ? products.filter((p) => p.category.toLowerCase() === category.toLowerCase())
    : products.filter((p) => p.featured);

  return (
    <>
      <Navbar />
      <main>
        <h1>Catálogo de Productos</h1>
        <ProductList products={products} />
      </main>
      <Footer />
    </>
  );
}

export default Catalog;

