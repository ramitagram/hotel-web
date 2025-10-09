import React, { useState } from "react";

export default function Registro() {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Cuenta creada para ${nombre} ${apellido}`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-200 via-gray-100 to-gray-300 p-6">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 transition hover:shadow-2xl">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Crear cuenta</h1>
          <p className="mt-2 text-gray-600 text-sm">
            Completá los datos para registrarte
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Campos */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nombre
            </label>
            <input
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-700 focus:border-blue-700 transition"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Apellido
            </label>
            <input
              type="text"
              value={apellido}
              onChange={(e) => setApellido(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-700 focus:border-blue-700 transition"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Correo electrónico
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-700 focus:border-blue-700 transition"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Contraseña
            </label>
            <input
              type="password"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-700 focus:border-blue-700 transition"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-blue-700 text-white font-semibold shadow hover:bg-blue-600 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 transition"
          >
            Crear cuenta
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-500">
          <p>
            ¿Ya tenés cuenta?{" "}
            <a
              href="/"
              className="font-semibold text-blue-700 hover:underline"
            >
              Iniciar sesión
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}