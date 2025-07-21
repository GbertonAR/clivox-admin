// Formulario de email que inicia el proceso de validación vía QR
// Envía la dirección de email al backend y muestra QR + código recibido

import { useState } from 'react'
import axios from 'axios'

export default function LoginQR() {
  const [email, setEmail] = useState("")
  const [codigo, setCodigo] = useState("")
  const [uuid, setUuid] = useState("")
  const [qrReady, setQrReady] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const res = await axios.post("http://localhost:8000/auth/solicitar-codigo", { email })
      setCodigo(res.data.codigo)
      setUuid(res.data.uuid)
      setQrReady(true)
    } catch (err) {
      alert("Error al enviar email.")
    }
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col justify-center items-center p-4">
      <h1 className="text-2xl font-bold mb-4 text-purple-400">Ingreso Seguro - CLI<span className="text-white">VOX</span> Admin</h1>
      {!qrReady ? (
        <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-md">
          <input
            type="email"
            required
            placeholder="Tu correo institucional"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="w-full p-2 rounded bg-gray-800 text-white border border-purple-500"
          />
          <button
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded transition"
          >
            Enviar código y QR
          </button>
        </form>
      ) : (
        <div className="text-center space-y-4">
          <p className="text-sm">Código enviado por correo:</p>
          <div className="text-4xl font-mono tracking-widest">{codigo}</div>
          <p className="text-sm mt-2">Escaneá el siguiente QR desde tu celular para continuar:</p>
          <img
            src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https://clivox-admin.vercel.app/verificar-qr?codigo=${codigo}`}
            alt="QR de acceso"
            className="mx-auto border-4 border-purple-400 rounded"
          />
        </div>
      )}
    </div>
  )
}
