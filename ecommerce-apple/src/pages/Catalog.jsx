import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import ProductList from "../components/product/ProductList";

function Catalog() {
  const { category } = useParams();
  const [products, setProducts] = useState([]);

  // 🔹 Cargar productos desde el backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("http://localhost:4000/api/products");
        const data = await res.json();

        if (data.success && Array.isArray(data.products)) {
          setProducts(data.products);
        } else {
          console.error("Error al obtener productos:", data);
        }
      } catch (err) {
        console.error("Error en fetchProducts:", err);
      }
    };

    fetchProducts();
  }, []);

  // 🔹 Mantiene tu lógica original
  const filteredProducts = category
    ? products.filter(
        (p) => p.category && p.category.toLowerCase() === category.toLowerCase()
      )
    : products.filter((p) => p.featured === 1 || p.featured === true);

  return (
    <>
      <Navbar products={products} />
      <main className="catalog-content">
        <h1>
          {category ? `Productos de ${category}` : "Destacados"}
        </h1>
        <ProductList products={filteredProducts} />
      </main>
      <Footer />
    </>
  );
}

export default Catalog;
