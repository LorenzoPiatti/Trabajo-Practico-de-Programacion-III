import { useCartStore } from "../../store/CartStore";

function CartItem({ item }) {
  const removeFromCart = useCartStore((state) => state.removeFromCart);

  return (
    <li>
      {item.name} - {item.quantity} x ${item.price}
      <button onClick={() => removeFromCart(item.id)}>Eliminar</button>
    </li>
  );
}

export default CartItem;