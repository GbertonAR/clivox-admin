import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  MoveRight,
  BarChart3,
  Calendar,
  Users,
  FilePlus,
  Bell,
  Settings,
  User,
  Zap,
  Brain,
  Cpu,
  Activity,
  Shield,
  Sparkles,
  Eye,
  Rocket,
  Globe,
  Database,
  Wifi,
  Power,
  Target,
  TrendingUp,
  BookOpen,
  MessageSquare,
  Clock,
  Star,
  Award,
  ChevronRight,
  Play,
  Pause,
  RotateCcw
} from "lucide-react";

const InstructorDashboard = () => {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const [systemStatus, setSystemStatus] = useState('optimal');
  const [activeConnections, setActiveConnections] = useState(247);
  const [cpuUsage, setCpuUsage] = useState(23);

  // Actualiza fecha y hora cada segundo
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDateTime(new Date());
      // Simular cambios en métricas del sistema
      setActiveConnections(prev => prev + Math.floor(Math.random() * 3) - 1);
      setCpuUsage(prev => Math.max(15, Math.min(35, prev + Math.floor(Math.random() * 3) - 1)));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Formatea fecha y hora como "19 Jul 2025, 22:15:30"
  const formattedDateTime = currentDateTime.toLocaleString("es-AR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  // Nombre de usuario ficticio
  const username = "Gustavo Berton";
  const userTitle = "Clivox Instructor";
  const userLevel = "Quantum Level 7";

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Fondo ultra-creativo con múltiples capas */}
      <div className="absolute inset-0 bg-mesh-cosmic opacity-30"></div>
      <div className="absolute inset-0 bg-neural-network opacity-15"></div>

      {/* Orbes flotantes dinámicos */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/6 w-96 h-96 gradient-cosmic rounded-full mix-blend-multiply filter blur-xl opacity-20 floating-cosmic"></div>
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 gradient-neon rounded-full mix-blend-multiply filter blur-xl opacity-25 floating-cosmic" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-2/3 left-1/2 w-72 h-72 bg-hologram-2 rounded-full mix-blend-multiply filter blur-2xl opacity-15 floating-cosmic" style={{ animationDelay: '4s' }}></div>
      </div>

      {/* Partículas flotantes */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(25)].map((_, i) => (
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

      {/* Header ultra-futurista */}
      <header className="relative z-20 glass-ultra border-b border-neon-purple/20 slide-up-cosmic">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            {/* Logo y título */}
            <div className="flex items-center space-x-6">
              <div className="relative">
                <div className="w-16 h-16 gradient-cosmic rounded-2xl p-0.5 pulse-neon">
                  <div className="flex items-center justify-center w-full h-full bg-background rounded-2xl">
                    <Brain className="w-8 h-8 text-neon-purple" />
                  </div>
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-400 rounded-full animate-pulse shadow-neon-sm"></div>
              </div>

              <div>
                <h1 className="text-4xl font-futuristic gradient-text-cosmic text-glow-neon">
                  CLIVOX COMMAND
                </h1>
                <p className="text-muted-foreground font-mono text-sm tracking-wider">
                  Centro de Control Clivox • Instructor Dashboard
                </p>
              </div>
            </div>

            {/* Métricas del sistema en tiempo real */}
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-4 glass-ultra rounded-2xl px-6 py-3 border border-neon-blue/30">
                <div className="flex items-center space-x-2">
                  <Activity className="w-4 h-4 text-emerald-400 animate-pulse" />
                  <span className="text-xs font-mono text-muted-foreground">CPU</span>
                  <span className="text-sm font-bold text-emerald-400">{cpuUsage}%</span>
                </div>
                <div className="w-px h-6 bg-border"></div>
                <div className="flex items-center space-x-2">
                  <Wifi className="w-4 h-4 text-neon-blue animate-pulse" />
                  <span className="text-xs font-mono text-muted-foreground">CONN</span>
                  <span className="text-sm font-bold text-neon-blue">{activeConnections}</span>
                </div>
                <div className="w-px h-6 bg-border"></div>
                <div className="flex items-center space-x-2">
                  <Shield className="w-4 h-4 text-neon-purple animate-pulse" />
                  <span className="text-xs font-mono text-muted-foreground">SEC</span>
                  <span className="text-sm font-bold text-neon-purple">MAX</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-12 gap-8">
          {/* Sidebar ultra-futurista */}
          <aside className="col-span-3 space-y-6">
            {/* Perfil de usuario */}
            <div className="glass-ultra rounded-3xl p-6 shadow-neon-lg slide-up-cosmic stagger-1 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-neon-blue/5 via-neon-purple/5 to-neon-pink/5"></div>

              <div className="relative z-10">
                {/* Avatar con efectos holográficos */}
                <div className="relative mb-6">
                  <div className="w-20 h-20 hologram-border rounded-full mx-auto">
                    <div className="flex items-center justify-center w-full h-full bg-background rounded-full">
                      <User className="w-10 h-10 text-neon-purple" />
                    </div>
                  </div>
                  <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 px-3 py-1 bg-gradient-to-r from-emerald-400 to-green-500 rounded-full">
                    <span className="text-xs font-bold text-white">ONLINE</span>
                  </div>
                </div>

                <div className="text-center space-y-2 mb-6">
                  <h3 className="text-xl font-futuristic text-foreground">{username}</h3>
                  <p className="text-sm text-neon-purple font-mono tracking-wider">{userTitle}</p>
                  <p className="text-xs text-muted-foreground">{userLevel}</p>
                </div>

                {/* Reloj cuántico */}
                <div className="bg-gradient-to-r from-neon-blue/10 to-neon-purple/10 border border-neon-purple/30 rounded-2xl p-4 mb-6">
                  <div className="flex items-center justify-center space-x-2 mb-2">
                    <Clock className="w-4 h-4 text-neon-blue animate-pulse" />
                    <span className="text-xs font-futuristic tracking-wider text-muted-foreground">TEMPORAL SYNC</span>
                  </div>
                  <div className="text-center font-mono text-sm text-foreground">
                    {formattedDateTime}
                  </div>
                </div>

                <Link to="/perfil">
                  <button className="w-full bg-gradient-to-r from-neon-purple/20 to-neon-blue/20 border border-neon-purple/40 text-foreground py-3 px-4 rounded-xl font-futuristic text-sm tracking-wider transition-all duration-300 hover:shadow-neon-md hover:scale-[1.02] flex items-center justify-center space-x-2">
                    <Eye className="w-4 h-4" />
                    <span>ACCEDER PERFIL</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </Link>
              </div>
            </div>

            {/* Menú de navegación */}
            <div className="glass-ultra rounded-3xl p-6 shadow-neon-lg slide-up-cosmic stagger-2">
              <h4 className="text-sm font-futuristic tracking-wider text-muted-foreground mb-6 flex items-center gap-2">
                <Cpu className="w-4 h-4 text-neon-purple" />
                MÓDULOS DE CONTROL
              </h4>

              <div className="space-y-3">
                {[
                  { icon: FilePlus, label: "CREAR CURSO", color: "neon-blue" },
                  { icon: Bell, label: "ALERTAS", color: "neon-purple", badge: "3" },
                  { icon: Settings, label: "CONFIGURACIÓN", color: "neon-pink" },
                  { icon: Database, label: "BASE DE DATOS", color: "neon-teal" }
                ].map((item, index) => (
                  <button
                    key={index}
                    className="w-full flex items-center justify-between p-3 rounded-xl bg-gradient-to-r from-transparent to-transparent hover:from-neon-purple/10 hover:to-neon-blue/10 border border-transparent hover:border-neon-purple/30 transition-all duration-300 group"
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 bg-gradient-to-br from-${item.color} to-neon-purple rounded-lg shadow-neon-sm`}>
                        <item.icon className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-sm font-futuristic tracking-wider text-foreground group-hover:text-neon-purple transition-colors">
                        {item.label}
                      </span>
                    </div>
                    {item.badge && (
                      <div className="w-6 h-6 bg-gradient-to-br from-red-400 to-rose-500 rounded-full flex items-center justify-center">
                        <span className="text-xs font-bold text-white">{item.badge}</span>
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* Área principal del dashboard */}
          <main className="col-span-9">
            <div className="grid grid-cols-12 gap-6">
              {/* Widget principal - Próximo curso */}
              <div className="col-span-8 glass-ultra rounded-3xl p-8 shadow-neon-xl slide-up-cosmic stagger-3 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-green-500/5 to-teal-500/10"></div>
                <div className="absolute top-4 right-4">
                  <div className="w-3 h-3 bg-emerald-400 rounded-full animate-pulse shadow-neon-sm"></div>
                </div>

                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-16 bg-gradient-to-br from-emerald-400 to-green-500 rounded-2xl p-0.5 pulse-neon">
                        <div className="flex items-center justify-center w-full h-full bg-background rounded-2xl">
                          <Rocket className="w-8 h-8 text-emerald-400" />
                        </div>
                      </div>
                      <div>
                        <h2 className="text-2xl font-futuristic gradient-text-neon mb-1">PRÓXIMO CURSO</h2>
                        <p className="text-muted-foreground font-mono text-sm">Sesión Clivox Programada</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-bold text-emerald-400 font-mono">10:00</div>
                      <div className="text-sm text-muted-foreground">19 Jul 2025</div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-emerald-500/10 to-green-500/10 border border-emerald-500/30 rounded-2xl p-6 mb-6">
                    <h3 className="text-xl font-bold text-foreground mb-2">Seguridad Vial </h3>
                    <p className="text-muted-foreground mb-4">Protocolo de entrenamiento vial avanzado</p>

                    <div className="flex items-center space-x-6 text-sm">
                      <div className="flex items-center space-x-2">
                        <Users className="w-4 h-4 text-emerald-400" />
                        <span className="text-muted-foreground">24 Participantes</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4 text-emerald-400" />
                        <span className="text-muted-foreground">2h 30min</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Target className="w-4 h-4 text-emerald-400" />
                        <span className="text-muted-foreground">Nivel Avanzado</span>
                      </div>
                    </div>
                  </div>

                  <a href="http://localhost:5173/acs-instructor" target="_blank" rel="noopener noreferrer">
                    <button className="w-full bg-gradient-to-r from-emerald-400 via-green-500 to-teal-500 text-white py-4 px-6 rounded-2xl font-futuristic text-lg tracking-wider transition-all duration-300 hover:shadow-neon-xl hover:scale-[1.02] flex items-center justify-center space-x-3 group">
                      <Play className="w-6 h-6 group-hover:scale-110 transition-transform" />
                      <span>INICIAR SESIÓN CLIVOX</span>
                      <MoveRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                    </button>
                  </a>
                </div>
              </div>

              {/* Métricas rápidas */}
              <div className="col-span-4 space-y-6">
                <div className="glass-ultra rounded-2xl p-6 shadow-neon-lg slide-up-cosmic stagger-4">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-gradient-to-br from-neon-blue to-neon-purple rounded-lg shadow-neon-sm">
                        <TrendingUp className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h4 className="font-futuristic text-sm tracking-wider text-foreground">RENDIMIENTO</h4>
                        <p className="text-2xl font-bold text-neon-blue">92%</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-emerald-400 font-mono">+5.2%</div>
                      <div className="text-xs text-muted-foreground">vs anterior</div>
                    </div>
                  </div>
                  <div className="w-full bg-muted/30 rounded-full h-2">
                    <div className="bg-gradient-to-r from-neon-blue to-neon-purple h-2 rounded-full" style={{ width: '92%' }}></div>
                  </div>
                </div>

                <div className="glass-ultra rounded-2xl p-6 shadow-neon-lg slide-up-cosmic stagger-5">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="p-2 bg-gradient-to-br from-neon-purple to-neon-pink rounded-lg shadow-neon-sm">
                      <Award className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h4 className="font-futuristic text-sm tracking-wider text-foreground">NIVEL NEURAL</h4>
                      <p className="text-2xl font-bold text-neon-purple">7</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {[...Array(7)].map((_, i) => (
                      <div key={i} className="w-3 h-3 bg-gradient-to-br from-neon-purple to-neon-pink rounded-full shadow-neon-sm"></div>
                    ))}
                    {[...Array(3)].map((_, i) => (
                      <div key={i} className="w-3 h-3 bg-muted/30 rounded-full"></div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Grid de widgets */}
              <div className="col-span-12 grid grid-cols-4 gap-6 mt-6">
                {/* Próximos cursos */}
                <div className="glass-ultra rounded-2xl p-6 shadow-neon-lg slide-up-cosmic stagger-6 hover:shadow-neon-xl transition-all duration-300 group cursor-pointer">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 bg-gradient-to-br from-neon-blue to-cyan-500 rounded-xl shadow-neon-sm group-hover:shadow-neon-md transition-all duration-300">
                      <Calendar className="w-6 h-6 text-white" />
                    </div>
                    <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-neon-blue group-hover:translate-x-1 transition-all duration-300" />
                  </div>
                  <h3 className="font-futuristic text-lg tracking-wider text-foreground mb-2">AGENDA CLIVOX</h3>
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center space-x-2 text-sm">
                      <div className="w-2 h-2 bg-neon-blue rounded-full animate-pulse"></div>
                      <span className="text-muted-foreground">Manejo Defensivo - 20/07</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm">
                      <div className="w-2 h-2 bg-neon-purple rounded-full animate-pulse"></div>
                      <span className="text-muted-foreground">Educación Ciclista - 21/07</span>
                    </div>
                  </div>
                  <Link to="/salas-pendientes" className="text-neon-blue hover:text-neon-purple transition-colors text-sm font-mono tracking-wider">
                    VER TODOS →
                  </Link>
                </div>

                {/* Gestión de alumnos */}
                <div className="glass-ultra rounded-2xl p-6 shadow-neon-lg slide-up-cosmic stagger-7 hover:shadow-neon-xl transition-all duration-300 group cursor-pointer">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 bg-gradient-to-br from-neon-purple to-violet-500 rounded-xl shadow-neon-sm group-hover:shadow-neon-md transition-all duration-300">
                      <Users className="w-6 h-6 text-white" />
                    </div>
                    <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center">
                      <span className="text-xs font-bold text-white">12</span>
                    </div>
                  </div>
                  <h3 className="font-futuristic text-lg tracking-wider text-foreground mb-2">ESTUDIANTES</h3>
                  <p className="text-sm text-muted-foreground mb-4">12 inscripciones pendientes de validación Clivox</p>
                  <button className="w-full bg-gradient-to-r from-neon-purple/20 to-violet-500/20 border border-neon-purple/40 text-foreground py-2 px-4 rounded-xl font-futuristic text-sm tracking-wider transition-all duration-300 hover:shadow-neon-md">
                    REVISAR MATRIZ
                  </button>
                </div>

                {/* Crear nuevo curso */}
                <div className="glass-ultra rounded-2xl p-6 shadow-neon-lg slide-up-cosmic stagger-8 hover:shadow-neon-xl transition-all duration-300 group cursor-pointer">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 bg-gradient-to-br from-neon-pink to-rose-500 rounded-xl shadow-neon-sm group-hover:shadow-neon-md transition-all duration-300">
                      <FilePlus className="w-6 h-6 text-white" />
                    </div>
                    <Sparkles className="w-5 h-5 text-neon-pink animate-pulse" />
                  </div>
                  <h3 className="font-futuristic text-lg tracking-wider text-foreground mb-2">NUEVO MÓDULO</h3>
                  <p className="text-sm text-muted-foreground mb-4">Crear nueva sesión de entrenamiento Clivox</p>
                  <Link to="/salas">
                    <button className="w-full bg-gradient-to-r from-neon-pink/20 to-rose-500/20 border border-neon-pink/40 text-foreground py-2 px-4 rounded-xl font-futuristic text-sm tracking-wider transition-all duration-300 hover:shadow-neon-md">
                      INICIALIZAR
                    </button>
                  </Link>
                </div>

                {/* Analíticas */}
                <div className="glass-ultra rounded-2xl p-6 shadow-neon-lg slide-up-cosmic stagger-9 hover:shadow-neon-xl transition-all duration-300 group cursor-pointer">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 bg-gradient-to-br from-neon-teal to-emerald-500 rounded-xl shadow-neon-sm group-hover:shadow-neon-md transition-all duration-300">
                      <BarChart3 className="w-6 h-6 text-white" />
                    </div>
                    <TrendingUp className="w-5 h-5 text-emerald-400" />
                  </div>
                  <h3 className="font-futuristic text-lg tracking-wider text-foreground mb-2">MÉTRICAS</h3>
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Asistencia:</span>
                      <span className="text-emerald-400 font-bold">92%</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Satisfacción:</span>
                      <span className="text-emerald-400 font-bold">4.8/5</span>
                    </div>
                  </div>
                  <Link to="/reportes" className="text-neon-teal hover:text-emerald-400 transition-colors text-sm font-mono tracking-wider">
                    VER REPORTES →
                  </Link>
                </div>
              </div>

              {/* Widgets adicionales */}
              <div className="col-span-12 grid grid-cols-3 gap-6 mt-6">
                {/* Gestión de contenidos */}
                <div className="glass-ultra rounded-2xl p-6 shadow-neon-lg slide-up-cosmic stagger-10">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="p-3 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl shadow-neon-sm">
                      <BookOpen className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-futuristic text-lg tracking-wider text-foreground">BIBLIOTECA CLIVOX</h3>
                      <p className="text-sm text-muted-foreground">35 documentos cuánticos</p>
                    </div>
                  </div>
                  <button className="w-full bg-gradient-to-r from-indigo-500/20 to-purple-600/20 border border-indigo-500/40 text-foreground py-3 px-4 rounded-xl font-futuristic text-sm tracking-wider transition-all duration-300 hover:shadow-neon-md">
                    ACCEDER BIBLIOTECA
                  </button>
                </div>

                {/* Notificaciones */}
                <div className="glass-ultra rounded-2xl p-6 shadow-neon-lg slide-up-cosmic stagger-11">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="p-3 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl shadow-neon-sm">
                        <Bell className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="font-futuristic text-lg tracking-wider text-foreground">ALERTAS</h3>
                    </div>
                    <div className="w-6 h-6 bg-gradient-to-br from-red-400 to-rose-500 rounded-full flex items-center justify-center">
                      <span className="text-xs font-bold text-white">2</span>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3 p-3 bg-gradient-to-r from-emerald-500/10 to-green-500/10 border border-emerald-500/20 rounded-xl">
                      <div className="w-2 h-2 bg-emerald-400 rounded-full mt-2 animate-pulse"></div>
                      <div>
                        <p className="text-sm text-foreground font-medium">Nueva inscripción</p>
                        <p className="text-xs text-muted-foreground">Juan Pérez - Curso Avanzado</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3 p-3 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/20 rounded-xl">
                      <div className="w-2 h-2 bg-neon-blue rounded-full mt-2 animate-pulse"></div>
                      <div>
                        <p className="text-sm text-foreground font-medium">Consulta técnica</p>
                        <p className="text-xs text-muted-foreground">Pregunta sobre módulo neural</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Estado del sistema */}
                <div className="glass-ultra rounded-2xl p-6 shadow-neon-lg slide-up-cosmic stagger-12">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="p-3 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl shadow-neon-sm">
                      <Shield className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-futuristic text-lg tracking-wider text-foreground">SISTEMA</h3>
                      <p className="text-sm text-emerald-400 font-mono">ÓPTIMO</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Servidores:</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                        <span className="text-sm text-emerald-400 font-mono">ONLINE</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Base Neural:</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-neon-blue rounded-full animate-pulse"></div>
                        <span className="text-sm text-neon-blue font-mono">SYNC</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Seguridad:</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-neon-purple rounded-full animate-pulse"></div>
                        <span className="text-sm text-neon-purple font-mono">MAX</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default InstructorDashboard;