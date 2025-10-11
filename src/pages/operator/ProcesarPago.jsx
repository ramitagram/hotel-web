import React, { useEffect, useState } from "react";
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";

// Inicializar Mercado Pago con tu Public Key (la de prueba)
initMercadoPago("TEST-97a7471e-8e9d-456d-a16f-40c0406b2e94", { locale: "es-AR" });

export default function ProcesarPago() {
  const [reservas, setReservas] = useState([]);
  const [preferenceId, setPreferenceId] = useState(null);

 useEffect(() => {
  fetch("http://localhost:3001/api/reservas")
    .then((res) => {
      if (!res.ok) throw new Error("Error HTTP " + res.status);
      return res.json();
    })
    .then((data) => {
      console.log("✅ Reservas recibidas:", data);
      setReservas(data);
    })
    .catch((err) => {
      console.error("❌ Error al cargar reservas:", err);
    });
}, []);


  // Crear preferencia (pago)
  const crearPreferencia = async (reservaId) => {
    const res = await fetch("http://localhost:3001/api/create_preference", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ reservaId }),
    });
    const data = await res.json();
    setPreferenceId(data.preferenceId);
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold text-rose-900 mb-6">Procesar Pagos</h1>

      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-rose-100 text-left">
            <th className="p-2">Habitación</th>
            <th className="p-2">Cliente</th>
            <th className="p-2">Monto</th>
            <th className="p-2">Estado</th>
            <th className="p-2 text-center">Acción</th>
          </tr>
        </thead>
        <tbody>
          {reservas.map((r) => (
            <tr key={r.id} className="border-b">
              <td className="p-2">{r.habitacion}</td>
              <td className="p-2">{r.cliente}</td>
              <td className="p-2">${r.monto.toLocaleString()}</td>
              <td className="p-2 font-semibold capitalize">
                {r.estado === "approved" ? (
                  <span className="text-green-600">Pagado</span>
                ) : (
                  <span className="text-yellow-600">{r.estado}</span>
                )}
              </td>
              <td className="p-2 text-center">
                {r.estado === "approved" ? (
                  "—"
                ) : (
                  <button
                    onClick={() => crearPreferencia(r.id)}
                    className="bg-rose-600 hover:bg-rose-700 text-white px-4 py-1 rounded"
                  >
                    Procesar Pago
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {preferenceId && (
        <div className="mt-6 flex justify-center">
          <Wallet initialization={{ preferenceId }} />
        </div>
      )}
    </div>
  );
}