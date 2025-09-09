import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

function Cart() {
  return (
    <>
      <Navbar />
      <main>
        <h1>Tu Carrito</h1>
        <p>Aquí se mostrarán los productos agregados.</p>
      </main>
      <Footer />
    </>
  );
}

export default Cart;