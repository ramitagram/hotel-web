import React, { useState } from "react";

export default function ProcesarPago() {
  const [reservas, setReservas] = useState([
    { id: 1, habitacion: 101, cliente: "Juan Pérez", monto: 60000, estado: "pendiente" },
    { id: 2, habitacion: 202, cliente: "María Gómez", monto: 80000, estado: "pendiente" },
  ]);

  const procesarPagoSimulado = (id, nuevoEstado) => {
    setReservas((prev) =>
      prev.map((r) => (r.id === id ? { ...r, estado: nuevoEstado } : r))
    );
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold text-rose-900 mb-6">Procesar Pagos </h1>

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
                {r.estado === "aprobado" ? (
                  <span className="text-green-600">Pagado</span>
                ) : r.estado === "rechazado" ? (
                  <span className="text-red-600">Rechazado</span>
                ) : (
                  <span className="text-yellow-600">{r.estado}</span>
                )}
              </td>
              <td className="p-2 text-center space-x-2">
                <button
                  onClick={() => procesarPagoSimulado(r.id, "aprobado")}
                  className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded"
                >
                  Aprobar
                </button>
                <button
                  onClick={() => procesarPagoSimulado(r.id, "rechazado")}
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                >
                  Rechazar
                </button>
                <button
                  onClick={() => procesarPagoSimulado(r.id, "pendiente")}
                  className="bg-yellow-400 hover:bg-yellow-500 text-black px-3 py-1 rounded"
                >
                  Pendiente
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
