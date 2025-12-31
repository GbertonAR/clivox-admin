// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import { useState } from 'react';
// import LoginForm from "./components/Login";
// import ValidarCodigo from "./components/validacodigo";
// import './App.css';

// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<LoginForm />} />
//         <Route path="/validar-codigo" element={<ValidarCodigo />} />
//               {/* Ruta por defecto si ninguna coincide */}
//         {/* <Route path="*" element={<h2>404 - Página no encontrada</h2>} /> */}
//       </Routes>
//     </Router>
//   );
// }

// export default App;

import { BrowserRouter, Routes, Route } from "react-router-dom"; // Eliminado 'Router' de la importación
import LoginForm from "./components/Login";
import ValidarCodigo from "./components/validacodigo";
import Dashboard from "./components/dashboard";
import UsuariosDashboard from "./components/usuarios_dashboard";
import InstructorDashboard from "./components/InstructorDashboard";
import MiPerfil from "./components/MiPerfil";
import VerSalas from "./components/SalasPendientes";
import CrearSalaForm from "./components/crear-sala-form"
import Organizaciones from "./components/Organizaciones";
import AIExamDesigner from "./components/AIExamDesigner";
import CourseManagement from "./pages/CourseManagement";

// export default function Home() {
//   return <CrearSalaForm />
// }

// import './App.css';

function App() {
  return (
    // ¡Usar BrowserRouter en lugar de Router!
    // <div className="p-4">
    //   <h1 className="text-3xl font-bold text-red-600">Clivox Admin 🚀</h1>
    //   <h1 className="text-red-600">Rojo correcto</h1>
    //   <p className="text-green-600">Verde correcto</p>
    //     <div className="p-6 space-y-4">
    //       <h1 className="text-red-600 text-3xl font-bold">Texto rojo</h1>
    //       <h1 className="text-blue-600 text-3xl font-bold">Texto azul</h1>
    //       <h1 className="text-foreground text-3xl font-bold">Texto foreground</h1>
    //       <h1 className="text-primary text-3xl font-bold">Texto primary</h1>
    //     </div>
    // {/* Acá va el resto del dashboard */}

    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/validacodigo" element={<ValidarCodigo />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/usuarios/:id" element={<UsuariosDashboard />} />
        <Route path="/InstructorDashboard/:id" element={<InstructorDashboard />} />
        <Route path="/perfil" element={<MiPerfil />} />
        <Route path="/salas" element={<CrearSalaForm />} />
        <Route path="/salas-pendientes" element={<VerSalas />} />
        <Route path="/organizaciones" element={<Organizaciones />} />
        <Route path="/examen-ia" element={<AIExamDesigner />} />
        <Route path="/gestion-cursos" element={<CourseManagement />} />
        {/* Otras rutas del dashboard */}
        {/* <Route path="/crear-sala" element={<CrearSalaForm />} /> */}

        {/* Ruta por defecto si ninguna coincide */}
        {/* <Route path="*" element={<h2>404 - Página no encontrada</h2>} /> */}
        {/* Ruta por defecto si ninguna coincide */}
        {/* <Route path="*" element={<h2>404 - Página no encontrada</h2>} /> */}
      </Routes>
    </BrowserRouter>
    // </div>
  );
}

export default App;

