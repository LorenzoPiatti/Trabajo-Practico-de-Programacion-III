import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import ProductList from "../components/product/ProductList";
import products from "../data/products";

function Catalog() {
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