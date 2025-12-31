import { useNavigate } from 'react-router-dom';
import { Shield, BookOpen } from 'lucide-react';

const Dashboard = ({ nombre = 'Administrador' }) => {
  const navigate = useNavigate();

  return (
    <div className="p-10 bg-slate-50 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-slate-900 mb-2 font-sans">¡Bienvenido, {nombre}!</h1>
        <p className="text-slate-500 mb-10 text-lg">Has accedido al Centro de Control de Clivox.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div
            onClick={() => navigate('/gestion-cursos')}
            className="bg-white p-8 rounded-[32px] border border-slate-200 shadow-sm hover:shadow-xl transition-all cursor-pointer group hover:-translate-y-1"
          >
            <div className="w-16 h-16 bg-indigo-100 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-indigo-600 transition-colors">
              <BookOpen className="text-indigo-600 group-hover:text-white" size={32} />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2 font-sans text-left">Gobernanza de Cursos</h2>
            <p className="text-slate-500 text-left">Administra ciclos, autoriza contenidos y configura biometría.</p>
          </div>

          <div
            onClick={() => navigate('/organizaciones')}
            className="bg-white p-8 rounded-[32px] border border-slate-200 shadow-sm hover:shadow-xl transition-all cursor-pointer group hover:-translate-y-1"
          >
            <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-emerald-600 transition-colors">
              <Shield className="text-emerald-600 group-hover:text-white" size={32} />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2 font-sans text-left">Seguridad y Roles</h2>
            <p className="text-slate-500 text-left">Controla el acceso y jerarquías de la plataforma.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
