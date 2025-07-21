import React, { useState, useEffect } from "react";
import { Card, CardContent } from "./ui/Card";
import { Button } from "./ui/Button";
import {
  MoveRight,
  BarChart3,
  Calendar,
  Users,
  FilePlus,
  Bell,
  Settings,
  User,
} from "lucide-react";
import { Link } from "react-router-dom";
import "../assets/css/instructor_dashboard.css";

const InstructorDashboard = () => {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  // Actualiza fecha y hora cada segundo
  useEffect(() => {
    const timer = setInterval(() => setCurrentDateTime(new Date()), 1000);
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

  // Nombre de usuario ficticio (puedes reemplazarlo con prop o contexto real)
  const username = "Gustavo Berton";

  return (
    <>
      <header
        style={{
          padding: "1.5rem 2rem",
          background: "rgba(0,0,0,0.2)",
          color: "white",
          fontWeight: "700",
          fontSize: "1.8rem",
          fontFamily: "Poppins, sans-serif",
          textAlign: "center",
          userSelect: "none",
        }}
      >
        Instructor Dashboard
      </header>

      <div className="dashboard-container">
        <aside className="sidebar">
          {/* Sección usuario */}
            <div
                style={{
                    marginBottom: "2rem",
                    borderBottom: "1px solid rgba(255 255 255 / 0.2)",
                    paddingBottom: "1.5rem",
                }}
            >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.8rem",
                marginBottom: "0.6rem",
              }}
            >
              <User color="white" size={24} />
              <span style={{ fontWeight: "600", fontSize: "1.1rem" }}>
                {username}
              </span>
            </div>
            <div
              style={{
                fontSize: "0.9rem",
                color: "rgba(255 255 255 / 0.75)",
                marginBottom: "0.8rem",
                userSelect: "text",
              }}
            >
              {formattedDateTime}
            </div>
            <Link to="/perfil">
              <Button variant="ghost">
                <FilePlus className="icon" /> Ir a mi perfil
              </Button>
            </Link>     
          </div>

          {/* Botones habituales */}
          <Button variant="ghost">
            <FilePlus className="icon" /> Nuevo Curso
          </Button>
          <Button variant="ghost">
            <Bell className="icon" /> Notificaciones
          </Button>
          <Button variant="ghost">
            <Settings className="icon" /> Configuración
          </Button>
        </aside>

        <main className="grid-layout">
          <Card className="card featured-widget highlight">
            <CardContent>
              <h2>⏰ Próximo Curso</h2>
              <p>Seguridad Vial - 19/07 a las 10:00</p>

              <a href="http://localhost:5173/acs-instructor" target="_blank" rel="noopener noreferrer">
                  <Button variant="default" className="mt-4">
                    Iniciar Sala <MoveRight className="icon" />
                  </Button>
              </a>
            </CardContent>
          </Card>

          <Card className="card widget calendar">
            <CardContent>
              <h3>
                <Calendar className="icon" /> Próximos Cursos
              </h3>
              <ul>
                <li>🚗 Manejo Defensivo - 20/07</li>
                <li>🚲 Educación Ciclista - 21/07</li>
              </ul>
              <Link to="/cursos" className="text-link">
                Ver todos
              </Link>
            </CardContent>
          </Card>

          <Card className="card widget alumnos">
            <CardContent>
              <h3>
                <Users className="icon" /> Gestión de Alumnos
              </h3>
              <p>12 inscripciones pendientes</p>
              <Button variant="secondary" className="mt-2">
                Revisar
              </Button>
            </CardContent>
          </Card>

          <Card className="card widget crear-curso">
            <CardContent>
              <h3>
                <FilePlus className="icon" /> Crear Nuevo Curso
              </h3>
              <Link to="/salas" className="text-link">
                  <Button variant="default" className="mt-4">
                    Nuevo Curso
                  </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="card widget analiticas">
            <CardContent>
              <h3>
                <BarChart3 className="icon" /> Reportes
              </h3>
              <p>📊 Asistencia promedio: 92%</p>
              <Link to="/reportes" className="text-link">
                Ver reportes
              </Link>
            </CardContent>
          </Card>

          <Card className="card widget contenidos">
            <CardContent>
              <h3>📚 Gestión de Contenidos</h3>
              <p>35 documentos cargados</p>
              <Button variant="outline" className="mt-2">
                Abrir Biblioteca
              </Button>
            </CardContent>
          </Card>

          <Card className="card widget mensajes">
            <CardContent>
              <h3>
                <Bell className="icon" /> Notificaciones
              </h3>
              <ul className="notificaciones-lista">
                <li>📥 Nueva inscripción: Juan Pérez</li>
                <li>📨 Pregunta sobre curso</li>
              </ul>
            </CardContent>
          </Card>
        </main>
      </div>
    </>
  );
};

export default InstructorDashboard;
