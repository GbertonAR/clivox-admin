import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Shield, ArrowLeft, RefreshCw, CheckCircle, XCircle, Loader2, Sparkles, Key, Zap, Eye, Lock, Cpu, Wifi } from "lucide-react";

const ValidarCodigo: React.FC = () => {
  const [codigo, setCodigo] = useState(["", "", "", "", "", ""]);
  const [mensaje, setMensaje] = useState("");
  const [loading, setLoading] = useState(false);
  const [messageType, setMessageType] = useState<'success' | 'error' | null>(null);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const email = searchParams.get('email');

  useEffect(() => {
    if (!email) {
      navigate('/login');
    }
  }, [email, navigate]);

  useEffect(() => {
    // Focus first input on mount
    inputRefs.current[0]?.focus();
  }, []);

  const handleInputChange = (index: number, value: string) => {
    if (value.length > 1) return; // Only allow single character

    // Allow alphanumeric characters (A-Z, a-z, 0-9)
    const alphanumericValue = value.replace(/[^A-Za-z0-9]/g, '').toUpperCase();

    const newCodigo = [...codigo];
    newCodigo[index] = alphanumericValue;
    setCodigo(newCodigo);

    // Auto-focus next input
    if (alphanumericValue && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !codigo[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    // Allow alphanumeric characters and convert to uppercase
    const pastedData = e.clipboardData.getData('text').replace(/[^A-Za-z0-9]/g, '').toUpperCase().slice(0, 6);
    const newCodigo = [...codigo];

    for (let i = 0; i < 6; i++) {
      newCodigo[i] = pastedData[i] || '';
    }

    setCodigo(newCodigo);

    // Focus the next empty input or the last one
    const nextEmptyIndex = newCodigo.findIndex(char => !char);
    const focusIndex = nextEmptyIndex === -1 ? 5 : nextEmptyIndex;
    inputRefs.current[focusIndex]?.focus();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const codigoCompleto = codigo.join('');

    if (codigoCompleto.length !== 6) {
      setMensaje("Por favor, ingresa el código completo de 6 caracteres alfanuméricos.");
      setMessageType('error');
      return;
    }

    setMensaje("");
    setLoading(true);
    setMessageType(null);

    try {
      const response = await fetch("http://localhost:8000/auth/validar-codigo_acs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, codigo: codigoCompleto }),
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

  const reenviarCodigo = async () => {
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
      console.log("Respuesta del servidor:", data);
      console.log("Response status:", response.status);

      if (response.ok) {
        setMensaje("Nueva secuencia neural transmitida exitosamente al terminal cuántico.");
        setMessageType('success');
        setCodigo(["", "", "", "", "", ""]);
        inputRefs.current[0]?.focus();
      } else {
        setMensaje(data.error || "Error en la retransmisión neural. Protocolo de seguridad activado.");
        setMessageType('error');
      }
    } catch (error) {
      console.error("Error de red:", error);
      setMensaje("Interferencia en la red cuántica detectada durante la retransmisión.");
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
        <div className="absolute top-1/3 right-1/3 w-96 h-96 gradient-cosmic rounded-full mix-blend-multiply filter blur-xl opacity-30 floating-cosmic"></div>
        <div className="absolute bottom-1/3 left-1/3 w-80 h-80 gradient-neon rounded-full mix-blend-multiply filter blur-xl opacity-25 floating-cosmic" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-hologram-2 rounded-full mix-blend-multiply filter blur-2xl opacity-20 floating-cosmic" style={{ animationDelay: '4s' }}></div>
      </div>

      {/* Efectos de partículas adicionales */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(15)].map((_, i) => (
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
        <div className="w-full max-w-lg">
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
                  <Lock className="w-12 h-12 text-neon-purple drop-shadow-lg" />
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
              CLIVOX SCAN
            </h1>
            <p className="text-xl font-medium text-foreground/80 mb-2">
              Verificación de Secuencia Visiomix
            </p>
            <p className="text-sm text-muted-foreground font-mono mb-4">
              Protocolo de Autenticación Alfanumérica
            </p>

            {/* Información del email con diseño futurista */}
            <div className="inline-flex items-center space-x-3 bg-gradient-to-r from-neon-blue/10 via-neon-purple/10 to-neon-pink/10 border border-neon-purple/30 rounded-2xl px-6 py-3">
              <Wifi className="w-5 h-5 text-neon-blue animate-pulse" />
              <span className="text-sm text-muted-foreground">Terminal:</span>
              <span className="font-mono text-neon-purple font-bold tracking-wider">
                {email}
              </span>
            </div>
          </div>

          {/* Tarjeta de verificación ultra-futurista */}
          <div className="glass-ultra rounded-3xl p-8 shadow-neon-xl scale-in-cosmic stagger-1 relative overflow-hidden">
            {/* Efecto de brillo deslizante */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full animate-shimmer"></div>

            <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
              {/* Input de código ultra-creativo */}
              <div className="space-y-6 slide-up-cosmic stagger-2">
                <label className="text-sm font-bold text-foreground flex items-center justify-center gap-3 font-futuristic tracking-wider">
                  <div className="p-2 gradient-cosmic rounded-lg shadow-neon-sm">
                    <Key className="w-4 h-4 text-white" />
                  </div>
                  SECUENCIA CLIVOX ALFANUMÉRICA
                </label>

                {/* Contenedor de inputs con efectos holográficos */}
                <div className="relative">
                  <div className="flex justify-center space-x-4">
                    {codigo.map((char, index) => (
                      <div key={index} className="relative group">
                        {/* Borde holográfico */}
                        <div className="absolute inset-0 hologram-border rounded-2xl opacity-60 group-focus-within:opacity-100 transition-opacity duration-300">
                          <div className="w-full h-full bg-transparent rounded-2xl"></div>
                        </div>

                        <input
                          ref={(el) => { inputRefs.current[index] = el }}
                          type="text"
                          maxLength={1}
                          value={char}
                          onChange={(e) => handleInputChange(index, e.target.value)}
                          onKeyDown={(e) => handleKeyDown(index, e)}
                          onPaste={handlePaste}
                          className="relative z-10 w-16 h-20 text-center text-2xl font-bold font-mono bg-transparent border-0 rounded-2xl focus:outline-none transition-all duration-500 text-foreground disabled:opacity-50 uppercase tracking-widest"
                          disabled={loading}
                          placeholder="●"
                        />

                        {/* Efecto de escaneo */}
                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-neon-blue/0 via-neon-purple/20 to-neon-pink/0 opacity-0 group-focus-within:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

                        {/* Indicador de estado */}
                        <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2">
                          <div className={`w-2 h-2 rounded-full transition-all duration-300 ${char ? 'bg-emerald-400 shadow-neon-sm animate-pulse' : 'bg-muted-foreground/30'
                            }`}></div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Línea de conexión entre inputs */}
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-0.5 gradient-aurora opacity-30 -z-10"></div>
                </div>

                <div className="text-center space-y-2">
                  <p className="text-xs text-muted-foreground font-mono">
                    Acepta caracteres: A-Z, 0-9 • Auto-conversión a mayúsculas
                  </p>
                  <p className="text-2xs text-muted-foreground/60">
                    Puedes pegar la secuencia completa en cualquier campo
                  </p>
                </div>
              </div>

              {/* Botón de verificación ultra-futurista */}
              <button
                type="submit"
                disabled={loading || codigo.some(char => !char)}
                className="w-full relative group overflow-hidden rounded-2xl p-0.5 gradient-aurora transition-all duration-500 hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-neon-purple/50 focus:ring-offset-2 focus:ring-offset-background disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 slide-up-cosmic stagger-3"
              >
                <div className="relative bg-background rounded-2xl px-8 py-6 transition-all duration-500 group-hover:bg-transparent">
                  <div className="flex items-center justify-center space-x-4">
                    {loading ? (
                      <>
                        <div className="relative">
                          <Loader2 className="w-6 h-6 animate-spin text-neon-purple" />
                          <div className="absolute inset-0 w-6 h-6 border-2 border-neon-blue/30 border-t-neon-purple rounded-full animate-spin" style={{ animationDirection: 'reverse' }}></div>
                        </div>
                        <span className="font-futuristic text-lg tracking-wider text-foreground group-hover:text-white transition-colors duration-300">
                          PROCESANDO MATRIZ...
                        </span>
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-neon-blue rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-neon-purple rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                          <div className="w-2 h-2 bg-neon-pink rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="p-2 gradient-neon rounded-lg shadow-neon-sm group-hover:shadow-neon-md transition-all duration-300">
                          <Cpu className="w-5 h-5 text-white" />
                        </div>
                        <span className="font-futuristic text-lg tracking-wider text-foreground group-hover:text-white transition-colors duration-300">
                          VALIDAR SECUENCIA
                        </span>
                        <Zap className="w-5 h-5 text-neon-purple group-hover:text-white transition-all duration-300 group-hover:rotate-12" />
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
                    {messageType === 'success' ? 'PROTOCOLO EXITOSO' : 'FALLO DEL SISTEMA'}
                  </p>
                  <p className={`text-sm mt-2 font-medium ${messageType === 'success' ? 'text-emerald-100' : 'text-red-100'
                    }`}>
                    {mensaje}
                  </p>
                </div>
              </div>
            )}

            {/* Acciones ultra-futuristas */}
            <div className="mt-8 flex flex-col space-y-4 slide-up-cosmic stagger-4">
              <button
                type="button"
                onClick={reenviarCodigo}
                disabled={loading}
                className="w-full text-center text-sm text-muted-foreground hover:text-foreground transition-all duration-300 flex items-center justify-center space-x-3 py-4 px-6 rounded-xl hover:bg-gradient-to-r hover:from-neon-blue/10 hover:to-neon-purple/10 hover:border hover:border-neon-purple/30 disabled:opacity-50 group"
              >
                <RefreshCw className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500 text-neon-blue" />
                <span className="font-futuristic tracking-wider">RETRANSMITIR SECUENCIA</span>
                <div className="w-2 h-2 bg-neon-blue rounded-full animate-pulse"></div>
              </button>

              <button
                type="button"
                onClick={() => navigate('/login')}
                className="w-full text-center text-sm text-muted-foreground hover:text-foreground transition-all duration-300 flex items-center justify-center space-x-3 py-4 px-6 rounded-xl hover:bg-gradient-to-r hover:from-neon-purple/10 hover:to-neon-pink/10 hover:border hover:border-neon-purple/30 group"
              >
                <ArrowLeft className="w-5 h-5 group-hover:-translate-x-2 transition-transform duration-300 text-neon-purple" />
                <span className="font-futuristic tracking-wider">REGRESAR AL PORTAL</span>
                <div className="w-2 h-2 bg-neon-purple rounded-full animate-pulse"></div>
              </button>
            </div>
          </div>

          {/* Footer ultra-futurista */}
          <div className="text-center mt-12 slide-up-cosmic stagger-5">
            <div className="flex items-center justify-center space-x-3 text-muted-foreground mb-4">
              <div className="w-8 h-0.5 gradient-cosmic rounded-full"></div>
              <Eye className="w-5 h-5 text-neon-purple animate-pulse" />
              <p className="text-sm font-futuristic tracking-wider">
                ESCÁNER ACTIVO
              </p>
              <Eye className="w-5 h-5 text-neon-blue animate-pulse" style={{ animationDelay: '0.5s' }} />
              <div className="w-8 h-0.5 gradient-neon rounded-full"></div>
            </div>

            {/* Indicadores de estado del sistema */}
            <div className="flex items-center justify-center space-x-6">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse shadow-neon-sm"></div>
                <span className="text-2xs font-mono text-muted-foreground">SCAN</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-neon-blue rounded-full animate-pulse shadow-neon-sm" style={{ animationDelay: '0.3s' }}></div>
                <span className="text-2xs font-mono text-muted-foreground">MATRIX</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-neon-purple rounded-full animate-pulse shadow-neon-sm" style={{ animationDelay: '0.6s' }}></div>
                <span className="text-2xs font-mono text-muted-foreground">VERIFY</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ValidarCodigo;