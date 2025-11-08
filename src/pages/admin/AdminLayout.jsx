import React from "react";
import { Outlet, Link } from "react-router-dom";

export default function AdminLayout() {
  return (
    <div className="flex min-h-screen bg-gray-50 font-inter">
      {/* === SIDEBAR === */}
      <aside className="w-64 bg-blue-900 text-white p-6 flex flex-col justify-between shadow-xl">
        <div>
          <h2 className="text-2xl font-bold mb-8 tracking-wide">Hotel Admin</h2>
          <nav className="space-y-3 text-sm font-medium">
            <Link
              to="/admin"
              className="block py-2 px-3 rounded hover:bg-blue-800 transition"
            >
              Dashboard
            </Link>
            <Link
              to="/admin/habitaciones"
              className="block py-2 px-3 rounded hover:bg-blue-800 transition"
            >
              CRUD Habitaciones
            </Link>
            <Link
              to="/admin/operadores"
              className="block py-2 px-3 rounded hover:bg-blue-800 transition"
            >
              CRUD Operadores
            </Link>
          </nav>
        </div>

        <div className="text-xs text-gray-400 mt-8">
          © 2025 Hotel Sunshine
          <br />
          Panel Administrativo
        </div>
      </aside>

      {/* === MAIN === */}
      <main className="flex-1 p-10 text-gray-800 overflow-y-auto">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-blue-900">Panel de Administración</h1>
          <div className="bg-white shadow px-4 py-2 rounded-xl text-sm">
            Admin | <span className="text-blue-600">Hotel Sunshine</span>
          </div>
        </header>

        {/* AQUÍ SE CARGA EL CONTENIDO DE LAS SUBRUTAS */}
        <Outlet />
      </main>
    </div>
  );
}
