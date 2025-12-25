import React, { useState, useEffect } from 'react';
import { Building2, Plus, LayoutGrid, List as ListIcon, Settings2 } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';

interface Organizacion {
    id?: number;
    nombre: string;
    tipo: string;
    logo_url?: string;
}

const Organizaciones: React.FC = () => {
    const [organizaciones, setOrganizaciones] = useState<Organizacion[]>([]);
    const [loading, setLoading] = useState(true);
    const [showAddModal, setShowAddModal] = useState(false);
    const [newOrg, setNewOrg] = useState<Organizacion>({ nombre: '', tipo: 'Empresa' });

    useEffect(() => {
        fetch('http://localhost:8000/organizaciones/')
            .then(res => res.json())
            .then(data => {
                setOrganizaciones(data);
                setLoading(false);
            });
    }, []);

    const handleCreate = async () => {
        const res = await fetch('http://localhost:8000/organizaciones/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newOrg)
        });
        if (res.ok) {
            const created = await res.json();
            setOrganizaciones([...organizaciones, created]);
            setShowAddModal(false);
            setNewOrg({ nombre: '', tipo: 'Empresa' });
        }
    };

    return (
        <div className="p-8 min-h-screen bg-[#0f172a] text-white">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
                        Gestión de Organizaciones
                    </h1>
                    <p className="text-slate-400 mt-2">Administra tus empresas, colegios y academias aliadas.</p>
                </div>
                <Button
                    onClick={() => setShowAddModal(true)}
                    className="bg-blue-600 hover:bg-blue-500 text-white rounded-xl px-6 py-6 flex gap-2 transition-all hover:scale-105"
                >
                    <Plus size={20} />
                    Nueva Organización
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {loading ? (
                    <div className="col-span-full text-center py-20 animate-pulse text-slate-500">
                        Cargando red de organizaciones...
                    </div>
                ) : organizaciones.map(org => (
                    <Card key={org.id} className="bg-slate-900/50 border-slate-800 backdrop-blur-xl hover:border-blue-500/50 transition-all group">
                        <CardHeader className="flex flex-row items-center gap-4">
                            <div className="p-3 bg-blue-500/10 rounded-2xl group-hover:bg-blue-500/20 transition-colors">
                                <Building2 className="text-blue-400" />
                            </div>
                            <div className="flex-1">
                                <CardTitle className="text-xl text-slate-100">{org.nombre}</CardTitle>
                                <span className="text-xs font-mono text-blue-400 uppercase tracking-widest">{org.tipo}</span>
                            </div>
                            <Button variant="ghost" size="icon" className="text-slate-500 hover:text-white">
                                <Settings2 size={18} />
                            </Button>
                        </CardHeader>
                        <CardContent>
                            <div className="flex justify-between items-center mt-4 pt-4 border-t border-slate-800">
                                <div className="text-sm text-slate-400">
                                    <span className="block text-white font-semibold">0 Cursos</span>
                                    Activos actualmente
                                </div>
                                <div className="h-2 w-24 bg-slate-800 rounded-full overflow-hidden">
                                    <div className="h-full bg-blue-500 w-1/3 shadow-[0_0_10px_#3b82f6]"></div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {showAddModal && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50">
                    <Card className="w-[450px] bg-slate-900 border-slate-800 shadow-2xl">
                        <CardHeader>
                            <CardTitle className="text-2xl">Registrar Organización</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-sm text-slate-400">Nombre de la Organización</label>
                                <Input
                                    value={newOrg.nombre}
                                    onChange={(e) => setNewOrg({ ...newOrg, nombre: e.target.value })}
                                    className="bg-slate-800 border-slate-700 text-white"
                                    placeholder="Ej: Academy Tech"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm text-slate-400">Tipo de Entorno</label>
                                <select
                                    value={newOrg.tipo}
                                    onChange={(e) => setNewOrg({ ...newOrg, tipo: e.target.value })}
                                    className="w-full bg-slate-800 border-slate-700 text-white rounded-md p-2"
                                >
                                    <option>Empresa</option>
                                    <option>Colegio</option>
                                    <option>Academia</option>
                                </select>
                            </div>
                            <div className="flex gap-3 mt-6">
                                <Button variant="ghost" className="flex-1 text-slate-400" onClick={() => setShowAddModal(false)}>Cancelar</Button>
                                <Button className="flex-1 bg-blue-600" onClick={handleCreate}>Guardar</Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            )}
        </div>
    );
};

export default Organizaciones;
