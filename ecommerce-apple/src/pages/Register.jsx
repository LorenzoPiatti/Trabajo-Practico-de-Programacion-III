import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import "../styles/forms.css";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validateField = (name, value) => {
    let error = "";

    if (name === "name") {
      if (!value.trim()) error = "El nombre es obligatorio.";
    }

    if (name === "email") {
      if (!value.trim()) error = "El email es obligatorio.";
      else if (!/\S+@\S+\.\S+/.test(value)) error = "El formato del email no es válido.";
    }

    if (name === "password") {
      if (!value.trim()) error = "La contraseña es obligatoria.";
      else if (value.length < 6) error = "Debe tener al menos 6 caracteres.";
    }

    if (name === "confirmPassword") {
      if (!value.trim()) error = "Confirma tu contraseña.";
      else if (value !== formData.password) error = "Las contraseñas no coinciden.";
    }

    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    validateField(name, value);
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    validateField(name, value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validar todos los campos
    Object.keys(formData).forEach((key) => validateField(key, formData[key]));
    if (Object.values(errors).some((error) => error)) return;

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const existing = users.find((u) => u.email === formData.email);
    if (existing) {
      setErrors((prev) => ({ ...prev, general: "El email ya está registrado ❌" }));
      return;
    }

    // Guardamos usuario en localStorage
    users.push({
      name: formData.name,
      email: formData.email,
      password: formData.password,
    });
    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("currentUser", JSON.stringify({
      name: formData.name,
      email: formData.email,
    }));

    navigate("/");
  };

  return (
    <>
      <Navbar />
      <main className="main-centered">
        <div className="form-container">
          <h1>Registrarse</h1>

          <form onSubmit={handleSubmit}>
            {errors.general && <p className="error-text">{errors.general}</p>}

            <div className="form-field">
              <label>Nombre</label>
              <Input
                type="text"
                name="name"
                placeholder="Tu nombre"
                value={formData.name}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`form-input ${errors.name ? "input-error" : ""}`}
              />
              {/* 🔑 CORRECCIÓN: Siempre renderiza el <p> */}
              <p className="error-text">{errors.name || <>&nbsp;</>}</p>
            </div>

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
              {/* 🔑 CORRECCIÓN: Siempre renderiza el <p> */}
              <p className="error-text">{errors.email || <>&nbsp;</>}</p>
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
              {/* 🔑 CORRECCIÓN: Siempre renderiza el <p> */}
              <p className="error-text">{errors.password || <>&nbsp;</>}</p>
            </div>

            <div className="form-field">
              <label>Confirmar Contraseña</label>
              <Input
                type="password"
                name="confirmPassword"
                placeholder="Repite la contraseña"
                value={formData.confirmPassword}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`form-input ${errors.confirmPassword ? "input-error" : ""}`}
              />
              {/* 🔑 CORRECCIÓN: Siempre renderiza el <p> */}
              <p className="error-text">{errors.confirmPassword || <>&nbsp;</>}</p>
            </div>

            <Button className="form-button">Registrarse</Button>
          </form>

          <div className="form-footer">
            <p>
              ¿Ya tenés cuenta?{" "}
              <span className="form-link" onClick={() => navigate("/login")}>
                Inicia sesión aquí
              </span>
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default Register;
