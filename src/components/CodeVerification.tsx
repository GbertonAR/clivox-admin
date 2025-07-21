// src/components/CodeVerification.tsx
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function CodeVerification() {
  const [codigo, setCodigo] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [searchParams] = useSearchParams();
  const email = searchParams.get("email") || "";
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMensaje("🔍 Validando código...");

    const res = await fetch("/auth/validar-codigo", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, codigo: codigo.trim().toUpperCase() }),
    });

    const data = await res.json();
    setMensaje(data.message);

    if (res.ok && data.success) {
      document.cookie = `usuario_id=${data.usuario_id}; path=/; max-age=86400`;
      setTimeout(() => navigate(data.redirect_url || "/"), 1000);
    }
  };

  return (
    <div className="auth-container">
      <h2>📩 Ingresá el código recibido</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Código de 6 caracteres"
          maxLength={6}
          value={codigo}
          onChange={(e) => setCodigo(e.target.value)}
          required
        />
        <button type="submit">Validar</button>
      </form>
      <p className="mensaje">{mensaje}</p>
    </div>
  );
}
