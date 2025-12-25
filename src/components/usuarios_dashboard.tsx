import React, { useState, useEffect, useMemo } from "react";
// Importaciones de UI/Componentes si las tienes (ej. Shadcn UI)
// import { Button } from '@/components/ui/button';
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import { Progress } from '@/components/ui/progress';

// import "../assets/css/usuariosdashboard.css"; // Mantener tu CSS personalizado

// --- Tipos de Datos (Interfaces) ---
// Usar `interface` es una buena práctica para definir tipos de objetos
interface Curso {
  id: number;
  titulo: string;
  fecha: string; // Formato "YYYY-MM-DD"
  hora: string; // Formato "HH:MM"
  instructor: string;
  salaActivaDesde?: string; // Cambiado a string para consistencia con fecha/hora y fácil creación
  linkAcceso?: string; // Agregamos el link de acceso, crucial para el botón
}

interface Badge {
  id: number;
  nombre: string;
  descripcion: string;
  icono: string; // url o emoji
}

interface CursoCompletado {
  id: number;
  titulo: string;
  notasDisponibles: boolean;
  certificadoDisponible: boolean;
  // Podrías añadir fecha de completado, score, etc.
}

interface Notificacion {
  id: number;
  mensaje: string;
  fecha: string; // Formato "YYYY-MM-DD"
}

