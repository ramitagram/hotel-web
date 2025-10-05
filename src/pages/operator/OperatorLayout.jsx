import React from "react";
import { Outlet } from "react-router-dom";

export default function OperatorLayout() {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-red-900 text-white p-6">
        <h2 className="text-xl font-bold mb-6">Panel Operador</h2>
        <nav className="space-y-3">
          <a href="/operator/mapa" className="block hover:text-red-300">
            Consultar habitaciones (Mapa)
          </a>
          <a href="/operator/reservas" className="block hover:text-red-300">
            Consultar y liberar reservas
          </a>
          <a href="/operator/pagos" className="block hover:text-red-300">
            Procesar pagos
          </a>
          <a href="/operator/consultas" className="block hover:text-red-300">
            Consultas/Mails
          </a>
        </nav>
      </aside>

      {/* Main content dinámico */}
      <main className="flex-1 p-8 bg-stone-100 text-black">
        <Outlet />
      </main>
    </div>
  );
}