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
    confirmPassword: ""
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
      else if (!/\S+@\S+\.\S+/.test(value))
        error = "El formato del email no es válido.";
    }

    if (name === "password") {
      if (!value.trim()) error = "La contraseña es obligatoria.";
      else if (value.length < 6)
        error = "Debe tener al menos 6 caracteres.";
    }

    if (name === "confirmPassword") {
      if (!value.trim()) error = "Debes confirmar tu contraseña.";
      else if (value !== formData.password)
        error = "Las contraseñas no coinciden.";
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

  const handleSubmit = async (e) => {
    e.preventDefault();


    Object.keys(formData).forEach((key) => validateField(key, formData[key]));
    if (Object.values(errors).some((error) => error)) return;

    try {
      const res = await fetch("http://localhost:4000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password
        })
      });

      const data = await res.json();

      if (!data.success) {
        setErrors((prev) => ({ ...prev, general: data.error }));
      } else {
        alert("Usuario registrado correctamente ✅");
        navigate("/login");
      }
    } catch (err) {
      setErrors((prev) => ({ ...prev, general: "Error de conexión con el servidor" }));
    }
  };

  return (
    <>
      <Navbar />
      <main className="main-centered">
        <div className="form-container">
          <h1>Registrarse</h1>

          <form onSubmit={handleSubmit}>
            {errors.general && <p className="error-text">{errors.general}</p>}

            <div className="form-group">
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
                {errors.name && <p className="error-text">{errors.name}</p>}
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

              <div className="form-field">
                <label>Confirmar Contraseña</label>
                <Input
                  type="password"
                  name="confirmPassword"
                  placeholder="Repite tu contraseña"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`form-input ${errors.confirmPassword ? "input-error" : ""}`}
                />
                {errors.confirmPassword && <p className="error-text">{errors.confirmPassword}</p>}
              </div>
            </div>

            <Button className="form-button">Registrarse</Button>
          </form>

          <div className="form-footer">
            <p>
              ¿Ya tenés cuenta?{" "}
              <span className="form-link" onClick={() => navigate("/login")}>
                Iniciá sesión aquí
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