// --- Componente Principal del Dashboard ---
const UsuariosDashboard: React.FC = () => { // Renombrado a PascalCase
  // --- Estados y Datos MOCK ---
  // Idealmente, estos datos vendrían de una API (useEffect con fetch)
  const [proximoCurso, setProximoCurso] = useState<Curso>({
    id: 1,
    titulo: "Introducción a React",
    fecha: "2025-07-25",
    hora: "19:00",
    instructor: "Juan Pérez",
    // Asegurarse de que 'salaActivaDesde' sea una fecha/hora válida.
    // Usar el mismo formato que fecha y hora del curso es más consistente.
    // Ejemplo: '2025-07-25T18:45:00'
    salaActivaDesde: "2025-07-25T18:45:00",
    linkAcceso: "https://zoom.us/j/1234567890" // Link real de la sala
  });

  const [timeLeft, setTimeLeft] = useState<string>("");
  const [badgeSeleccionado, setBadgeSeleccionado] = useState<Badge | null>(null);

  const progreso = useMemo(() => ({ // useMemo si esto no cambia entre renders
    cursosCompletados: 3,
    totalCursos: 5,
    examenesAprobados: 7,
    puntosGamificacion: 1240,
  }), []);

  const badges: Badge[] = useMemo(() => [ // useMemo para datos estáticos grandes
    { id: 1, nombre: "React Novato", descripcion: "Completaste el curso básico de React.", icono: "⚛️" },
    { id: 2, nombre: "Examen Experto", descripcion: "Aprobaste 5 exámenes.", icono: "🧠" },
    { id: 3, nombre: "Constancia", descripcion: "Has tomado 10 cursos.", icono: "🏅" },
  ], []);

  const cursosCompletados: CursoCompletado[] = useMemo(() => [
    { id: 101, titulo: "HTML y CSS Básico", notasDisponibles: true, certificadoDisponible: true },
    { id: 102, titulo: "JavaScript Moderno", notasDisponibles: false, certificadoDisponible: true },
    { id: 103, titulo: "Fundamentos de Node.js", notasDisponibles: true, certificadoDisponible: false },
  ], []);

  const cursosSugeridos = useMemo(() => [
    { id: 201, titulo: "TypeScript Avanzado" },
    { id: 202, titulo: "Testing en React" },
    { id: 203, titulo: "GraphQL desde cero" },
  ], []);

  const notificaciones: Notificacion[] = useMemo(() => [
    { id: 1, mensaje: "Recordá que el curso 'React Avanzado' inicia el 30 de julio.", fecha: "2025-07-15" },
    { id: 2, mensaje: "Nuevo material disponible en 'JavaScript Moderno'.", fecha: "2025-07-12" },
  ], []);

  // --- Efecto para el contador de tiempo restante ---
  useEffect(() => {
    // Validar si hay un próximo curso y una fecha válida
    if (!proximoCurso || !proximoCurso.fecha || !proximoCurso.hora) {
      setTimeLeft("No hay próximo curso.");
      return; // Salir si no hay datos de curso
    }

    const intervalo = setInterval(() => {
      const ahora = new Date();
      // Usar new Date() directamente con el formato ISO es más fiable
      const fechaCurso = new Date(`${proximoCurso.fecha}T${proximoCurso.hora}:00`);
      const diff = fechaCurso.getTime() - ahora.getTime();

      if (diff <= 0) {
        setTimeLeft("¡El curso ya comenzó!");
        clearInterval(intervalo); // Detener el intervalo una vez que el curso comienza
      } else {
        const segundosTotales = Math.floor(diff / 1000);
        const dias = Math.floor(segundosTotales / (60 * 60 * 24));
        const horas = Math.floor((segundosTotales % (60 * 60 * 24)) / (60 * 60));
        const minutos = Math.floor((segundosTotales % (60 * 60)) / 60);
        const segundos = segundosTotales % 60;

        let timeLeftString = "";
        if (dias > 0) timeLeftString += `${dias}d `;
        if (horas > 0 || dias > 0) timeLeftString += `${horas}h `; // Mostrar horas si hay días o al menos horas
        if (minutos > 0 || horas > 0 || dias > 0) timeLeftString += `${minutos}m `; // Mostrar minutos si hay horas o días
        timeLeftString += `${segundos}s`;

        setTimeLeft(timeLeftString.trim()); // Eliminar espacios al final
      }
    }, 1000);

    // Función de limpieza para evitar fugas de memoria
    return () => clearInterval(intervalo);
  }, [proximoCurso]); // Dependencia del efecto

  // --- Función para saber si el botón "Acceder a la Sala" debe estar activo ---
  const puedeAcceder = () => {
    if (!proximoCurso.salaActivaDesde || !proximoCurso.linkAcceso) return false; // También verificar que hay un link
    const fechaActivacion = new Date(proximoCurso.salaActivaDesde);
    return new Date() >= fechaActivacion;
  };

  // --- Función para manejar el acceso a la sala ---
  const handleAccederSala = () => {
    if (proximoCurso.linkAcceso) {
      window.open(proximoCurso.linkAcceso, '_blank'); // Abre el link en una nueva pestaña
    } else {
      alert("El enlace a la sala no está disponible.");
    }
  };

  return (
    <div style={{ padding: 20, fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", maxWidth: 1200, margin: '0 auto' }}>
      <h1>Mi Centro de Aprendizaje Personalizado</h1>

      {/* Mi Próximo Curso - Mosaico Destacado */}
      <section style={{ border: "2px solid #007bff", borderRadius: 10, padding: 15, marginBottom: 20, boxShadow: "0 4px 8px rgba(0,0,0,0.1)" }}>
        <h2>Mi Próximo Curso</h2>
        <p><strong>{proximoCurso.titulo}</strong></p>
        <p>Fecha: {proximoCurso.fecha} a las {proximoCurso.hora}</p>
        <p>Instructor: {proximoCurso.instructor}</p>
        <p>Comienza en: <strong>{timeLeft}</strong></p>
        
        <a href="http://localhost:5173/acs-cliente" target="_blank" rel="noopener noreferrer">
          <button
            disabled={!puedeAcceder()}
            style={{
              padding: "10px 20px",
              backgroundColor: puedeAcceder() ? "#007bff" : "#999",
              color: "white",
              border: "none",
              borderRadius: 5,
              cursor: puedeAcceder() ? "pointer" : "not-allowed",
              marginTop: 10,
              transition: "background-color 0.3s"
            }}
            onClick={handleAccederSala} // Usar la función de manejo
          >
            Acceder a la Sala
          </button>
        </a>
      </section>

      {/* Contenedor principal de los mosaicos */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20, marginBottom: 20 }}>
        {/* Mi Progreso */}
        <section style={sectionCardStyle}>
          <h2>Mi Progreso</h2>
          <div style={{ backgroundColor: "#eee", borderRadius: 10, overflow: "hidden", height: 20, width: "100%", marginBottom: 10 }}>
            <div
              style={{
                backgroundColor: "#28a745",
                height: "100%",
                width: `${(progreso.cursosCompletados / progreso.totalCursos) * 100}%`,
                transition: "width 0.5s",
                borderRadius: 10 // Para que la barra de progreso también tenga bordes redondeados
              }}
            />
          </div>
          <p>{progreso.cursosCompletados} de {progreso.totalCursos} cursos completados</p>
          <p>Exámenes aprobados: {progreso.examenesAprobados}</p>
          <p>Puntos: {progreso.puntosGamificacion}</p>
        </section>

        {/* Mis Logros (Badges) */}
        <section style={sectionCardStyle}>
          <h2>Mis Logros (Badges)</h2>
          <div style={{ display: "flex", gap: 10, flexWrap: 'wrap', justifyContent: 'center' }}>
            {badges.map(badge => (
              <div
                key={badge.id}
                onClick={() => setBadgeSeleccionado(badge)}
                style={{
                  cursor: "pointer",
                  border: badgeSeleccionado?.id === badge.id ? "2px solid #007bff" : "1px solid #ccc", // Resaltar seleccionado
                  borderRadius: 10,
                  padding: 8,
                  width: 70, // Tamaño ajustado para mosaico
                  height: 70,
                  fontSize: 32, // Tamaño de icono
                  display: "flex",
                  flexDirection: 'column', // Para centrar texto si lo hubiera
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "transform 0.2s, border-color 0.2s",
                  boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
                  backgroundColor: '#fff'
                }}
                onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.05)")}
                onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")}
                title={badge.nombre}
              >
                {badge.icono}
                {/* <span style={{fontSize: '0.7em', marginTop: 5}}>{badge.nombre}</span> */} {/* Opcional: nombre pequeño debajo del icono */}
              </div>
            ))}
          </div>
          {badgeSeleccionado && (
            <div style={{ marginTop: 15, padding: 10, border: "1px solid #007bff", borderRadius: 8, backgroundColor: "#e9f5ff" }}>
              <h3>{badgeSeleccionado.nombre}</h3>
              <p>{badgeSeleccionado.descripcion}</p>
              <button
                onClick={() => setBadgeSeleccionado(null)}
                style={{
                  marginTop: 10, padding: "5px 10px", backgroundColor: "#dc3545", color: "white",
                  border: "none", borderRadius: 4, cursor: "pointer"
                }}
              >
                Cerrar
              </button>
            </div>
          )}
        </section>

        {/* Mis Cursos Completados */}
        <section style={sectionCardStyle}>
          <h2>Mis Cursos Completados</h2>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {cursosCompletados.length > 0 ? (
              cursosCompletados.map(curso => (
                <li key={curso.id} style={{ marginBottom: 10, borderBottom: "1px solid #eee", paddingBottom: 8 }}>
                  <strong>{curso.titulo}</strong>
                  <div style={{ marginTop: 5 }}>
                    {curso.notasDisponibles && <button style={buttonSmallStyle} onClick={() => alert(`Notas del curso ${curso.titulo}`)}>Ver Notas</button>}
                    {curso.certificadoDisponible && <button style={{ ...buttonSmallStyle, marginLeft: 10, backgroundColor: '#007bff' }} onClick={() => alert(`Certificado del curso ${curso.titulo}`)}>Ver Certificado</button>}
                  </div>
                </li>
              ))
            ) : (
              <p>Aún no has completado ningún curso.</p>
            )}
          </ul>
        </section>

        {/* Catálogo de Cursos Sugeridos */}
        <section style={sectionCardStyle}>
          <h2>Catálogo de Cursos Sugeridos</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {cursosSugeridos.length > 0 ? (
              cursosSugeridos.map(curso => (
                <div key={curso.id} style={{ border: "1px solid #eee", borderRadius: 8, padding: 10, backgroundColor: '#f9f9f9' }}>
                  <h4>{curso.titulo}</h4>
                  <button style={buttonSmallStyle} onClick={() => alert(`Más info del curso: ${curso.titulo}`)}>Ver Detalles</button>
                </div>
              ))
            ) : (
              <p>No hay cursos sugeridos en este momento.</p>
            )}
          </div>
        </section>

        {/* Notificaciones Importantes */}
        <section style={sectionCardStyle}>
          <h2>Notificaciones Importantes</h2>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {notificaciones.length > 0 ? (
              notificaciones.map(n => (
                <li key={n.id} style={{ marginBottom: 8, borderBottom: "1px solid #eee", paddingBottom: 6 }}>
                  <small style={{ color: '#666' }}>{n.fecha} - </small>
                  {n.mensaje}
                </li>
              ))
            ) : (
              <p>No hay notificaciones nuevas.</p>
            )}
          </ul>
        </section>

        {/* Preguntas Frecuentes / Soporte */}
        <section style={{ ...sectionCardStyle, gridColumn: 'span 1 / span 1' }}> {/* Ocupar solo una columna */}
          <h2>Ayuda y Soporte</h2>
          <p>¿Tenés dudas? Accedé a nuestra sección de ayuda o contactanos.</p>
          <button
            onClick={() => alert("Abrir sección de Preguntas Frecuentes / Soporte")}
            style={{
              padding: "10px 15px", backgroundColor: "#6c757d", color: "white",
              border: "none", borderRadius: 5, cursor: "pointer", marginTop: 10
            }}
          >
            FAQ / Soporte
          </button>
        </section>

      </div>
    </div>
  );
};

export default UsuariosDashboard;

// --- Estilos Reutilizables (para simular cards y botones) ---
const sectionCardStyle: React.CSSProperties = {
  border: "1px solid #ddd",
  borderRadius: 10,
  padding: 15,
  marginBottom: 0, // Ajustado para el grid gap
  backgroundColor: "white",
  boxShadow: "0 2px 5px rgba(0,0,0,0.05)",
  display: "flex",
  flexDirection: "column",
  minHeight: 200 // Asegura que las tarjetas tengan una altura mínima consistente
};

const buttonSmallStyle: React.CSSProperties = {
  padding: "5px 10px",
  backgroundColor: "#6c757d", // Color secundario
  color: "white",
  border: "none",
  borderRadius: 4,
  cursor: "pointer",
  fontSize: "0.85em",
  transition: "background-color 0.2s"
};