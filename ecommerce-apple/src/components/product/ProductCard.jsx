import { useNavigate } from "react-router-dom";

function ProductCard({ product }) {
  const navigate = useNavigate();

  const cardStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    border: "1px solid #ccc",
    padding: "15px",
    borderRadius: "10px",
    width: "200px",
    textAlign: "center",
    justifyContent: "space-between",
  };

  const imgStyle = {
    width: "150px",
    height: "150px",
    objectFit: "cover",
  };

  const buttonStyle = {
    marginTop: "10px",
    padding: "8px 15px",
    backgroundColor: "#000",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  };

  const handleClick = () => {
    navigate(`/product/${product.id}`);
  };

  return (
    <div style={cardStyle}>
      <img src={product.image} alt={product.name} style={imgStyle} />
      
      {}
      <div className="product-details"> 
        <h3>{product.name}</h3>
        <p>${product.price}</p>
        <p>Envío gratis</p>
      </div>
      
      <button style={buttonStyle} onClick={handleClick}>
        Comprar
      </button>
    </div>
  );
}

export default ProductCard;