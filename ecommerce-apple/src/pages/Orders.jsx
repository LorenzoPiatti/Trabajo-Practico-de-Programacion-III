import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import Button from "../components/ui/Button";
import "../styles/Cart.css";

function Orders() {
    const { user } = useContext(AuthContext);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user && user.token) fetchOrders();
    }, [user]);

    const fetchOrders = async () => {
        try {
            setLoading(true);
            const res = await fetch("http://localhost:4000/api/orders/mis-pedidos", {
                headers: { Authorization: `Bearer ${user.token}` },
            });
            const data = await res.json();
            if (data.success && Array.isArray(data.pedidos)) {
                setOrders(data.pedidos);
            } else {
                setOrders([]);
            }
        } catch (err) {
            console.error(err);
            setOrders([]);
        }
        setLoading(false);
    };

    const handleCancel = async (id, status) => {
        if (status !== "pendiente") return;
        if (!window.confirm("¿Cancelar este pedido?")) return;

        try {
            await fetch(`http://localhost:4000/api/orders/${id}/cancelar`, {
                method: "PUT",
                headers: { Authorization: `Bearer ${user.token}` },
            });
            fetchOrders();
        } catch (err) {
            console.error(err);
        }
    };

    if (!user) return <p>Cargando usuario...</p>;

    return (
        <>
            <Navbar />
            <main className="cart-container">
                <h1>Mis Pedidos</h1>
                {loading ? (
                    <p>Cargando pedidos...</p>
                ) : orders.length === 0 ? (
                    <p>No tienes pedidos todavía.</p>
                ) : (
                    orders.map((order) => (
                        <div key={order.id} className="order-item">
                            <h3>ID Pedido: {order.id}</h3>
                            <p><strong>Estado:</strong> {order.estado}</p>
                            <p><strong>Productos:</strong></p>
                            <ul className="order-products">
                                {order.productos && order.productos.length > 0 ? (
                                    order.productos.map((p, i) => (
                                        <li key={i}>
                                            {p.nombre} x {p.cantidad}
                                        </li>
                                    ))
                                ) : (
                                    <li>No hay productos</li>
                                )}
                            </ul>
                            <div className="order-buttons">
                                <Button
                                    onClick={() => handleCancel(order.id, order.estado)}
                                    disabled={order.estado !== "pendiente"}
                                >
                                    Cancelar Pedido
                                </Button>
                            </div>
                        </div>
                    ))
                )}
            </main>
            <Footer />
        </>
    );
}

export default Orders;
