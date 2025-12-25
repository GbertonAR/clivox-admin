import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import QRCode from 'react-qr-code';

import "../assets/css/login.css";

const ValidarCodigo: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [codigo, setCodigo] = useState("");
  const [mensaje, setMensaje] = useState("");
  const navigate = useNavigate();
  const email = searchParams.get("email");

  // Polling automático para ver si ya fue validado desde el celular
  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    const verificarCodigoDesdeQR = async () => {
      if (!email) return;
      try {
        const response = await fetch("http://localhost:8000/auth/verificar-codigo-desde-qr", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        });

        const data = await response.json();

        if (response.ok && data.success) {
          setMensaje("✅ Validado desde otro dispositivo. Redirigiendo...");
          if (data.usuario_id) {
            document.cookie = `usuario_id=${data.usuario_id}; path=/; max-age=86400`;
          }
          const redireccion = data.redirect_url || `/dashboard/${data.usuario_id}`;

          console.log("Redirigiendo 222 a:", redireccion);

          setTimeout(() => {
            navigate(redireccion);
          }, 1500);
        }
      } catch (err) {
        console.error("Error al verificar código por QR:", err);
      }
    };

    if (email) {
      intervalId = setInterval(verificarCodigoDesdeQR, 15000); // cada 15 segundos
    }

    return () => clearInterval(intervalId);
  }, [email, navigate]);

  // Envío manual del código desde teclado
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setMensaje("Validando...");

    try {
      const response = await fetch("http://localhost:8000/auth/validar-codigo_acs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, codigo }),
      });

      const data = await response.json();
      if (response.ok && data.success) {
        setMensaje("✅ Código correcto. Redirigiendo...");
        if (data.usuario_id) {
          document.cookie = `usuario_id=${data.usuario_id}; path=/; max-age=86400`;
        }
        const redireccion = data.redirect_url || `/dashboard/${data.usuario_id}`;
        console.log("Usuario ID:", data.redirect_url);
        console.log("Usuario ID:", data.usuario_id);
        console.log("Redirigiendo a:", redireccion);
        setTimeout(() => {
          navigate(redireccion);
        }, 1000);
      } else {
        setMensaje(data.error || "❌ Código incorrecto.");
      }
    } catch (err) {
      console.error("Error al validar el código:", err);
      setMensaje("❌ Error de red. Inténtalo nuevamente.");
    }
  };

  // El QR contiene email + código generado
  const qrData = email && codigo.length === 6
    ? `https://miapp.com/validar-desde-celular?email=${email}&codigo=${codigo}`
    : "";

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h2>📩 Ingresá el código que te enviamos</h2>
        <input
          type="text"
          name="codigo"
          placeholder="Código de 6 caracteres"
          maxLength={6}
          value={codigo}
          onChange={(e) => setCodigo(e.target.value)}
          required
        />
        <button type="submit">Validar acceso</button>
        {mensaje && <p className="mensaje">{mensaje}</p>}
      </form>

      {/* Mostrar QR solo si hay código y email */}
      {qrData && (
        <div className="qr-container">
          <p>📱 Escaneá este QR desde tu celular para validar:</p>
          <QRCode value={qrData} size={180} />
        </div>
      )}
    </div>
  );
};

export default ValidarCodigo;
