function CartSummary({ items }) {
  const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div>
      <h3>Total: ${total}</h3>
      <button>Finalizar compra</button>
    </div>
  );
}

export default CartSummary;