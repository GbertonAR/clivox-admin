import React, { useEffect, useState } from 'react';

// Importaciones relativas a tus componentes de UI (ej. Shadcn UI)
// Asegúrate de que las rutas sean correctas, si están en './ui/' es porque están en el mismo nivel
// o un subdirectorio directo de donde está MiPerfil.
import { Card, CardContent } from "./ui/Card";
import { Button } from "./ui/Button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectItem } from "./ui/select"; // Este es tu componente Select personalizado

interface Provincia {
  id: number;
  nombre: string;
}

interface Municipio {
  id: number;
  nombre: string;
  id_provincia: number; // Asegúrate de que este campo coincida con tu backend
}

const MiPerfil = () => {
  // Estados para los campos del formulario
  const [nombre, setNombre] = useState<string>('');
  const [apellido, setApellido] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [celular, setCelular] = useState<string>('');
  const [cuil, setCuil] = useState<string>('');
  const [provinciaId, setProvinciaId] = useState<number | ''>(''); // Usar '' para el valor inicial "selecciona"
  const [municipioId, setMunicipioId] = useState<number | ''>(''); // Usar '' para el valor inicial "selecciona"

  // Estados para los datos de provincias y municipios
  const [provincias, setProvincias] = useState<Provincia[]>([]);
  const [municipios, setMunicipios] = useState<Municipio[]>([]);

  // Estados para la carga y errores
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState<boolean>(false); // Para el botón de guardar

  // --- useEffect para cargar los datos del usuario (al cargar el componente) ---
  useEffect(() => {
    const fetchUserData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        // Asume que tienes un endpoint para obtener los datos del perfil del usuario actual
        // Podrías necesitar enviar un token de autenticación aquí
        const res = await fetch('http://localhost:8000/api/usuarios/perfil'); // Ajusta este endpoint si es diferente
        if (!res.ok) {
          throw new Error(`Error al cargar datos del perfil: ${res.statusText}`);
        }
        const data = await res.json();
        setNombre(data.nombre || '');
        setApellido(data.apellido || '');
        setEmail(data.email || '');
        setCelular(data.celular || '');
        setCuil(data.cuil || '');
        setProvinciaId(data.id_provincia || '');
        setMunicipioId(data.id_municipio || '');
      } catch (err: any) {
        console.error("Error al cargar datos del usuario:", err);
        setError(err.message || "No se pudieron cargar los datos del perfil.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, []); // Se ejecuta solo una vez al montar el componente

  // --- useEffect para cargar provincias ---
  useEffect(() => {
    const fetchProvincias = async () => {
      setError(null);
      try {
        const res = await fetch('http://localhost:8000/api/provincias'); // Asegurate que este endpoint existe en tu backend
        if (!res.ok) {
          throw new Error(`Error al cargar provincias: ${res.statusText}`);
        }
        const data: Provincia[] = await res.json();
        setProvincias(data);
      } catch (err: any) {
        console.error("Error al cargar provincias:", err);
        setError(err.message || "No se pudieron cargar las provincias.");
      }
    };

    fetchProvincias();
  }, []); // Se ejecuta solo una vez al montar el componente

  // --- useEffect para cargar municipios (cuando cambia la provinciaId) ---
  useEffect(() => {
    setMunicipios([]); // Limpiar municipios al cambiar la provincia
    setMunicipioId(''); // Resetear el municipio seleccionado

    if (provinciaId !== '' && provinciaId !== null) { // Solo cargar si hay una provinciaId válida
      const fetchMunicipios = async () => {
        setError(null);
        try {
          // Asegurate que este endpoint existe y acepta el parámetro provincia_id
          const res = await fetch(`http://localhost:8000/api/municipios?provincia_id=${provinciaId}`);
          if (!res.ok) {
            throw new Error(`Error al cargar municipios: ${res.statusText}`);
          }
          const data: Municipio[] = await res.json();
          setMunicipios(data);
        } catch (err: any) {
          console.error("Error al cargar municipios:", err);
          setError(err.message || "No se pudieron cargar los municipios.");
        }
      };
      fetchMunicipios();
    }
  }, [provinciaId]); // Dependencia: se ejecuta cuando provinciaId cambia

  // --- Manejador del cambio de provincia ---
  const handleProvinciaChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    // Convertir a número si el valor no es un string vacío
    const value = event.target.value === '' ? '' : parseInt(event.target.value);
    setProvinciaId(value);
  };

  // --- Manejador del cambio de municipio ---
  const handleMunicipioChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    // Convertir a número si el valor no es un string vacío
    const value = event.target.value === '' ? '' : parseInt(event.target.value);
    setMunicipioId(value);
  };

  // --- Manejador del envío del formulario ---
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setError(null);

    const datos = {
      nombre,
      apellido,
      email,
      celular,
      cuil,
      // Asegurarse de enviar null o undefined si no se seleccionó nada,
      // dependiendo de lo que espere tu backend para campos opcionales.
      id_provincia: provinciaId === '' ? null : provinciaId,
      id_municipio: municipioId === '' ? null : municipioId
    };

    try {
      const res = await fetch('http://localhost:8000/api/usuarios/actualizar', { // Ajusta este endpoint
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // 'Authorization': `Bearer ${tuTokenDeAuth}` // Si usas autenticación
        },
        body: JSON.stringify(datos)
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || `Error al actualizar datos: ${res.statusText}`);
      }

      // const result = await res.json(); // Si tu backend devuelve algo
      alert("Datos actualizados correctamente");
    } catch (err: any) {
      console.error("Error al guardar:", err);
      setError(err.message || "No se pudieron guardar los cambios.");
    } finally {
      setIsSaving(false);
    }
  };

  // --- Renderizado ---
  if (isLoading) {
    return (
      <div className="p-6 max-w-3xl mx-auto text-center">
        <p>Cargando perfil...</p>
        {/* Aquí podrías añadir un spinner o un componente de carga */}
      </div>
    );
  }

  if (error && !isLoading) {
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
            <div>
              <Label htmlFor="nombre">Nombre</Label>
              <Input
                id="nombre"
                value={nombre}
                onChange={e => setNombre(e.target.value)}
                required
                disabled={isSaving}
              />
            </div>
            <div>
              <Label htmlFor="apellido">Apellido</Label>
              <Input
                id="apellido"
                value={apellido}
                onChange={e => setApellido(e.target.value)}
                required
                disabled={isSaving}
              />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                disabled={isSaving}
              />
            </div>
            <div>
              <Label htmlFor="celular">Celular</Label>
              <Input
                id="celular"
                value={celular}
                onChange={e => setCelular(e.target.value)}
                disabled={isSaving}
              />
            </div>
            <div>
              <Label htmlFor="cuil">CUIL</Label>
              <Input
                id="cuil"
                value={cuil}
                onChange={e => setCuil(e.target.value)}
                placeholder="Ej: 20XXXXXXXXX9"
                disabled={isSaving}
              />
            </div>
            <div>
              <Label htmlFor="provincia">Provincia</Label>
              {/* CORRECCIÓN: Usar onChange en lugar de onValueChange */}
              <Select
                id="provincia"
                value={provinciaId?.toString() || ''} // Controlado por el estado
                onChange={handleProvinciaChange} // Manejador de cambio
                disabled={isSaving || provincias.length === 0}
              >
                <SelectItem value="">Selecciona una provincia</SelectItem> {/* Opción por defecto */}
                {provincias.map(p => (
                  <SelectItem key={p.id} value={p.id.toString()}>{p.nombre}</SelectItem>
                ))}
              </Select>
            </div>
            <div>
              <Label htmlFor="municipio">Municipio</Label>
              {/* CORRECCIÓN: Usar onChange en lugar de onValueChange */}
              <Select
                id="municipio"
                value={municipioId?.toString() || ''} // Controlado por el estado
                onChange={handleMunicipioChange} // Manejador de cambio
                disabled={isSaving || municipios.length === 0 || provinciaId === ''} // Deshabilitar si no hay provincia seleccionada o no hay municipios
              >
                <SelectItem value="">Selecciona un municipio</SelectItem> {/* Opción por defecto */}
                {municipios.map(m => (
                  <SelectItem key={m.id} value={m.id.toString()}>{m.nombre}</SelectItem>
                ))}
              </Select>
            </div>
            <div className="flex justify-end mt-4">
              <Button type="submit" disabled={isSaving}>
                {isSaving ? 'Guardando...' : 'Guardar cambios'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default MiPerfil;