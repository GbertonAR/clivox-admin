export default function TestColors() {
  return (
    <div className="p-8 space-y-4">
      <h1 className="text-2xl font-bold text-blue-600">Clivox Admin 🎯</h1>

      <div className="space-y-2">
        <p className="text-red-custom text-lg font-semibold">Rojo correcto</p>
        <p className="text-green-custom text-lg font-semibold">Verde correcto</p>
        <p className="text-red-custom">Texto rojo</p>
        <p className="text-blue-custom">Texto azul</p>
        <p className="text-foreground">Texto foreground</p>
        <p className="text-primary-custom">Texto primary</p>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-bold text-blue-800 mb-2">🎥 Crear Nueva Sala</h2>
        <p className="text-gray-600">Configura tu espacio de videoconferencia con Azure Communication Services</p>

        <div className="mt-4 p-4 bg-blue-50 rounded-lg">
          <h3 className="text-lg font-semibold text-blue-700 mb-2">✨ Información Básica</h3>
          <p className="text-blue-600">Define los detalles principales de tu sala de conferencia</p>
        </div>
      </div>

      <div className="mt-8 space-y-2">
        <h3 className="text-lg font-bold">Prueba de colores Tailwind:</h3>
        <p className="text-red-500">Texto rojo con Tailwind (text-red-500)</p>
        <p className="text-green-500">Texto verde con Tailwind (text-green-500)</p>
        <p className="text-blue-500">Texto azul con Tailwind (text-blue-500)</p>
        <p className="text-purple-500">Texto morado con Tailwind (text-purple-500)</p>
      </div>
    </div>
  )
}
