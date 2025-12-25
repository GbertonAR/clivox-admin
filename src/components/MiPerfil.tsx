import React, { useEffect, useState } from "react";

import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "./ui/select";

interface Provincia {
  id: number;
  nombre: string;
}

interface Municipio {
  id: number;
  nombre: string;
  id_provincia: number;
}

const MiPerfil = () => {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [email, setEmail] = useState("");
  const [celular, setCelular] = useState("");
  const [cuil, setCuil] = useState("");
  const [provinciaId, setProvinciaId] = useState<number | "">("");
  const [municipioId, setMunicipioId] = useState<number | "">("");
  const [provincias, setProvincias] = useState<Provincia[]>([]);
  const [municipios, setMunicipios] = useState<Municipio[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  /* ---------------- CARGA DE DATOS DEL USUARIO ---------------- */
  useEffect(() => {
    const fetchUserData = async () => {
      setIsLoading(true);
      try {
        const res = await fetch("http://localhost:8000/api/usuarios/perfil");
        if (!res.ok)
          throw new Error(`Error al cargar perfil: ${res.statusText}`);
        const data = await res.json();
        setNombre(data.nombre || "");
        setApellido(data.apellido || "");
        setEmail(data.email || "");
        setCelular(data.celular || "");
        setCuil(data.cuil || "");
        setProvinciaId(data.id_provincia || "");
        setMunicipioId(data.id_municipio || "");
      } catch (err: any) {
        console.error(err);
        setError(
          err.message || "No se pudieron cargar los datos del perfil."
        );
      } finally {
        setIsLoading(false);
      }
    };
    fetchUserData();
  }, []);

  /* ---------------- CARGA DE PROVINCIAS ---------------- */
  useEffect(() => {
    const fetchProvincias = async () => {
      try {
        const res = await fetch("http://localhost:8000/api/provincias");
        if (!res.ok)
          throw new Error(`Error al cargar provincias: ${res.statusText}`);
        const data: Provincia[] = await res.json();
        setProvincias(data);
      } catch (err: any) {
        console.error(err);
        setError(err.message || "No se pudieron cargar las provincias.");
      }
    };
    fetchProvincias();
  }, []);

  /* ---------------- CARGA DE MUNICIPIOS SEGÚN PROVINCIA ---------------- */
  useEffect(() => {
    setMunicipios([]);
    setMunicipioId("");
    if (provinciaId !== "") {
      const fetchMunicipios = async () => {
        try {
          const res = await fetch(
            `http://localhost:8000/api/municipios?provincia_id=${provinciaId}`
          );
          if (!res.ok)
            throw new Error(`Error al cargar municipios: ${res.statusText}`);
          const data: Municipio[] = await res.json();
          setMunicipios(data);
        } catch (err: any) {
          console.error(err);
          setError(err.message || "No se pudieron cargar los municipios.");
        }
      };
      fetchMunicipios();
    }
  }, [provinciaId]);

  /* ---------------- GUARDAR PERFIL ---------------- */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      const res = await fetch("http://localhost:8000/api/usuarios/actualizar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombre,
          apellido,
          email,
          celular,
          cuil,
          id_provincia: provinciaId === "" ? null : provinciaId,
          id_municipio: municipioId === "" ? null : municipioId,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(
          errorData.message || `Error al actualizar datos: ${res.statusText}`
        );
      }

      alert("Datos actualizados correctamente");
    } catch (err: any) {
      console.error(err);
      setError(err.message || "No se pudieron guardar los cambios.");
    } finally {
      setIsSaving(false);
    }
  };

  /* ---------------- RENDER ---------------- */
  if (isLoading)
    return (
      <div className="p-6 max-w-3xl mx-auto text-center">
        Cargando perfil...
      </div>
    );

  if (error) {
    return (
      <div className="p-6 max-w-3xl mx-auto text-center text-red-600">
        <p>Error: {error}</p>
        <Button onClick={() => window.location.reload()}>Reintentar</Button>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Mi Perfil</h1>
      <Card>
        <CardContent>
          <form onSubmit={handleSubmit} className="grid gap-4">
            {/* Datos básicos */}
            <div>
              <Label htmlFor="nombre">Nombre</Label>
              <Input
                id="nombre"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                disabled={isSaving}
              />
            </div>
            <div>
              <Label htmlFor="apellido">Apellido</Label>
              <Input
                id="apellido"
                value={apellido}
                onChange={(e) => setApellido(e.target.value)}
                disabled={isSaving}
              />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isSaving}
              />
            </div>
            <div>
              <Label htmlFor="celular">Celular</Label>
              <Input
                id="celular"
                value={celular}
                onChange={(e) => setCelular(e.target.value)}
                disabled={isSaving}
              />
            </div>
            <div>
              <Label htmlFor="cuil">CUIL</Label>
              <Input
                id="cuil"
                value={cuil}
                onChange={(e) => setCuil(e.target.value)}
                placeholder="Ej: 20XXXXXXXXX9"
                disabled={isSaving}
              />
            </div>

            {/* Select Provincia */}
            <div>
              <Label>Provincia</Label>
              <Select
                value={provinciaId?.toString() || ""}
                onValueChange={(value) =>
                  setProvinciaId(value === "" ? "" : parseInt(value))
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Selecciona una provincia" />
                </SelectTrigger>
                <SelectContent>
                  {/* 🟢 Cambió → se quitó el <SelectItem value=""> */}
                  {provincias.map((p) => (
                    <SelectItem key={p.id} value={p.id.toString()}>
                      {p.nombre}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Select Municipio */}
            <div>
              <Label>Municipio</Label>
              <Select
                value={municipioId?.toString() || ""}
                onValueChange={(value) =>
                  setMunicipioId(value === "" ? "" : parseInt(value))
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Selecciona un municipio" />
                </SelectTrigger>
                <SelectContent>
                  {/* 🟢 Cambió → se quitó el <SelectItem value=""> */}
                  {municipios.map((m) => (
                    <SelectItem key={m.id} value={m.id.toString()}>
                      {m.nombre}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Botón guardar */}
            <div className="flex justify-end mt-4">
              <Button type="submit" disabled={isSaving}>
                {isSaving ? "Guardando..." : "Guardar cambios"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default MiPerfil;
