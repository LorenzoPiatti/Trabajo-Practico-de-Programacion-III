function CartItem({ item }) {
  return (
    <div>
      <h4>{item.name}</h4>
      <p>Cantidad: {item.quantity}</p>
      <p>Precio: ${item.price * item.quantity}</p>
      <button>Eliminar</button>
    </div>
  );
}

export default CartItem;