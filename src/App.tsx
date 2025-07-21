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

import CrearSalaForm from "./components/crear-sala-form"

// export default function Home() {
//   return <CrearSalaForm />
// }

import './App.css';

function App() {
  return (
    // ¡Usar BrowserRouter en lugar de Router!
    <BrowserRouter>
      <Routes>
        
        <Route path="/" element={<LoginForm />} />
        <Route path="/validacodigo" element={<ValidarCodigo />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/usuarios/:id" element={<UsuariosDashboard />} />
        <Route path="/InstructorDashboard/:id" element={<InstructorDashboard />} />
        <Route path="/perfil" element={<MiPerfil />} />
        <Route path="/salas" element={<CrearSalaForm />} />
        {/* Ruta por defecto si ninguna coincide */}
        {/* <Route path="*" element={<h2>404 - Página no encontrada</h2>} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;

