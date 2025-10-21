import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import "../styles/forms.css";

function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validateField = (name, value) => {
    let error = "";

    if (name === "email") {
      if (!value.trim()) error = "El email es obligatorio.";
      else if (!/\S+@\S+\.\S+/.test(value))
        error = "El formato del email no es válido.";
    }

    if (name === "password") {
      if (!value.trim()) error = "La contraseña es obligatoria.";
      else if (value.length < 6)
        error = "Debe tener al menos 6 caracteres.";
    }

    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Primero actualizamos el estado del input
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Luego validamos con el nuevo valor
    validateField(name, value);
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    validateField(name, value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validar todos los campos antes de enviar
    validateField("email", formData.email);
    validateField("password", formData.password);

    if (Object.values(errors).some((error) => error)) return;

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find(
      (u) =>
        u.email === formData.email && u.password === formData.password
    );

    if (user) {
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("currentUser", JSON.stringify(user));
      navigate("/");
    } else {
      setErrors((prev) => ({
        ...prev,
        general: "Credenciales incorrectas ❌",
      }));
    }
  };

  return (
    <>
      <Navbar />
      <main className="main-centered">
        <div className="form-container">
          <h1>Iniciar Sesión</h1>

          <form onSubmit={handleSubmit}>
            {errors.general && <p className="error-text">{errors.general}</p>}

            <div className="form-group">
              <div className="form-field">
                <label>Email</label>
                <Input
                  type="email"
                  name="email"
                  placeholder="Correo electrónico"
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`form-input ${errors.email ? "input-error" : ""}`}
                />
                {errors.email && <p className="error-text">{errors.email}</p>}
              </div>

              <div className="form-field">
                <label>Contraseña</label>
                <Input
                  type="password"
                  name="password"
                  placeholder="Contraseña"
                  value={formData.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`form-input ${errors.password ? "input-error" : ""}`}
                />
                {errors.password && <p className="error-text">{errors.password}</p>}
              </div>
            </div>

            <Button className="form-button">Ingresar</Button>
          </form>

          <div className="form-footer">
            <p>
              ¿No tenés cuenta?{" "}
              <span className="form-link" onClick={() => navigate("/register")}>
                Registrate aquí
              </span>
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default Login;
