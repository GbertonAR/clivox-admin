import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Book, Shield, Users, Clock, DollarSign, Layout, ArrowRight, Zap, ArrowLeft, Save, Rocket, GraduationCap, FileCheck } from 'lucide-react';
import { Button, Input } from "../components/ui";

const CourseManagement: React.FC = () => {
    const [courses, setCourses] = useState<any[]>([]);
    const [selectedCourse, setSelectedCourse] = useState<any | null>(null);
    const [view, setView] = useState<'list' | 'manage'>('list');
    const [showCreateModal, setShowCreateModal] = useState(false);

    // Form state for editing/creating
    const [editForm, setEditForm] = useState({
        titulo: '',
        descripcion: '',
        costo: 0,
        modalidad: 'Asincronico',
        requires_biometria: false
    });

    const fetchCourses = async () => {
        setCourses([
            { id: 1, titulo: 'Licencia Nacional Clase B', estado: 'Active', modalidad: 'Sincronico', costo: 1200, requires_biometria: true, alumnos: 840, aprobados: 612, certificados: 580 },
            { id: 2, titulo: 'Seguridad Vial Avanzada', estado: 'Borrador', modalidad: 'Asincronico', costo: 800, requires_biometria: false, alumnos: 0, aprobados: 0, certificados: 0 },
        ]);
    };

    useEffect(() => {
        fetchCourses();
    }, []);

    const handleManage = (course: any) => {
        setSelectedCourse(course);
        setEditForm({
            titulo: course.titulo,
            descripcion: course.descripcion || '',
            costo: course.costo,
            modalidad: course.modalidad,
            requires_biometria: course.requires_biometria
        });
        setView('manage');
    };

    const handleSave = () => {
        // Mock save logic
        setCourses(prev => prev.map(c => c.id === selectedCourse.id ? { ...c, ...editForm } : c));
        setView('list');
    };

    const handlePublish = () => {
        setCourses(prev => prev.map(c => c.id === selectedCourse.id ? { ...c, estado: 'Active' } : c));
        setView('list');
    };

    if (view === 'manage' && selectedCourse) {
        const isActive = selectedCourse.estado === 'Active';
        return (
            <div className="min-h-screen bg-[#0a0a1a] text-white p-8 font-sans">
                <div className="max-w-6xl mx-auto">
                    <button onClick={() => setView('list')} className="flex items-center gap-2 text-slate-400 hover:text-white mb-8 transition-colors">
                        <ArrowLeft size={20} /> Volver al listado
                    </button>

                    <div className="flex justify-between items-start mb-12">
                        <div>
                            <div className="flex items-center gap-3 mb-2">
                                <h1 className="text-4xl font-bold">{selectedCourse.titulo}</h1>
                                <span className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest ${isActive ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                                    }`}>
                                    {isActive ? 'Activo' : 'Borrador'}
                                </span>
                            </div>
                            <p className="text-slate-400 font-mono italic">ID: {selectedCourse.id} — Configuración de Ciclo</p>
                        </div>
                        {!isActive && (
                            <Button onClick={handlePublish} className="bg-indigo-600 hover:bg-indigo-500 text-white rounded-2xl px-8 py-6 h-auto font-bold uppercase tracking-widest shadow-[0_0_30px_rgba(79,70,229,0.4)]">
                                <Rocket size={20} className="mr-2" /> Publicar Curso
                            </Button>
                        )}
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Panel de Control Lateral */}
                        <div className="lg:col-span-1 space-y-6">
                            <div className="bg-slate-900/50 border border-white/5 p-8 rounded-[32px] backdrop-blur-xl">
                                <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                                    <Shield size={20} className="text-indigo-400" /> Atributos Críticos
                                </h3>

                                <div className="space-y-6">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Modalidad de Dictado</label>
                                        <select
                                            disabled={isActive}
                                            value={editForm.modalidad}
                                            onChange={e => setEditForm({ ...editForm, modalidad: e.target.value })}
                                            className="w-full bg-white/5 border border-white/10 text-white rounded-2xl p-4 h-14 disabled:opacity-50"
                                        >
                                            <option value="Sincronico">Sincrónico (En Vivo)</option>
                                            <option value="Asincronico">Asincrónico (Grabado)</option>
                                        </select>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Costo de Inscripción (USD)</label>
                                        <Input
                                            disabled={isActive}
                                            type="number"
                                            value={editForm.costo}
                                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEditForm({ ...editForm, costo: Number(e.target.value) })}
                                            className="bg-white/5 border-white/10 rounded-2xl p-4 h-14 disabled:opacity-50"
                                        />
                                    </div>

                                    <div className="flex items-center justify-between p-5 bg-white/5 rounded-2xl border border-white/10">
                                        <div className="flex items-center gap-3">
                                            <Zap size={18} className={editForm.requires_biometria ? "text-cyan-400" : "text-slate-600"} />
                                            <div>
                                                <p className="font-bold text-sm">Biometría</p>
                                                <p className="text-[10px] text-slate-500 uppercase">Proctoring AI</p>
                                            </div>
                                        </div>
                                        {!isActive ? (
                                            <button
                                                onClick={() => setEditForm({ ...editForm, requires_biometria: !editForm.requires_biometria })}
                                                className={`w-12 h-6 rounded-full transition-all relative ${editForm.requires_biometria ? 'bg-cyan-600' : 'bg-slate-700'}`}
                                            >
                                                <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${editForm.requires_biometria ? 'right-1' : 'left-1'}`} />
                                            </button>
                                        ) : (
                                            <span className="text-xs font-bold text-cyan-400">ON</span>
                                        )}
                                    </div>

                                    {!isActive && (
                                        <Button onClick={handleSave} className="w-full bg-white/5 hover:bg-white/10 border border-white/10 py-8 text-white rounded-2xl font-bold tracking-widest mt-4">
                                            <Save size={20} className="mr-2" /> GUARDAR CAMBIOS
                                        </Button>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Panel de Datos / Feedback */}
                        <div className="lg:col-span-2 space-y-8">
                            {isActive ? (
                                <>
                                    <div className="grid grid-cols-3 gap-6">
                                        {[
                                            { label: 'Inscriptos', val: selectedCourse.alumnos, icon: Users, color: 'text-indigo-400' },
                                            { label: 'Exámenes OK', val: selectedCourse.aprobados, icon: GraduationCap, color: 'text-emerald-400' },
                                            { label: 'Certificados', val: selectedCourse.certificados, icon: FileCheck, color: 'text-cyan-400' },
                                        ].map((s, i) => (
                                            <div key={i} className="bg-slate-900/40 border border-white/5 p-6 rounded-3xl">
                                                <div className={`p-3 rounded-2xl bg-white/5 w-fit mb-4 ${s.color}`}>
                                                    <s.icon size={20} />
                                                </div>
                                                <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">{s.label}</p>
                                                <h3 className="text-2xl font-bold mt-1">{s.val}</h3>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="bg-slate-900/40 border border-white/5 p-8 rounded-[40px]">
                                        <div className="flex justify-between items-center mb-8">
                                            <h3 className="text-2xl font-bold">Listado de Estudiantes</h3>
                                            <Button variant="outline" className="border-white/10 bg-transparent text-slate-400 hover:text-white">Ver Todos</Button>
                                        </div>
                                        <div className="space-y-4">
                                            {[
                                                { nombre: 'Gustavo Berton', fecha: '28 Dec, 2025', status: 'Aprobado', progress: 100 },
                                                { nombre: 'Ana Lynch', fecha: '30 Dec, 2025', status: 'En Proceso', progress: 45 },
                                                { nombre: 'Marcos Ruiz', fecha: '31 Dec, 2025', status: 'Inscripto', progress: 0 },
                                            ].map((u, i) => (
                                                <div key={i} className="flex items-center justify-between p-5 bg-white/5 rounded-2xl border border-white/5 group hover:border-white/10 transition-all cursor-pointer">
                                                    <div className="flex items-center gap-4">
                                                        <div className="w-12 h-12 bg-indigo-500/20 rounded-xl flex items-center justify-center font-bold text-indigo-400 uppercase">
                                                            {u.nombre.charAt(0)}
                                                        </div>
                                                        <div>
                                                            <p className="font-bold">{u.nombre}</p>
                                                            <p className="text-xs text-slate-500">{u.fecha}</p>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center gap-8 text-right">
                                                        <div>
                                                            <p className="text-[10px] font-bold text-slate-500 uppercase mb-1">PROGRESO</p>
                                                            <div className="w-32 h-1.5 bg-white/5 rounded-full overflow-hidden">
                                                                <div className="h-full bg-indigo-500" style={{ width: `${u.progress}%` }} />
                                                            </div>
                                                        </div>
                                                        <span className={`text-xs font-bold uppercase tracking-widest ${u.status === 'Aprobado' ? 'text-emerald-400' : 'text-amber-400'
                                                            }`}>{u.status}</span>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <div className="bg-slate-900/40 border border-dashed border-white/20 p-20 rounded-[40px] flex flex-col items-center justify-center text-center">
                                    <div className="p-6 bg-white/5 rounded-full mb-6">
                                        <Rocket size={48} className="text-indigo-500 animate-pulse" />
                                    </div>
                                    <h3 className="text-3xl font-bold mb-4">El curso está en modo diseño</h3>
                                    <p className="text-slate-400 max-w-md mx-auto">
                                        Puedes editar toda la configuración crítica del ciclo mientras esté en borrador.
                                        Una vez publicado, el costo y la modalidad quedarán fijados para asegurar la consistencia de los alumnos inscriptos.
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#0a0a1a] text-white p-8 font-sans">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-12">
                    <div>
                        <h1 className="text-4xl font-bold">Gobernanza de Cursos</h1>
                        <p className="text-slate-400 mt-2 italic font-mono">Panel de Control Administrativo</p>
                    </div>
                    <Button
                        onClick={() => setShowCreateModal(true)}
                        className="bg-indigo-600 hover:bg-indigo-500 text-white rounded-2xl px-6 py-6"
                    >
                        <Plus size={24} className="mr-2" />
                        <span className="font-bold uppercase tracking-wider">Nuevo Curso</span>
                    </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
                    {[
                        { label: 'Cursos Activos', val: courses.filter(c => c.estado === 'Active').length, icon: Book, color: 'text-emerald-400' },
                        { label: 'Pendientes', val: courses.filter(c => c.estado === 'Borrador').length, icon: Clock, color: 'text-amber-400' },
                        { label: 'Ingresos Totales', val: '$45.2k', icon: DollarSign, color: 'text-indigo-400' },
                        { label: 'Alumnos LNC', val: '1,240', icon: Users, color: 'text-purple-400' },
                    ].map((stat, i) => (
                        <div
                            key={i}
                            className="bg-slate-900/50 border border-white/5 p-6 rounded-3xl backdrop-blur-xl"
                        >
                            <div className={`p-3 rounded-2xl bg-white/5 w-fit mb-4 ${stat.color}`}>
                                <stat.icon size={24} />
                            </div>
                            <p className="text-slate-400 text-sm font-medium">{stat.label}</p>
                            <h3 className="text-3xl font-bold mt-1">{stat.val}</h3>
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {courses.map((course) => (
                        <div
                            key={course.id}
                            className="bg-slate-900/40 border border-white/10 rounded-3xl p-8 relative overflow-hidden group hover:border-indigo-500/50 transition-all"
                        >
                            <div className="absolute top-0 right-0 p-6">
                                <span className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest ${course.estado === 'Active' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-slate-500/20 text-slate-400 border border-slate-500/30'
                                    }`}>
                                    {course.estado}
                                </span>
                            </div>

                            <h2 className="text-2xl font-bold mb-4">{course.titulo}</h2>

                            <div className="flex gap-6 mb-8 text-slate-400 text-sm font-medium">
                                <div className="flex items-center gap-2">
                                    <Layout size={16} />
                                    {course.modalidad}
                                </div>
                                <div className="flex items-center gap-2">
                                    <Zap size={16} className="text-amber-400" />
                                    {course.requires_biometria ? 'Biometría ON' : 'Biometría OFF'}
                                </div>
                                <div className="flex items-center gap-2">
                                    <DollarSign size={16} className="text-emerald-400" />
                                    ${course.costo}
                                </div>
                            </div>

                            <div className="flex items-center justify-between">
                                <Button
                                    onClick={() => handleManage(course)}
                                    className="bg-white/5 hover:bg-white/10 text-white rounded-2xl border border-white/10 group-hover:bg-indigo-600 group-hover:border-indigo-500 transition-all px-8"
                                >
                                    Gestionar <ArrowRight size={18} className="ml-2" />
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <AnimatePresence>
                {showCreateModal && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-xl p-4">
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="bg-slate-900 border border-indigo-500/30 rounded-[40px] p-10 max-w-2xl w-full"
                        >
                            {/* Modal de creación se mantiene igual por ahora */}
                            <h2 className="text-3xl font-bold mb-8">Nuevo Ciclo de Formación</h2>
                            {/* ... (resto del formulario de creación) */}
                            <div className="flex gap-4 pt-4">
                                <Button
                                    onClick={() => setShowCreateModal(false)}
                                    className="flex-1 bg-transparent border border-white/10 text-white py-8"
                                >
                                    CANCELAR
                                </Button>
                                <Button
                                    onClick={() => setShowCreateModal(false)}
                                    className="flex-1 bg-indigo-600 text-white py-8"
                                >
                                    REGISTRAR CURSO
                                </Button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default CourseManagement;

