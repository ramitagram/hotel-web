import React from "react";
import { Outlet } from "react-router-dom";

export default function AdminLayout() {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-blue-900 text-white p-6 shadow-lg">
        <h2 className="text-xl font-bold mb-6 tracking-wide">Panel Administrador</h2>
        <nav className="space-y-3 text-sm font-medium">
          <a
            href="/admin/habitaciones"
            className="block hover:text-blue-300 transition-colors"
          >
            CRUD Habitaciones
          </a>
          <a
            href="/admin/operadores"
            className="block hover:text-blue-300 transition-colors"
          >
            CRUD Operadores
          </a>
          <a
            href="/admin/reportes"
            className="block hover:text-blue-300 transition-colors"
          >
            Reportes
          </a>
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-8 bg-gray-100 text-gray-900">
        <header className="border-b pb-3 mb-6">
          <h1 className="text-2xl font-semibold text-blue-900">
            Bienvenido al Panel Administrativo
          </h1>
          <p className="text-sm text-gray-600">
            Gestión de habitaciones, operadores y reportes.
          </p>
        </header>

        {/* Contenido dinámico */}
        <div className="bg-white rounded-2xl shadow-md p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
}