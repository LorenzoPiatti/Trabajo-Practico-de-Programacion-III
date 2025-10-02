import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import '../styles/forms.css'; 

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const exists = users.find((u) => u.email === email);
    if (exists) {
      alert("Ya existe un usuario con ese email ❌");
      return;
    }

    const newUser = { email, password };
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    alert("Usuario registrado con éxito ✅");
    navigate("/login");
  };

  return (
    <>
      <Navbar />
     
      <main className="main-centered">
        <div className="form-container">
          <h1>Registrarse</h1>
          
          <form onSubmit={handleRegister}>
            
            <div className="form-group">
              
              <div className="form-field">
                <label>Email</label>
                <Input
                  type="email"
                  placeholder="Correo electrónico"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="form-input"
                />
              </div>
              
              <div className="form-field">
                <label>Contraseña</label>
                <Input
                  type="password"
                  placeholder="Contraseña"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="form-input"
                />
              </div>
              
            </div>
            
            <Button className="form-button">Registrarse</Button>
          </form>
          
          <div className="form-footer">
            <p>
              ¿Ya tenés cuenta?{" "}
              <span
                className="form-link"
                onClick={() => navigate("/login")}
              >
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
