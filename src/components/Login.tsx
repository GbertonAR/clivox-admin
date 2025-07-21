// src/components/Login.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../assets/css/login.css";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMensaje("");
    setLoading(true);

    try {
      const response = await fetch("http://localhost:8000/auth/enviar-codigo_acs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setMensaje("📩 Código enviado. Revisa tu bandeja de entrada.");
        setTimeout(() => {
          navigate(`/validacodigo?email=${encodeURIComponent(email)}`);
        }, 1000);
      } else {
        setMensaje(data.error || "❌ Usuario no registrado.");
      }
    } catch (error) {
      console.error("❌ Error de red:", error);
      setMensaje("❌ Error de conexión.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h2 className="login-title">🔐 Iniciar sesión</h2>
        <label htmlFor="email" className="login-label">Correo electrónico:</label>
        <input
          id="email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="login-input"
          placeholder="nombre@ejemplo.com"
        />
        <button type="submit" disabled={loading} className="login-button">
          {loading ? "Enviando..." : "Enviar código"}
        </button>
        {mensaje && <p className="login-message">{mensaje}</p>}
      </form>
    </div>
  );
};

export default Login;
