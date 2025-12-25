"use client";

import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle, DollarSign, Calendar, Clock, Users, Info } from "lucide-react";
import { useToast } from "@/components/ui/use-toast"; // Asumo que tienes un sistema de toasts

interface SalaPendiente {
  id: number;
  nombre: string;
  descripcion: string;
  fecha_inicio: string;
  hora_inicio: string;
  duracion_estimada: number;
  capacidad_maxima: number;
  group_call_id: string | null;
  requiere_aprobacion: boolean;
  permitir_chat: boolean;
  permitir_grabacion: boolean;
  permitir_compartir_pantalla: boolean;
  modo_espera: boolean;
  configuracion: string | null;
}

// Define un costo unitario por minuto por participante para el cálculo del costo_estimado
const COSTO_UNITARIO_POR_MINUTO_POR_PARTICIPANTE = 0.004; // Por ejemplo, 0.05 USD por minuto por participante

export default function SalasPendientes() {
  const [salas, setSalas] = useState<SalaPendiente[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    fetchSalasPendientes();
  }, []);

  const fetchSalasPendientes = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("http://localhost:8000/api/salas_pendientes"); // Llama a tu nuevo endpoint de backend
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data: SalaPendiente[] = await response.json();
      setSalas(data);
    } catch (e: any) {
      setError(e.message);
      toast({
        title: "Error al cargar salas",
        description: `No se pudieron cargar las salas pendientes: ${e.message}`,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAprobarSala = async (sala: SalaPendiente) => {
    try {
      // Prepara los datos para enviar a la API de crear_sala_acs
      const salaDataParaACS = {
        nombre: sala.nombre,
        descripcion: sala.descripcion,
        fechaInicio: sala.fecha_inicio,
        horaInicio: sala.hora_inicio,
        duracionEstimada: sala.duracion_estimada,
        capacidadMaxima: sala.capacidad_maxima,
        configuracion: sala.configuracion || "{}", // Asegúrate de enviar un string JSON
        permitirChat: sala.permitir_chat,
        permitirCompartirPantalla: sala.permitir_compartir_pantalla,
        permitirGrabacion: sala.permitir_grabacion,
        modoEspera: sala.modo_espera,
        requiereAprobacion: sala.requiere_aprobacion,
        participantes: [], // No se especifica cómo obtener participantes aquí, se envía vacío
      };

      const response = await fetch("/api/crear_sala_acs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(salaDataParaACS),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "Error desconocido al generar la sala en Azure.");
      }

      const result = await response.json();
      toast({
        title: "Sala Aprobada y Creada en Azure",
        description: `La sala "${sala.nombre}" ha sido creada con Room ID: ${result.roomId}`,
        variant: "success",
      });
      // Opcional: Recargar la lista para que la sala aprobada desaparezca
      fetchSalasPendientes();
    } catch (e: any) {
      toast({
        title: "Error al Aprobar Sala",
        description: `No se pudo crear la sala "${sala.nombre}" en Azure: ${e.message}`,
        variant: "destructive",
      });
    }
  };

  const handleDesaprobarSala = (sala: SalaPendiente) => {
    // Aquí puedes implementar la lógica para "desaprobar" la sala,
    // como actualizar su estado en la base de datos o simplemente removerla de la vista.
    // Por ahora, solo se mostrará una notificación.
    toast({
      title: "Sala Desaprobada",
      description: `La sala "${sala.nombre}" ha sido marcada como desaprobada.`,
      variant: "default",
    });
    // Si necesitas persistir esto en DB, tendrías que llamar a otro endpoint de backend
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-40">
        <p>Cargando salas pendientes...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-600 p-4">
        <p>Error: {error}</p>
        <Button onClick={fetchSalasPendientes} className="mt-2">Reintentar</Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">Salas Pendientes de Aprobación</h2>
      {salas.length === 0 ? (
        <p className="text-center text-gray-600">No hay salas pendientes para mostrar.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {salas.map((sala) => {
            const costoEstimado =
              sala.duracion_estimada * COSTO_UNITARIO_POR_MINUTO_POR_PARTICIPANTE * sala.capacidad_maxima;

            return (
              <Card key={sala.id} className="shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-t-lg p-4">
                  <CardTitle className="text-xl flex items-center gap-2">
                    <Info className="w-5 h-5" />
                    {sala.nombre}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 space-y-3">
                  <p className="text-sm text-gray-700 leading-relaxed mb-2">
                    **Descripción:** {sala.descripcion || "No hay descripción disponible."}
                  </p>
                  <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4 text-gray-500" />
                      <span>**Fecha:** {sala.fecha_inicio}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4 text-gray-500" />
                      <span>**Hora:** {sala.hora_inicio}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4 text-gray-500" />
                      <span>**Capacidad:** {sala.capacidad_maxima}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4 text-gray-500" />
                      <span>**Duración:** {sala.duracion_estimada} min</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
                    <Badge variant="secondary" className="bg-green-100 text-green-800 flex items-center gap-1">
                      <DollarSign className="w-4 h-4" />
                      Costo Estimado: ${costoEstimado.toFixed(2)}
                    </Badge>
                  </div>
                  <div className="flex justify-around gap-2 mt-4">
                    <Button
                      className="bg-green-600 hover:bg-green-700 text-white flex-1"
                      onClick={() => handleAprobarSala(sala)}
                    >
                      <CheckCircle className="w-4 h-4 mr-2" /> Aprobar
                    </Button>
                    <Button
                      className="bg-red-600 hover:bg-red-700 text-white flex-1"
                      onClick={() => handleDesaprobarSala(sala)}
                    >
                      <XCircle className="w-4 h-4 mr-2" /> Desaprobar
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}