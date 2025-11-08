import React from "react";
import { Outlet, NavLink } from "react-router-dom";

export default function OperatorLayout() {
  const linkBase =
    "block py-2.5 px-3 rounded-lg transition text-sm font-medium";
  const linkClass = ({ isActive }) =>
    `${linkBase} ${isActive ? "bg-red-800 text-white" : "hover:bg-red-800/70 text-red-50"}`;

  return (
    <div className="flex min-h-screen bg-gray-50 font-inter">
      {/* === SIDEBAR === */}
      <aside className="w-64 bg-red-900 text-white p-6 flex flex-col justify-between shadow-xl">
        <div>
          <h2 className="text-2xl font-bold mb-8 tracking-wide">Hotel Operador</h2>

          <nav className="space-y-2">
            <NavLink to="/operator/mapa" className={linkClass}>
              Mapa de Habitaciones
            </NavLink>
            <NavLink to="/operator/reservas" className={linkClass}>
              Consultar / Liberar Reservas
            </NavLink>
            <NavLink to="/operator/pagos" className={linkClass}>
              Procesar Pagos
            </NavLink>
            <NavLink to="/operator/consultas" className={linkClass}>
              Consultas / Mails
            </NavLink>
          </nav>
        </div>

        <div className="text-xs text-red-200 mt-8">
          © 2025 Hotel Sunshine
          <br />
          Panel Operador
        </div>
      </aside>

      {/* === MAIN === */}
      <main className="flex-1 p-10 text-gray-800">
        {/* HEADER */}
        <header className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-red-900">
              Panel del Operador
            </h1>
            <p className="text-sm text-gray-500">
              Acceso rápido a mapa, reservas, pagos y consultas.
            </p>
          </div>
          <div className="bg-white shadow px-4 py-2 rounded-xl text-sm">
            Operador | <span className="text-red-600">Hotel Sunshine</span>
          </div>
        </header>

        {/* CONTENIDO DINÁMICO (rutas hijas) */}
        <section>
          <Outlet />
        </section>
      </main>
    </div>
  );
}
