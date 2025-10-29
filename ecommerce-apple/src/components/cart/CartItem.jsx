import { useCart } from "../../context/CartContext";

function CartItem({ item }) {
  const { removeFromCart } = useCart(); 

  return (
    <li>
      {item.name} - {item.quantity} x ${item.price}
      <button onClick={() => removeFromCart(item.id)}>Eliminar</button>
    </li>
  );
}

export default CartItem;