import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // 👤 Mock de autenticación
    if (email === "user@hotel.com" && pass === "123456") {
      alert("Bienvenido Usuario: ver habitaciones, reservar, consultas.");
      // Aquí iría navegación a /usuario
    } else if (email === "operador@hotel.com" && pass === "123456") {
      alert("Bienvenido Operador: acceso a panel interno.");
      // Aquí iría navegación a /operador
    } else {
      setError("Credenciales incorrectas");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-white to-cyan-100 p-6">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 transition hover:shadow-2xl">
        {/* Encabezado */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Hotel Hilton</h1>
          <p className="mt-2 text-gray-600 text-sm">
            Ingresá con tu cuenta para continuar
          </p>
        </div>

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="text-red-600 text-sm font-medium text-center">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="ejemplo@hotel.com"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
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
              placeholder="********"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-violet-600 text-white font-semibold shadow hover:bg-violet-700 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 transition"
          >
            Ingresar
          </button>
        </form>

        {/* Footer */}
        <div className="mt-6 text-center text-sm text-gray-500">
          <p>
            Usuario demo: <span className="font-medium">user@hotel.com / 123456</span>
          </p>
          <p>
            Operador demo: <span className="font-medium">operador@hotel.com / 123456</span>
          </p>
        </div>
      </div>
    </div>
  );
}
