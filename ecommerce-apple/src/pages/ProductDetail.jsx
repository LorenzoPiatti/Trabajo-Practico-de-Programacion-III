import { useParams } from "react-router-dom";
import products from "../data/products";

function ProductDetail() {
  const { id } = useParams();
  const product = products.find(p => p.id === parseInt(id));

  if (!product) {
    return <p>Producto no encontrado</p>;
  }

  return (
    <div style={{ padding: "40px", textAlign: "center" }}>
      <h1>{product.name}</h1>
      <img src={product.image} alt={product.name} style={{ width: "300px", height: "300px", objectFit: "cover" }} />
      <p>Precio: ${product.price}</p>
      <p>Categoría: {product.category}</p>
      <button style={{ padding: "10px 20px", backgroundColor: "#000", color: "#fff", border: "none", borderRadius: "5px", cursor: "pointer" }}>Comprar</button>
    </div>
  );
}

export default ProductDetail;
