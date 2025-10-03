import React from "react";
import { Outlet } from "react-router-dom";

export default function AdminLayout() {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-red-900 text-white p-6">
        <h2 className="text-xl font-bold mb-6">Admin Panel</h2>
        <nav className="space-y-3">
          <a href="/admin/habitaciones" className="block hover:text-red-300">
            CRUD Habitaciones
          </a>
          <a href="/admin/operadores" className="block hover:text-red-300">
            CRUD Operadores
          </a>
          <a href="/admin/reportes" className="block hover:text-red-300">
            Reportes
          </a>
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-8 bg-stone-100 text-black">
        <Outlet />
      </main>
    </div>
  );
}