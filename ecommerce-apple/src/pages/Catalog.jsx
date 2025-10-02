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
      <Navbar products={products} />
      {/* 🔑 CLAVE: ELIMINAR LOS ESTILOS EN LÍNEA y usar la clase CSS */}
      <main className="catalog-content"> 
        <h1>
          {category
            ? `Productos de ${category}`
            : "Destacados"}
        </h1>
        <ProductList products={filteredProducts} />
      </main>
      <Footer />
    </>
  );
}

export default Catalog;

