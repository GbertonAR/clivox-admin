// src/pages/InstructorDashboard.tsx

import React from 'react';
import { Card, CardContent } from "./ui/Card";
import { Button } from "./ui/Button";
import { MoveRight, BarChart3, Calendar, Users, FilePlus, Bell, Settings } from "lucide-react";
import { Link } from "react-router-dom";
import "../assets/css/instructor_dashboard.css";

const InstructorDashboard = () => {
  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <Button variant="ghost"><FilePlus className="icon" /> Nuevo Curso</Button>
        <Button variant="ghost"><Bell className="icon" /> Notificaciones</Button>
        <Button variant="ghost"><Settings className="icon" /> Configuración</Button>
      </aside>

      <main className="grid-layout">
        <Card className="featured-widget highlight">
          <CardContent>
            <h2>⏰ Próximo Curso</h2>
            <p>Seguridad Vial - 19/07 a las 10:00</p>
            <Button className="mt-4" variant="default">Iniciar Sala <MoveRight className="ml-2 h-4 w-4" /></Button>
          </CardContent>
        </Card>

        <Card className="widget calendar">
          <CardContent>
            <h3><Calendar className="icon" /> Próximos Cursos</h3>
            <ul>
              <li>🚗 Manejo Defensivo - 20/07</li>
              <li>🚲 Educación Ciclista - 21/07</li>
            </ul>
            <Link to="/cursos" className="text-link">Ver todos</Link>
          </CardContent>
        </Card>

        <Card className="widget alumnos">
          <CardContent>
            <h3><Users className="icon" /> Gestión de Alumnos</h3>
            <p>12 inscripciones pendientes</p>
            <Button variant="secondary" className="mt-2">Revisar</Button>
          </CardContent>
        </Card>

        <Card className="widget crear-curso">
          <CardContent>
            <h3><FilePlus className="icon" /> Crear Nuevo Curso</h3>
            <Button variant="default" className="mt-4">Nuevo Curso</Button>
          </CardContent>
        </Card>

        <Card className="widget analiticas">
          <CardContent>
            <h3><BarChart3 className="icon" /> Reportes</h3>
            <p>📊 Asistencia promedio: 92%</p>
            <Link to="/reportes" className="text-link">Ver reportes</Link>
          </CardContent>
        </Card>

        <Card className="widget contenidos">
          <CardContent>
            <h3>📚 Gestión de Contenidos</h3>
            <p>35 documentos cargados</p>
            <Button variant="outline" className="mt-2">Abrir Biblioteca</Button>
          </CardContent>
        </Card>

        <Card className="widget mensajes">
          <CardContent>
            <h3><Bell className="icon" /> Notificaciones</h3>
            <ul className="notificaciones-lista">
              <li>📥 Nueva inscripción: Juan Pérez</li>
              <li>📨 Pregunta sobre curso</li>
            </ul>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default InstructorDashboard;
