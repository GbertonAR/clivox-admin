import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, Lock, ArrowRight, CheckCircle, XCircle, Loader2, Sparkles, Zap, Eye, Shield } from "lucide-react";

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
        setMensaje("Código enviado exitosamente. Revisa tu bandeja de entrada.");
        setMessageType('success');
        setTimeout(() => {
          navigate(`/validacodigo?email=${encodeURIComponent(email)}`);
        }, 1500);
      } else {
        setMensaje(data.error || "Usuario no registrado o error en el servidor.");
        setMessageType('error');
      }
    } catch (error) {
      console.error("Error de red:", error);
      setMensaje("Error de conexión. Verifica tu conexión a internet.");
      setMessageType('error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden particles-bg">
      {/* Fondo ultra-creativo con múltiples capas */}
      <div className="absolute inset-0 bg-mesh-cosmic opacity-40"></div>
      <div className="absolute inset-0 bg-neural-network opacity-20"></div>

      {/* Orbes flotantes ultra-dinámicos */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 gradient-cosmic rounded-full mix-blend-multiply filter blur-xl opacity-30 floating-cosmic"></div>
        <div className="absolute top-3/4 right-1/4 w-80 h-80 gradient-neon rounded-full mix-blend-multiply filter blur-xl opacity-25 floating-cosmic" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-hologram-2 rounded-full mix-blend-multiply filter blur-2xl opacity-20 floating-cosmic" style={{ animationDelay: '4s' }}></div>
        <div className="absolute bottom-1/4 left-1/3 w-64 h-64 gradient-aurora rounded-full mix-blend-multiply filter blur-xl opacity-35 floating-cosmic" style={{ animationDelay: '6s' }}></div>
      </div>

      {/* Efectos de partículas adicionales */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-neon-purple rounded-full shadow-neon-sm"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 15}s`,
              animationName: 'particles-float',
              animationDuration: '15s',
              animationTimingFunction: 'linear',
              animationIterationCount: 'infinite'
            }}
          />
        ))}
      </div>

      {/* Contenido principal */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          {/* Header ultra-futurista */}
          <div className="text-center mb-12 slide-up-cosmic">
            <div className="relative inline-flex items-center justify-center mb-8">
              {/* Anillo holográfico rotativo */}
              <div className="absolute w-32 h-32 hologram-border rounded-full rotate-hologram opacity-60">
                <div className="w-full h-full bg-transparent rounded-full"></div>
              </div>

              {/* Logo central con efectos neón */}
              <div className="relative w-24 h-24 gradient-cosmic rounded-2xl p-0.5 pulse-neon">
                <div className="flex items-center justify-center w-full h-full bg-background rounded-2xl">
                  <Zap className="w-12 h-12 text-neon-purple drop-shadow-lg" />
                </div>
              </div>

              {/* Partículas orbitales */}
              <div className="absolute w-40 h-40 pointer-events-none">
                <div className="absolute top-0 left-1/2 w-2 h-2 bg-neon-blue rounded-full shadow-neon-sm animate-spin" style={{ transformOrigin: '0 80px' }}></div>
                <div className="absolute top-1/2 right-0 w-1.5 h-1.5 bg-neon-pink rounded-full shadow-neon-sm animate-spin" style={{ transformOrigin: '-80px 0', animationDelay: '1s' }}></div>
                <div className="absolute bottom-0 left-1/2 w-1 h-1 bg-neon-teal rounded-full shadow-neon-sm animate-spin" style={{ transformOrigin: '0 -80px', animationDelay: '2s' }}></div>
              </div>
            </div>

            <h1 className="text-6xl font-futuristic gradient-text-cosmic mb-4 text-glow-neon">
              CLIVOX
            </h1>
            <p className="text-xl font-medium text-foreground/80 mb-2">
              {/* Portal de Acceso Cuántico */}
              Bienvenido a tu viaje de aprendizaje

            </p>
            <p className="text-sm text-muted-foreground font-mono">
              Autenticación  Avanzada
            </p>
          </div>

          {/* Tarjeta de login ultra-futurista */}
          <div className="glass-ultra rounded-3xl p-8 shadow-neon-xl scale-in-cosmic stagger-1 relative overflow-hidden">
            {/* Efecto de brillo deslizante */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full animate-shimmer"></div>

            <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
              {/* Input de email ultra-creativo */}
              <div className="space-y-4 slide-up-cosmic stagger-2">
                <label
                  htmlFor="email"
                  className="text-sm font-bold text-foreground flex items-center gap-3 font-futuristic tracking-wider"
                >
                  <div className="p-2 gradient-cosmic rounded-lg shadow-neon-sm">
                    <Mail className="w-4 h-4 text-white" />
                  </div>
                  IDENTIFICADOR PERSONAL
                </label>

                <div className="hologram-border rounded-2xl">
                  <div className="relative group">
                    <input
                      id="email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-6 py-5 bg-transparent border-0 rounded-2xl focus:outline-none focus:ring-2 focus:ring-neon-purple/50 transition-all duration-500 placeholder:text-muted-foreground/60 text-foreground font-medium text-lg backdrop-blur-sm"
                      placeholder="neural.id@quantum.net"
                      disabled={loading}
                    />

                    {/* Efecto de escaneo */}
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-neon-blue/0 via-neon-purple/10 to-neon-pink/0 opacity-0 group-focus-within:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

                    {/* Indicador de estado */}
                    <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                      <Eye className="w-5 h-5 text-neon-purple/60 group-focus-within:text-neon-purple transition-colors duration-300" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Botón de envío ultra-futurista */}
              <button
                type="submit"
                disabled={loading || !email.trim()}
                className="w-full relative group overflow-hidden rounded-2xl p-0.5 gradient-aurora transition-all duration-500 hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-neon-purple/50 focus:ring-offset-2 focus:ring-offset-background disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 slide-up-cosmic stagger-3"
              >
                <div className="relative bg-background rounded-2xl px-8 py-5 transition-all duration-500 group-hover:bg-transparent">
                  <div className="flex items-center justify-center space-x-4">
                    {loading ? (
                      <>
                        <div className="relative">
                          <Loader2 className="w-6 h-6 animate-spin text-neon-purple" />
                          <div className="absolute inset-0 w-6 h-6 border-2 border-neon-blue/30 border-t-neon-purple rounded-full animate-spin" style={{ animationDirection: 'reverse' }}></div>
                        </div>
                        <span className="font-futuristic text-lg tracking-wider text-foreground group-hover:text-white transition-colors duration-300">
                          TRANSMITIENDO...
                        </span>
                      </>
                    ) : (
                      <>
                        <div className="p-2 gradient-neon rounded-lg shadow-neon-sm group-hover:shadow-neon-md transition-all duration-300">
                          <Shield className="w-5 h-5 text-white" />
                        </div>
                        <span className="font-futuristic text-lg tracking-wider text-foreground group-hover:text-white transition-colors duration-300">
                          INICIAR SECUENCIA
                        </span>
                        <ArrowRight className="w-5 h-5 text-neon-purple group-hover:text-white transition-all duration-300 group-hover:translate-x-1" />
                      </>
                    )}
                  </div>

                  {/* Efecto de energía */}
                  <div className="absolute inset-0 bg-gradient-to-r from-neon-blue/0 via-neon-purple/20 to-neon-pink/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>
                </div>
              </button>
            </form>

            {/* Display de mensajes ultra-futurista */}
            {mensaje && (
              <div className={`mt-8 p-6 rounded-2xl flex items-start space-x-4 slide-up-cosmic relative overflow-hidden ${messageType === 'success'
                  ? 'bg-gradient-to-r from-emerald-500/10 via-green-500/10 to-teal-500/10 border border-emerald-500/30'
                  : 'bg-gradient-to-r from-red-500/10 via-rose-500/10 to-pink-500/10 border border-red-500/30'
                }`}>
                {/* Efecto de pulso de fondo */}
                <div className={`absolute inset-0 ${messageType === 'success' ? 'bg-emerald-500/5' : 'bg-red-500/5'
                  } animate-pulse`}></div>

                <div className={`p-3 rounded-xl ${messageType === 'success'
                    ? 'bg-gradient-to-br from-emerald-400 to-green-500'
                    : 'bg-gradient-to-br from-red-400 to-rose-500'
                  } shadow-neon-sm relative z-10`}>
                  {messageType === 'success' ? (
                    <CheckCircle className="w-6 h-6 text-white" />
                  ) : (
                    <XCircle className="w-6 h-6 text-white" />
                  )}
                </div>

                <div className="relative z-10">
                  <p className={`font-futuristic font-bold text-sm tracking-wider ${messageType === 'success' ? 'text-emerald-300' : 'text-red-300'
                    }`}>
                    {messageType === 'success' ? 'TRANSMISIÓN EXITOSA' : 'ERROR DE SISTEMA'}
                  </p>
                  <p className={`text-sm mt-2 font-medium ${messageType === 'success' ? 'text-emerald-100' : 'text-red-100'
                    }`}>
                    {mensaje}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Footer ultra-futurista */}
          <div className="text-center mt-12 slide-up-cosmic stagger-4">
            <div className="flex items-center justify-center space-x-3 text-muted-foreground mb-4">
              <div className="w-8 h-0.5 gradient-cosmic rounded-full"></div>
              <Sparkles className="w-5 h-5 text-neon-purple animate-pulse" />
              <p className="text-sm font-futuristic tracking-wider">
                SISTEMA CLIVOX SEGURO
              </p>
              <Sparkles className="w-5 h-5 text-neon-blue animate-pulse" style={{ animationDelay: '0.5s' }} />
              <div className="w-8 h-0.5 gradient-neon rounded-full"></div>
            </div>

            <p className="text-xs text-muted-foreground/60 font-mono">
              ¿Necesitas asistencia técnica?{" "}
              <button className="text-neon-purple hover:text-neon-blue transition-colors font-bold tracking-wider hover:glow-pulse">
                CONTACTAR SOPORTE
              </button>
            </p>

            {/* Indicadores de estado del sistema */}
            <div className="flex items-center justify-center space-x-6 mt-6">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse shadow-neon-sm"></div>
                <span className="text-2xs font-mono text-muted-foreground">NET</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-neon-blue rounded-full animate-pulse shadow-neon-sm" style={{ animationDelay: '0.3s' }}></div>
                <span className="text-2xs font-mono text-muted-foreground">SEC</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-neon-purple rounded-full animate-pulse shadow-neon-sm" style={{ animationDelay: '0.6s' }}></div>
                <span className="text-2xs font-mono text-muted-foreground">CORE</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;