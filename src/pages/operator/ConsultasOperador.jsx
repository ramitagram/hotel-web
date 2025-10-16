import React, { useState } from "react";

export default function ConsultasOperador() {
  const [form, setForm] = useState({
    destinatario: "",
    asunto: "",
    mensaje: "",
  });
  const [enviando, setEnviando] = useState(false);
  const [resultado, setResultado] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setEnviando(true);
    setResultado(null);

    try {
      const res = await fetch("http://localhost:3001/api/enviar-correo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();

      if (data.ok) {
        setResultado({ tipo: "ok", msg: "Correo enviado correctamente ✅" });
        setForm({ destinatario: "", asunto: "", mensaje: "" });
      } else {
        setResultado({ tipo: "error", msg: "Error al enviar correo ❌" });
      }
    } catch (err) {
      setResultado({ tipo: "error", msg: "Error de conexión con el servidor ⚠️" });
    } finally {
      setEnviando(false);
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg max-w-lg mx-auto">
      <h1 className="text-2xl font-bold text-rose-900 mb-4">📧 Enviar Consulta</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-semibold">Destinatario:</label>
          <input
            type="email"
            name="destinatario"
            value={form.destinatario}
            onChange={handleChange}
            required
            placeholder="cliente@ejemplo.com"
            className="w-full border rounded p-2 mt-1"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold">Asunto:</label>
          <input
            type="text"
            name="asunto"
            value={form.asunto}
            onChange={handleChange}
            required
            placeholder="Consulta sobre reserva"
            className="w-full border rounded p-2 mt-1"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold">Mensaje:</label>
          <textarea
            name="mensaje"
            value={form.mensaje}
            onChange={handleChange}
            required
            rows="5"
            placeholder="Escribe el mensaje al cliente..."
            className="w-full border rounded p-2 mt-1"
          />
        </div>

        <button
          type="submit"
          disabled={enviando}
          className={`w-full py-2 rounded text-white font-semibold ${
            enviando ? "bg-gray-400" : "bg-rose-600 hover:bg-rose-700"
          }`}
        >
          {enviando ? "Enviando..." : "Enviar Correo"}
        </button>
      </form>

      {resultado && (
        <p
          className={`mt-4 text-center font-semibold ${
            resultado.tipo === "ok" ? "text-green-600" : "text-red-600"
          }`}
        >
          {resultado.msg}
        </p>
      )}
    </div>
  );
}