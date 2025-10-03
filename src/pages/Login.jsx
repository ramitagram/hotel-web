import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (email === "admin@hotel.com" && pass === "123456") {
      navigate("/admin");
    } else if (email === "operador@hotel.com" && pass === "123456") {
      navigate("/operator");
    } else {
      setError("Credenciales incorrectas");
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center 
                 bg-gradient-to-br from-gray-200 via-gray-100 to-gray-300 p-6"
    >
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

          {/* Email */}
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
              className="w-full px-4 py-2 border border-gray-300 rounded-xl 
                         focus:ring-2 focus:ring-red-900 
                         focus:border-red-900 transition"
            />
          </div>

          {/* Contraseña con ojito */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Contraseña
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={pass}
                onChange={(e) => setPass(e.target.value)}
                placeholder="********"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-xl 
                           focus:ring-2 focus:ring-red-900 
                           focus:border-red-900 transition pr-10"
              />
              {/* Botón ojito */}
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-red-900 focus:outline-none"
              >
                {showPassword ? (
                  // 👁️ Ojo abierto (silueta básica)
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                ) : (
                  // 👁️ Ojo tachado (silueta básica)
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.542-7a9.956 9.956 0 012.251-3.592m2.548-2.13A9.956 9.956 0 0112 5c4.478 0 8.268 2.943 9.542 7a9.956 9.956 0 01-4.5 5.818M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 3l18 18"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Botón ingresar */}
          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-red-900 text-white font-semibold shadow hover:bg-red-800 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 transition"
          >
            Ingresar
          </button>
        </form>

        {/* Footer con demos */}
        <div className="mt-6 text-center text-sm text-gray-500 space-y-2">
          <p>
            <span className="font-bold text-red-900">Admin demo:</span>{" "}
            <span className="font-medium">admin@hotel.com / 123456</span>
          </p>
          <p>
            <span className="font-bold text-red-900">Operador demo:</span>{" "}
            <span className="font-medium">operador@hotel.com / 123456</span>
          </p>
        </div>
      </div>
    </div>
  );
}