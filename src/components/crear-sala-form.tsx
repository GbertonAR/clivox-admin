"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "./ui/Button"
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/Card"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Textarea } from "./ui/textarea"
import { Badge } from "./ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { Video, Users, Calendar, Shield, Sparkles, Copy, RefreshCw, UserPlus, Crown, Mic, Eye, X } from "lucide-react"

import "../assets/css/instructor_dashboard.css"

interface Participante {
  id: string
  nombre: string
  email: string
  rol: "moderador" | "presentador" | "participante"
  avatar?: string
}

interface SalaData {
  nombre: string
  descripcion: string
  groupCallId: string
  fechaInicio: string
  horaInicio: string
  duracionEstimada: string
  capacidadMaxima: string
  requiereAprobacion: boolean
  participantes: Participante[]
  configuracion: {
    permitirChat: boolean
    permitirCompartirPantalla: boolean
    permitirGrabacion: boolean
    modoEspera: boolean
  }
}

export default function CrearSalaForm() {
  const [salaData, setSalaData] = useState<SalaData>({
    nombre: "",
    descripcion: "",
    groupCallId: generateUUID(),
    fechaInicio: "",
    horaInicio: "",
    duracionEstimada: "60",
    capacidadMaxima: "50",
    requiereAprobacion: false,
    participantes: [],
    configuracion: {
      permitirChat: true,
      permitirCompartirPantalla: true,
      permitirGrabacion: false,
      modoEspera: true,
    },
  })

  const [nuevoParticipante, setNuevoParticipante] = useState({
    nombre: "",
    email: "",
    rol: "participante" as const,
  })

  const [isGenerating, setIsGenerating] = useState(false)

  function generateUUID(): string {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
      const r = (Math.random() * 16) | 0
      const v = c == "x" ? r : (r & 0x3) | 0x8
      return v.toString(16)
    })
  }

  const regenerarGroupCallId = () => {
    setIsGenerating(true)
    setTimeout(() => {
      setSalaData((prev) => ({ ...prev, groupCallId: generateUUID() }))
      setIsGenerating(false)
    }, 500)
  }

  const copiarGroupCallId = () => {
    navigator.clipboard.writeText(salaData.groupCallId)
  }

  const agregarParticipante = () => {
    if (nuevoParticipante.nombre && nuevoParticipante.email) {
      const participante: Participante = {
        id: generateUUID(),
        ...nuevoParticipante,
      }
      setSalaData((prev) => ({
        ...prev,
        participantes: [...prev.participantes, participante],
      }))
      setNuevoParticipante({ nombre: "", email: "", rol: "participante" })
    }
  }

  const eliminarParticipante = (id: string) => {
    setSalaData((prev) => ({
      ...prev,
      participantes: prev.participantes.filter((p) => p.id !== id),
    }))
  }

  const getRolIcon = (rol: string) => {
    switch (rol) {
      case "moderador":
        return <Crown className="h-4 w-4" />
      case "presentador":
        return <Mic className="h-4 w-4" />
      default:
        return <Eye className="h-4 w-4" />
    }
  }

  const getRolColor = (rol: string) => {
    switch (rol) {
      case "moderador":
        return "bg-purple-100 text-purple-800 border-purple-200"
      case "presentador":
        return "bg-blue-100 text-blue-800 border-blue-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Datos de la sala:", salaData)
    // Aquí enviarías los datos al backend para crear la sala en Azure
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full mb-4">
            <Video className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">
            Crear Nueva Sala
          </h1>
          <p className="text-gray-600 text-lg">
            Configura tu espacio de videoconferencia con Azure Communication Services
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Información Básica */}
          <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
            <CardHeader className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-t-lg">
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="h-5 w-5" />
                Información Básica
              </CardTitle>
              <CardDescription className="text-indigo-100">
                Define los detalles principales de tu sala de conferencia
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="nombre" className="text-sm font-medium">
                    Nombre de la Sala
                  </Label>
                  <Input
                    id="nombre"
                    placeholder="Ej: Reunión de Equipo - Proyecto Alpha"
                    value={salaData.nombre}
                    onChange={(e) => setSalaData((prev) => ({ ...prev, nombre: e.target.value }))}
                    className="border-gray-200 focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="capacidad" className="text-sm font-medium">
                    Capacidad Máxima
                  </Label>
                  <Input
                    id="capacidad"
                    type="number"
                    placeholder="50"
                    value={salaData.capacidadMaxima}
                    onChange={(e) => setSalaData((prev) => ({ ...prev, capacidadMaxima: e.target.value }))}
                    className="border-gray-200 focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="descripcion" className="text-sm font-medium">
                  Descripción
                </Label>
                <Textarea
                  id="descripcion"
                  placeholder="Describe el propósito y agenda de la reunión..."
                  value={salaData.descripcion}
                  onChange={(e) => setSalaData((prev) => ({ ...prev, descripcion: e.target.value }))}
                  className="border-gray-200 focus:border-indigo-500 focus:ring-indigo-500 min-h-[100px]"
                />
              </div>

              {/* Group Call ID */}
              <div className="space-y-2">
                <Label className="text-sm font-medium">Group Call ID (Azure)</Label>
                <div className="flex items-center gap-2">
                  <Input
                    value={salaData.groupCallId}
                    readOnly
                    className="font-mono text-sm bg-gray-50 border-gray-200"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={copiarGroupCallId}
                    className="shrink-0 bg-transparent"
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={regenerarGroupCallId}
                    disabled={isGenerating}
                    className="shrink-0 bg-transparent"
                  >
                    <RefreshCw className={`h-4 w-4 ${isGenerating ? "animate-spin" : ""}`} />
                  </Button>
                </div>
                <p className="text-xs text-gray-500">
                  Este ID único será usado por Azure Communication Services para identificar la sala
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Programación */}
          <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
            <CardHeader className="bg-gradient-to-r from-green-500 to-teal-600 text-white rounded-t-lg">
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Programación
              </CardTitle>
              <CardDescription className="text-green-100">Establece cuándo se realizará la conferencia</CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="fecha" className="text-sm font-medium">
                    Fecha de Inicio
                  </Label>
                  <Input
                    id="fecha"
                    type="date"
                    value={salaData.fechaInicio}
                    onChange={(e) => setSalaData((prev) => ({ ...prev, fechaInicio: e.target.value }))}
                    className="border-gray-200 focus:border-green-500 focus:ring-green-500"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="hora" className="text-sm font-medium">
                    Hora de Inicio
                  </Label>
                  <Input
                    id="hora"
                    type="time"
                    value={salaData.horaInicio}
                    onChange={(e) => setSalaData((prev) => ({ ...prev, horaInicio: e.target.value }))}
                    className="border-gray-200 focus:border-green-500 focus:ring-green-500"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="duracion" className="text-sm font-medium">
                    Duración (minutos)
                  </Label>
                  <Input
                    id="duracion"
                    type="number"
                    placeholder="60"
                    value={salaData.duracionEstimada}
                    onChange={(e) => setSalaData((prev) => ({ ...prev, duracionEstimada: e.target.value }))}
                    className="border-gray-200 focus:border-green-500 focus:ring-green-500"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Participantes */}
          <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
            <CardHeader className="bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-t-lg">
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Gestión de Participantes
              </CardTitle>
              <CardDescription className="text-orange-100">Invita y asigna roles a los participantes</CardDescription>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              {/* Agregar Participante */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-3 p-4 bg-gray-50 rounded-lg">
                <Input
                  placeholder="Nombre completo"
                  value={nuevoParticipante.nombre}
                  onChange={(e) => setNuevoParticipante((prev) => ({ ...prev, nombre: e.target.value }))}
                />
                <Input
                  placeholder="email@ejemplo.com"
                  type="email"
                  value={nuevoParticipante.email}
                  onChange={(e) => setNuevoParticipante((prev) => ({ ...prev, email: e.target.value }))}
                />
                <select
                  value={nuevoParticipante.rol}
                  onChange={(e) => setNuevoParticipante((prev) => ({ ...prev, rol: e.target.value as any }))}
                  className="px-3 py-2 border border-gray-200 rounded-md focus:border-orange-500 focus:ring-orange-500"
                >
                  <option value="participante">Participante</option>
                  <option value="presentador">Presentador</option>
                  <option value="moderador">Moderador</option>
                </select>
                <Button type="button" onClick={agregarParticipante} className="bg-orange-500 hover:bg-orange-600">
                  <UserPlus className="h-4 w-4 mr-2" />
                  Agregar
                </Button>
              </div>

              {/* Lista de Participantes */}
              {salaData.participantes.length > 0 && (
                <div className="space-y-2">
                  <h4 className="font-medium text-gray-900">
                    Participantes Invitados ({salaData.participantes.length})
                  </h4>
                  <div className="space-y-2 max-h-60 overflow-y-auto">
                    {salaData.participantes.map((participante) => (
                      <div
                        key={participante.id}
                        className="flex items-center justify-between p-3 bg-white border border-gray-200 rounded-lg"
                      >
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={participante.avatar || "/placeholder.svg"} />
                            <AvatarFallback className="text-xs">
                              {participante.nombre
                                .split(" ")
                                .map((n) => n[0])
                                .join("")
                                .toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium text-sm">{participante.nombre}</p>
                            <p className="text-xs text-gray-500">{participante.email}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge className={`${getRolColor(participante.rol)} border`}>
                            {getRolIcon(participante.rol)}
                            <span className="ml-1 capitalize">{participante.rol}</span>
                          </Badge>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => eliminarParticipante(participante.id)}
                            className="text-red-500 hover:text-red-700 hover:bg-red-50"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Configuración Avanzada */}
          <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
            <CardHeader className="bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-t-lg">
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Configuración Avanzada
              </CardTitle>
              <CardDescription className="text-purple-100">Personaliza las funcionalidades de la sala</CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-medium text-gray-900">Permisos y Funcionalidades</h4>
                  <div className="space-y-3">
                    {[
                      { key: "permitirChat", label: "Permitir Chat", desc: "Los participantes pueden enviar mensajes" },
                      {
                        key: "permitirCompartirPantalla",
                        label: "Compartir Pantalla",
                        desc: "Habilitar compartir pantalla",
                      },
                      { key: "permitirGrabacion", label: "Permitir Grabación", desc: "La sesión puede ser grabada" },
                      { key: "modoEspera", label: "Modo Sala de Espera", desc: "Los participantes esperan aprobación" },
                    ].map((config) => (
                      <label key={config.key} className="flex items-start gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={salaData.configuracion[config.key as keyof typeof salaData.configuracion]}
                          onChange={(e) =>
                            setSalaData((prev) => ({
                              ...prev,
                              configuracion: {
                                ...prev.configuracion,
                                [config.key]: e.target.checked,
                              },
                            }))
                          }
                          className="mt-1 h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                        />
                        <div>
                          <p className="font-medium text-sm">{config.label}</p>
                          <p className="text-xs text-gray-500">{config.desc}</p>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium text-gray-900">Seguridad</h4>
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={salaData.requiereAprobacion}
                      onChange={(e) => setSalaData((prev) => ({ ...prev, requiereAprobacion: e.target.checked }))}
                      className="mt-1 h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                    />
                    <div>
                      <p className="font-medium text-sm">Requiere Aprobación</p>
                      <p className="text-xs text-gray-500">Los participantes deben ser aprobados antes de unirse</p>
                    </div>
                  </label>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Botones de Acción */}
          <div className="flex justify-center gap-4 pt-6">
            <Button type="button" variant="outline" size="lg" className="px-8 bg-transparent">
              Cancelar
            </Button>
            <Button
              type="submit"
              size="lg"
              className="px-8 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700"
            >
              <Video className="h-5 w-5 mr-2" />
              Crear Sala
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
