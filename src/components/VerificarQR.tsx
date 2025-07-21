
// Verifica el código de validación recibido por QR o email
// Solicita número de celular si el código es válido

import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"
import axios from "axios"

export default function VerificarQR() {
  const [params] = useSearchParams()
  const codigo = params.get("codigo") || ""
  const [estado, setEstado] = useState<"verificando" | "valido" | "invalido">("verificando")
  const [email, setEmail] = useState("")
  const [celular, setCelular] = useState("")

  useEffect(() => {
    if (!codigo) {
      setEstado("invalido")
      return
    }

    axios.get(`http://localhost:8000/auth/verificar-qr`, {
      params: { codigo }
    }).then(res => {
      setEmail(res.data.email)
      setEstado("valido")
    }).catch(() => {
      setEstado("invalido")
    })
  }, [codigo])

  const enviarCelular = async () => {
    try {
      await axios.post("http://localhost:8000/auth/completar-verificacion", {
        codigo,
        celular
      })
      alert("✅ Verificación completa. Bienvenido.")
    } catch {
      alert("❌ Error al guardar el celular.")
    }
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col justify-center items-center p-4">
      {estado === "verificando" && <p className="text-lg">Verificando código...</p>}
      {estado === "invalido" && <p className="text-red-500 text-lg">❌ Código inválido o expirado.</p>}
      {estado === "valido" && (
        <div className="space-y-4 w-full max-w-md text-center">
          <p className="text-xl font-bold text-purple-300">¡Hola!</p>
          <p className="text-sm text-gray-400">Validamos tu email: <strong>{email}</strong></p>
          <p className="text-sm">Para finalizar, ingresá tu número de celular:</p>
          <input
            type="tel"
            placeholder="Ej: 11 2345 6789"
            className="w-full p-2 rounded bg-gray-800 border border-purple-500 text-white"
            value={celular}
            onChange={e => setCelular(e.target.value)}
          />
          <button
            onClick={enviarCelular}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded transition"
          >
            Confirmar y continuar
          </button>
        </div>
      )}
    </div>
  )
}
