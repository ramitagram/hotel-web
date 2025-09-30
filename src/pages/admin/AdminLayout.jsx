import React from "react";

export default function AdminLayout(){
     return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-violet-700 text-white p-6">
        <h2 className="text-xl font-bold mb-6">Admin Panel</h2>
        <nav className="space-y-3">
          <a href="/admin/habitaciones" className="block hover:text-violet-200">
            CRUD Habitaciones
          </a>
          <a href="/admin/operadores" className="block hover:text-violet-200">
            CRUD Operadores
          </a>
          <a href="/admin/reportes" className="block hover:text-violet-200">
            Reportes
          </a>
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-8 bg-gray-50">
        <h1 className="text-3xl font-bold">Bienvenido Administrador</h1>
        <p className="mt-4 text-gray-600">
          Acá vas a poder gestionar habitaciones, operadores y ver reportes.
        </p>
      </main>
    </div>
  );
}