import React from 'react';
// import '../assets/css/dashboard.css';

const Dashboard = ({ nombre = 'Administrador' }) => {
  return (
    <div className="dashboard-container">
      <h1 className="bienvenida">¡Bienvenido, {nombre}!</h1>
      <p className="texto-secundario">Estás conectado desde tu celular. Vamos a configurar tu perfil automáticamente.</p>
    </div>
  );
};

export default Dashboard;

