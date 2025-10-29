import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import "../styles/forms.css";

function SuperAdmin() {
    const { user } = useContext(AuthContext);
    const [products, setProducts] = useState([]);
    const [users, setUsers] = useState([]);
    const [pedidos, setPedidos] = useState([]);
    const [productForm, setProductForm] = useState({
        id: null,
        name: "",
        description: "",
        price: "",
        category: "",
        image: "",
        featured: false,
    });

    const [userForm, setUserForm] = useState({
        id: null,
        name: "",
        email: "",
        password: "",
        role: "user",
    });

    useEffect(() => {
        if (user && user.token) {
            fetchProducts();
            fetchUsers();
            fetchPedidos();
        }
    }, [user]);

    // --- Productos ---//
    const fetchProducts = async () => {
        try {
            const res = await fetch("http://localhost:4000/api/products", {
                headers: { Authorization: `Bearer ${user.token}` },
            });
            const data = await res.json();
            setProducts(data.products || []);
        } catch (err) {
            console.error("fetchProducts error:", err);
        }
    };

    const handleProductChange = (e) => {
        const { name, value, type, checked } = e.target;
        setProductForm((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleProductSubmit = async (e) => {
        e.preventDefault();
        try {
            const method = productForm.id ? "PUT" : "POST";
            const url = productForm.id
                ? `http://localhost:4000/api/products/${productForm.id}`
                : "http://localhost:4000/api/products";

            await fetch(url, {
                method,
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${user.token}`,
                },
                body: JSON.stringify(productForm),
            });

            setProductForm({
                id: null,
                name: "",
                description: "",
                price: "",
                category: "",
                image: "",
                featured: false,
            });
            fetchProducts();
        } catch (err) {
            console.error("handleProductSubmit error:", err);
        }
    };

    const handleEditProduct = (p) => {
        setProductForm({ ...p, price: p.price?.toString() || "" });
    };

    const handleDeleteProduct = async (id) => {
        if (!window.confirm("¿Eliminar este producto?")) return;
        try {
            await fetch(`http://localhost:4000/api/products/${id}`, {
                method: "DELETE",
                headers: { Authorization: `Bearer ${user.token}` },
            });
            fetchProducts();
        } catch (err) {
            console.error("handleDeleteProduct error:", err);
        }
    };

    // --- Usuarios ---//
    const fetchUsers = async () => {
        try {
            const res = await fetch("http://localhost:4000/api/users", {
                headers: { Authorization: `Bearer ${user.token}` },
            });
            const data = await res.json();
            setUsers(data.users || []);
        } catch (err) {
            console.error("fetchUsers error:", err);
        }
    };

    const handleUserChange = (e) => {
        const { name, value } = e.target;
        setUserForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleEditUser = (u) => {
        setUserForm({ ...u, password: "" });
    };

    const handleUserSubmit = async (e) => {
        e.preventDefault();
        if (!userForm.id) return;
        try {
            await fetch(`http://localhost:4000/api/users/${userForm.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${user.token}`,
                },
                body: JSON.stringify(userForm),
            });
            setUserForm({
                id: null,
                name: "",
                email: "",
                password: "",
                role: "user",
            });
            fetchUsers();
        } catch (err) {
            console.error("handleUserSubmit error:", err);
        }
    };

    const handleDeleteUser = async (id) => {
        if (!window.confirm("¿Eliminar este usuario?")) return;
        try {
            await fetch(`http://localhost:4000/api/users/${id}`, {
                method: "DELETE",
                headers: { Authorization: `Bearer ${user.token}` },
            });
            fetchUsers();
        } catch (err) {
            console.error("handleDeleteUser error:", err);
        }
    };

    // --- Pedidos ---
    const fetchPedidos = async () => {
        try {
            const endpoint = "http://localhost:4000/api/orders";
            const res = await fetch(endpoint, {
                headers: { Authorization: `Bearer ${user.token}` },
            });

            if (!res.ok) {
                const fallback = await fetch("http://localhost:4000/api/pedidos", {
                    headers: { Authorization: `Bearer ${user.token}` },
                });
                if (!fallback.ok) throw new Error("Error al cargar pedidos");
                const dataFallback = await fallback.json();
                console.log("Pedidos (fallback) recibidos del API:", dataFallback.pedidos);
                setPedidos(dataFallback.pedidos || []);
                return;
            }

            const data = await res.json();
            console.log("Pedidos recibidos del API:", data.pedidos);
            setPedidos(data.pedidos || []);
        } catch (err) {
            console.error("fetchPedidos error:", err);
        }
    };

    const handleUpdatePedido = async (id, updatedStatus) => {
        try {
            const endpoint = "http://localhost:4000/api/orders";
            const url = endpoint.includes("/orders") ? `${endpoint}/${id}` : `http://localhost:4000/api/pedidos/${id}`;

            await fetch(url, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${user.token}`,
                },
                body: JSON.stringify({ estado: updatedStatus }),
            });
            fetchPedidos();
        } catch (err) {
            console.error("handleUpdatePedido error:", err);
        }
    };

    const handleDeletePedido = async (id) => {
        if (!window.confirm("¿Eliminar este pedido?")) return;
        try {
            const endpoint = "http://localhost:4000/api/orders";
            const url = endpoint.includes("/orders") ? `${endpoint}/${id}` : `http://localhost:4000/api/pedidos/${id}`;

            await fetch(url, {
                method: "DELETE",
                headers: { Authorization: `Bearer ${user.token}` },
            });
            fetchPedidos();
        } catch (err) {
            console.error("handleDeletePedido error:", err);
        }
    };

    if (!user) return <p>Cargando...</p>;

    return (
        <>
            <Navbar />
            <main className="main-centered">
                <h1>PANEL SUPERADMIN</h1>

                {/* --- FORMULARIO DE PRODUCTOS --- */}
                <div className="form-container">
                    <h2>{productForm.id ? "Editar Producto" : " Nuevo Producto"}</h2>
                    <form onSubmit={handleProductSubmit}>
                        <div className="form-field">
                            <label>Nombre del producto</label>
                            <Input
                                type="text"
                                name="name"
                                placeholder="Ej: iPhone 11"
                                value={productForm.name}
                                onChange={handleProductChange}
                                required
                            />
                        </div>

                        <div className="form-field">
                            <label>Descripción</label>
                            <Input
                                type="text"
                                name="description"
                                placeholder="Breve descripción del producto"
                                value={productForm.description}
                                onChange={handleProductChange}
                            />
                        </div>

                        <div className="form-field">
                            <label>Precio</label>
                            <Input
                                type="number"
                                name="price"
                                placeholder="Ej: 2500"
                                value={productForm.price}
                                onChange={handleProductChange}
                                required
                            />
                        </div>

                        <div className="form-field">
                            <label>Categoría</label>
                            <Input
                                type="text"
                                name="category"
                                placeholder="Ej: iPhone, Mac, Watch, iPad, Accesorios"
                                value={productForm.category}
                                onChange={handleProductChange}
                            />
                        </div>

                        <div className="form-field">
                            <label>Imagen (URL)</label>
                            <Input
                                type="text"
                                name="image"
                                placeholder="URL de la imagen"
                                value={productForm.image}
                                onChange={handleProductChange}
                            />
                            {productForm.image && (
                                <img
                                    src={productForm.image}
                                    alt="Vista previa"
                                    style={{
                                        marginTop: "10px",
                                        maxWidth: "120px",
                                        borderRadius: "8px",
                                        boxShadow: "0 0 5px rgba(0,0,0,0.2)",
                                    }}
                                />
                            )}
                        </div>

                        <div className="form-field checkbox-field">
                            <label>Destacado</label>
                            <input
                                type="checkbox"
                                name="featured"
                                checked={productForm.featured}
                                onChange={handleProductChange}
                            />
                        </div>

                        <Button type="submit">
                            {productForm.id ? "Guardar Cambios" : "Agregar Producto"}
                        </Button>
                    </form>
                </div>


                {/* --- Lista de productos --- */}
                <div className="form-container">
                    <h2>Productos Existentes</h2>
                    {products.length === 0 && <p>No hay productos</p>}
                    {products.map((p) => (
                        <div key={p.id} className="form-field" style={{ flexDirection: "row", alignItems: "center" }}>
                            <span style={{ flex: 1 }}>{p.name} - ${p.price}</span>
                            <Button onClick={() => handleEditProduct(p)}>Editar</Button>
                            <Button onClick={() => handleDeleteProduct(p.id)}>Eliminar</Button>
                        </div>
                    ))}
                </div>

                {/* --- Formulario usuarios --- */}
                <div className="form-container">
                    <h2>Actualizar Usuario</h2>
                    <form onSubmit={handleUserSubmit}>
                        <div className="form-field">
                            <label>Nombre</label>
                            <Input name="name" value={userForm.name} onChange={handleUserChange} />
                        </div>
                        <div className="form-field">
                            <label>Email</label>
                            <Input name="email" value={userForm.email} onChange={handleUserChange} />
                        </div>
                        <div className="form-field">
                            <label>Contraseña</label>
                            <Input name="password" type="password" value={userForm.password} onChange={handleUserChange} />
                        </div>
                        <div className="form-field">
                            <label>Rol</label>
                            <select name="role" value={userForm.role} onChange={handleUserChange}>
                                <option value="user">user</option>
                                <option value="admin">admin</option>
                                <option value="superadmin">superadmin</option>
                            </select>
                        </div>
                        <Button type="submit" disabled={!userForm.id}>Guardar Cambios</Button>
                    </form>
                </div>

                {/* --- Lista de usuarios --- */}
                <div className="form-container">
                    <h2>Usuarios Existentes</h2>
                    {users.length === 0 && <p>No hay usuarios</p>}
                    {users.map((u) => (
                        <div key={u.id} className="form-field" style={{ flexDirection: "row", alignItems: "center" }}>
                            <span style={{ flex: 1 }}>{u.name || "(sin nombre)"} - {u.email} - {u.role}</span>
                            <Button onClick={() => handleEditUser(u)}>Editar</Button>
                            <Button onClick={() => handleDeleteUser(u.id)}>Eliminar</Button>
                        </div>
                    ))}
                </div>

                {/* --- Pedidos --- */}
                <div className="form-container">
                    <h2>Pedidos</h2>
                    {pedidos.length === 0 && <p>No hay pedidos</p>}
                    {pedidos.map((p) => {
                        let productos = [];
                        if (typeof p.productos === "string") {
                            try {
                                productos = JSON.parse(p.productos);
                            } catch {
                                productos = [];
                            }
                        } else if (Array.isArray(p.productos)) {
                            productos = p.productos;
                        }

                        const isEntregado = p.estado === "entregado";

                        return (
                            <div key={p.id} className="pedido-card" style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                                <p><strong>ID:</strong> {p.id}</p>
                                <p><strong>Usuario ID:</strong> {p.user_id}</p>
                                <p><strong>Total:</strong> ${p.total}</p>
                                <p><strong>Estado:</strong> {p.estado}</p>

                                <div style={{ marginTop: "10px" }}>
                                    <strong>Productos:</strong>
                                    <ul style={{ marginTop: "5px" }}>
                                        {productos.map((prod, i) => {
                                            const nombre =
                                                prod.name ??
                                                prod.nombre ??
                                                prod.title ??
                                                prod.productName ??
                                                prod.product?.name ??
                                                prod.productId ??
                                                prod.id ??
                                                "(sin nombre)";

                                            const cantidad =
                                                prod.quantity ??
                                                prod.cantidad ??
                                                prod.qty ??
                                                prod.product?.quantity ??
                                                1;

                                            const precio =
                                                prod.price ??
                                                prod.precio ??
                                                prod.product?.price ??
                                                prod.productPrice ??
                                                "0.00";

                                            return (
                                                <li key={i}>
                                                    {nombre} (x{cantidad}) - ${precio}
                                                </li>
                                            );
                                        })}
                                    </ul>
                                </div>

                                <div style={{ display: "flex", justifyContent: "center", gap: "10px" }}>
                                    <Button
                                        onClick={() => handleUpdatePedido(p.id, "pendiente")}
                                        disabled={p.estado === "entregado" || p.estado === "cancelado" || p.estado === "pendiente"}
                                    >Pendiente</Button>

                                    <Button
                                        onClick={() => handleUpdatePedido(p.id, "enviando")}
                                        disabled={p.estado === "entregado" || p.estado === "cancelado" || p.estado === "enviando"}
                                    >Enviando</Button>

                                    <Button
                                        onClick={() => handleUpdatePedido(p.id, "entregado")}
                                        disabled={p.estado === "entregado" || p.estado === "cancelado"}
                                    >Entregado</Button>

                                    <Button
                                        onClick={() => handleUpdatePedido(p.id, "cancelado")}
                                        disabled={p.estado === "cancelado"}
                                        style={{
                                            backgroundColor: p.estado === "cancelado" ? "#ccc" : "#ff4d4d",
                                            color: p.estado === "cancelado" ? "#666" : "#fff",
                                        }}
                                    >Cancelar</Button>

                                    <Button onClick={() => handleDeletePedido(p.id)}>Eliminar</Button>
                                </div>

                            </div>
                        );
                    })}
                </div>
            </main>
            <Footer />
        </>
    );
}

export default SuperAdmin;
