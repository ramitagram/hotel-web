import React from "react";

export default function OperatorLayout() {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-indigo-700 text-white p-6">
        <h2 className="text-xl font-bold mb-6">Panel Operador</h2>
        <nav className="space-y-3">
          <a href="/operator/reservas" className="block hover:text-indigo-200">
            Consultar habitaciones
          </a>
          <a href="/operator/mapa" className="block hover:text-indigo-200">
            Consultar y liberar reservas
          </a>
          <a href="/operator/pagos" className="block hover:text-indigo-200">
            Procesamiento de pagos
          </a>
          <a href="/operator/consultas" className="block hover:text-indigo-200">
            Mails
          </a>
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-8 bg-gray-50">
        <h1 className="text-3xl font-bold">Bienvenido Operador</h1>
        <p className="mt-4 text-gray-600">
          Desde aquí podés consultar reservas, gestionar habitaciones y atender
          consultas.
        </p>
      </main>
    </div>
  );
}