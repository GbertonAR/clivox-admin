import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, Lock, ArrowRight, CheckCircle, XCircle, Loader2 } from "lucide-react";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [loading, setLoading] = useState(false);
  const [messageType, setMessageType] = useState<'success' | 'error' | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMensaje("");
    setLoading(true);
    setMessageType(null);

    try {
      const response = await fetch("http://localhost:8000/auth/enviar-codigo_acs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setMensaje("Código enviado. Revisa tu bandeja de entrada.");
        setMessageType('success');
        setTimeout(() => {
          navigate(`/validacodigo?email=${encodeURIComponent(email)}`);
        }, 1500);
      } else {
        setMensaje(data.error || "Usuario no registrado.");
        setMessageType('error');
      }
    } catch (error) {
      console.error("Error de red:", error);
      setMensaje("Error de conexión. Inténtalo de nuevo.");
      setMessageType('error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-card backdrop-blur-sm border border-border rounded-lg shadow-lg p-8 animate-fade-in">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <Lock className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-2xl font-bold text-foreground mb-2">
              Iniciar sesión
            </h1>
            <p className="text-muted-foreground text-sm">
              Ingresa tu email para recibir un código de acceso
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label 
                htmlFor="email" 
                className="text-sm font-medium text-foreground block"
              >
                Correo electrónico
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 bg-background border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all duration-200 placeholder:text-muted-foreground"
                  placeholder="nombre@ejemplo.com"
                  disabled={loading}
                />
              </div>
            </div>

            <button 
              type="submit" 
              disabled={loading || !email.trim()} 
              className="w-full bg-primary text-primary-foreground py-3 px-4 rounded-md font-medium transition-all duration-200 flex items-center justify-center space-x-2 hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed group"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Enviando...</span>
                </>
              ) : (
                <>
                  <span>Enviar código</span>
                  <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </>
              )}
            </button>
          </form>

          {/* Message */}
          {mensaje && (
            <div className={`mt-6 p-4 rounded-md flex items-center space-x-3 animate-fade-in ${
              messageType === 'success' 
                ? 'bg-green-50 border border-green-200' 
                : 'bg-red-50 border border-red-200'
            }`}>
              {messageType === 'success' ? (
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
              ) : (
                <XCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
              )}
              <p className={`text-sm ${
                messageType === 'success' ? 'text-green-800' : 'text-red-800'
              }`}>
                {mensaje}
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="text-center mt-6">
          <p className="text-xs text-muted-foreground">
            ¿Problemas con el acceso?{" "}
            <button className="text-primary hover:underline transition-colors">
              Contacta soporte
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;