import React, { useState, useEffect } from 'react';
import { BrainCircuit, FileUp, Sparkles, Settings, ClipboardCheck, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';

interface Capacitacion {
    id: number;
    titulo: string;
}

const AIExamDesigner: React.FC = () => {
    const [capacitaciones, setCapacitaciones] = useState<Capacitacion[]>([]);
    const [loading, setLoading] = useState(true);
    const [generating, setGenerating] = useState(false);
    const [status, setStatus] = useState<{ type: 'success' | 'error', message: string } | null>(null);

    // Form state
    const [config, setConfig] = useState({
        id_capacitacion: '',
        temas: '',
        cantidad_preguntas: 10,
        nota_minima: 60,
        intentos_maximos: 5
    });
    const [file, setFile] = useState<File | null>(null);

    useEffect(() => {
        // En un escenario real, esto vendría de un endpoint real de capacitaciones
        // Por ahora simulamos o intentamos pegarle al admin_crud si existe
        fetch('http://localhost:8000/lms/asistencia-automatica/1') // Solo para probar conectividad
            .then(() => {
                // Mock de capacitaciones para la demo si el endpoint real no está listo
                setCapacitaciones([
                    { id: 1, titulo: 'Introducción a Clivox v2' },
                    { id: 2, titulo: 'Seguridad Vial Avanzada' },
                    { id: 3, titulo: 'Primeros Auxilios' }
                ]);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    const handleGenerate = async () => {
        if (!config.id_capacitacion || !config.temas) {
            setStatus({ type: 'error', message: 'Por favor complete todos los campos obligatorios.' });
            return;
        }

        setGenerating(true);
        setStatus(null);

        try {
            // 1. Configurar
            const formData = new FormData();
            formData.append('id_capacitacion', config.id_capacitacion);
            formData.append('temas', config.temas);
            formData.append('cantidad_preguntas', config.cantidad_preguntas.toString());
            formData.append('nota_minima', config.nota_minima.toString());
            formData.append('intentos_maximos', config.intentos_maximos.toString());
            if (file) formData.append('archivo', file);

            const resConfig = await fetch('http://localhost:8000/lms/examen/ia/configurar', {
                method: 'POST',
                body: formData
            });

            if (!resConfig.ok) throw new Error('Error al guardar la configuración');
            const dataConfig = await resConfig.json();
            const idDefinicion = dataConfig.id_definicion;

            // 2. Generar Pool con IA
            const resGen = await fetch(`http://localhost:8000/lms/examen/ia/generar-pool/${idDefinicion}`);
            if (!resGen.ok) throw new Error('Error al generar preguntas con IA');

            setStatus({ type: 'success', message: '¡Examen generado exitosamente! La IA ha creado el pool de preguntas.' });
        } catch (err: any) {
            setStatus({ type: 'error', message: err.message || 'Error en el proceso de generación.' });
        } finally {
            setGenerating(false);
        }
    };

    return (
        <div className="p-8 min-h-screen bg-[#0f172a] text-white">
            <div className="max-w-4xl mx-auto">
                <div className="flex items-center gap-4 mb-8">
                    <div className="p-3 bg-indigo-500/20 rounded-2xl">
                        <BrainCircuit className="text-indigo-400" size={32} />
                    </div>
                    <div>
                        <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                            Diseñador de Exámenes IA
                        </h1>
                        <p className="text-slate-400 mt-1">Genera evaluaciones inteligentes y únicas para tus alumnos.</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Panel de Configuración */}
                    <Card className="lg:col-span-2 bg-slate-900/50 border-slate-800 backdrop-blur-xl">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-xl">
                                <Settings className="text-indigo-400" size={20} />
                                Parámetros de Evaluación
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-slate-400">Capacitación Vinculada</label>
                                    <select
                                        value={config.id_capacitacion}
                                        onChange={(e) => setConfig({ ...config, id_capacitacion: e.target.value })}
                                        className="w-full bg-slate-800 border-slate-700 text-white rounded-xl p-3 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                                    >
                                        <option value="">Seleccionar curso...</option>
                                        {capacitaciones.map(cap => (
                                            <option key={cap.id} value={cap.id}>{cap.titulo}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-slate-400">Cantidad de Preguntas</label>
                                    <Input
                                        type="number"
                                        value={config.cantidad_preguntas}
                                        onChange={(e) => setConfig({ ...config, cantidad_preguntas: parseInt(e.target.value) })}
                                        className="bg-slate-800 border-slate-700 rounded-xl"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-400">Temas y Objetivos (IA Prompt)</label>
                                <textarea
                                    value={config.temas}
                                    onChange={(e) => setConfig({ ...config, temas: e.target.value })}
                                    placeholder="Ej: Ley de tránsito 24.449, señales preventivas, prioridades de paso..."
                                    className="w-full bg-slate-800 border-slate-700 text-white rounded-xl p-3 h-32 focus:ring-2 focus:ring-indigo-500 outline-none transition-all resize-none"
                                />
                                <p className="text-xs text-slate-500 italic">Describe los temas principales. La IA generará preguntas basadas en esta descripción.</p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-slate-400">Nota Mínima (%)</label>
                                    <Input
                                        type="number"
                                        value={config.nota_minima}
                                        onChange={(e) => setConfig({ ...config, nota_minima: parseInt(e.target.value) })}
                                        className="bg-slate-800 border-slate-700 rounded-xl"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-slate-400">Máximo de Intentos</label>
                                    <Input
                                        type="number"
                                        value={config.intentos_maximos}
                                        onChange={(e) => setConfig({ ...config, intentos_maximos: parseInt(e.target.value) })}
                                        className="bg-slate-800 border-slate-700 rounded-xl"
                                    />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Panel de Resguardo y Acción */}
                    <div className="space-y-6">
                        <Card className="bg-slate-900/50 border-slate-800 backdrop-blur-xl">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2 text-lg">
                                    <FileUp className="text-emerald-400" size={18} />
                                    Documento de Resguardo
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div
                                    className={`border-2 border-dashed rounded-2xl p-6 text-center transition-all ${file ? 'border-emerald-500/50 bg-emerald-500/5' : 'border-slate-800 hover:border-slate-700'
                                        }`}
                                >
                                    <input
                                        type="file"
                                        id="file-upload"
                                        className="hidden"
                                        onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
                                    />
                                    <label htmlFor="file-upload" className="cursor-pointer block">
                                        {file ? (
                                            <div className="flex flex-col items-center">
                                                <ClipboardCheck className="text-emerald-400 mb-2" size={32} />
                                                <span className="text-sm text-emerald-100 font-medium truncate w-full">{file.name}</span>
                                            </div>
                                        ) : (
                                            <div className="flex flex-col items-center">
                                                <FileUp className="text-slate-600 mb-2" size={32} />
                                                <span className="text-sm text-slate-500">Subir PDF o Documento de referencia</span>
                                            </div>
                                        )}
                                    </label>
                                </div>
                                <p className="text-xs text-slate-500">Este archivo se almacenará como respaldo y servirá como fuente para la IA.</p>
                            </CardContent>
                        </Card>

                        <Button
                            disabled={generating}
                            onClick={handleGenerate}
                            className={`w-full py-8 rounded-2xl text-lg font-bold transition-all shadow-lg ${generating
                                    ? 'bg-slate-800 cursor-not-allowed'
                                    : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:scale-[1.02] active:scale-[0.98] shadow-indigo-500/20'
                                }`}
                        >
                            {generating ? (
                                <div className="flex items-center gap-3">
                                    <Loader2 className="animate-spin" />
                                    Generando Cuestionario...
                                </div>
                            ) : (
                                <div className="flex items-center gap-3">
                                    <Sparkles size={24} />
                                    INICIAR GENERACIÓN IA
                                </div>
                            )}
                        </Button>

                        {status && (
                            <div className={`p-4 rounded-xl flex gap-3 animate-in fade-in slide-in-from-top-4 duration-300 ${status.type === 'success' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'
                                }`}>
                                {status.type === 'success' ? <CheckCircle2 className="shrink-0" /> : <AlertCircle className="shrink-0" />}
                                <span className="text-sm">{status.message}</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AIExamDesigner;
