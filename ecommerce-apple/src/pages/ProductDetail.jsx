import { useParams } from "react-router-dom";
import products from "../data/products";
import Button from "../components/ui/Button";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { useCart } from "../context/CartContext"; // ✅ usamos el nuevo hook

function ProductDetail() {
  const { id } = useParams();
  const product = products.find((p) => p.id === parseInt(id));

  const { addToCart } = useCart(); 

  if (!product) {
    return <p>Producto no encontrado</p>;
  }

  const handleAddToCart = () => {
    addToCart(product);
    alert(`Agregaste ${product.name} al carrito ✅`);
  };

  return (
    <>
      <Navbar products={products} />
      <main
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "60px",
          padding: "40px",
        }}
      >
        <img
          src={product.image}
          alt={product.name}
          style={{
            width: "400px",
            height: "400px",
            objectFit: "cover",
            borderRadius: "12px",
            boxShadow: "0 8px 16px rgba(0,0,0,0.2)",
          }}
        />
        <div style={{ maxWidth: "500px", textAlign: "left" }}>
          <h1>{product.name}</h1>
          <p
            style={{
              fontSize: "18px",
              marginBottom: "20px",
              lineHeight: 1.5,
            }}
          >
            {product.description}
          </p>
          <p
            style={{
              fontSize: "20px",
              fontWeight: "bold",
              marginBottom: "20px",
            }}
          >
            Precio: ${product.price}
          </p>
          <Button
            onClick={handleAddToCart}
            style={{
              marginTop: "10px",
              padding: "8px 15px",
              backgroundColor: "#000",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Agregar al carrito
          </Button>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default ProductDetail;