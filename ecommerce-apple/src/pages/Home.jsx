import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

function Home() {
  return (
    <>
      <Navbar />
      <main>
        <h1>Bienvenido al Apple Store</h1>
        <p>Explora los últimos productos de Apple.</p>
      </main>
      <Footer />
    </>
  );
}

export default Home;