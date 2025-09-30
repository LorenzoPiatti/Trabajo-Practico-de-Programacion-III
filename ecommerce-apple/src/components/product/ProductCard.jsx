function ProductCard({ product }) {
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
    height: "350px", // mismo alto para todos los productos
  };

  const imgStyle = {
    width: "150px",
    height: "150px",
    objectFit: "cover",
  };

  const buttonStyle = {
    marginTop: "10px",
    padding: "8px 15px",
    backgroundColor: "#000", // botones negros como querías
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  };

  return (
    <div style={cardStyle}>
      <img src={product.image} alt={product.name} style={imgStyle} />
      <div>
        <h3>{product.name}</h3>
        <p>${product.price}</p>
        <p>Envío gratis</p>
      </div>
      <button style={buttonStyle}>Comprar</button>
    </div>
  );
}

export default ProductCard;
