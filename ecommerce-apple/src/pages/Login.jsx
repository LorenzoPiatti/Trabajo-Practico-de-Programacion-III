import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import '../styles/forms.css'; 

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find(
      (u) => u.email === email && u.password === password
    );

    if (user) {
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("currentUser", JSON.stringify(user));
      navigate("/");
    } else {
      alert("Credenciales incorrectas ❌");
    }
  };

  return (
    <>
      <Navbar />
      
      <main className="main-centered">
        <div className="form-container">
          <h1>Iniciar Sesión</h1>
          
          <form onSubmit={handleSubmit}>
            
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
            
            <Button className="form-button">Ingresar</Button>
          </form>

          <div className="form-footer">
            <p>
              ¿No tenés cuenta?{" "}
              <span
                className="form-link"
                onClick={() => navigate("/register")}
              >
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
