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
    <div className="min-h-screen flex items-center justify-center 
                    bg-gradient-to-br from-[oklch(79.5%_0.184_86.047)] 
                    via-white to-[oklch(79.5%_0.184_86.047)] p-6">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 transition hover:shadow-2xl">
        {/* Encabezado */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-black">Hotel Hilton</h1>
          <p className="mt-2 text-gray-700 text-sm">
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
            <label className="block text-sm font-medium mb-1 text-black">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="ejemplo@hotel.com"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-xl 
                         focus:ring-2 focus:ring-[oklch(79.5%_0.184_86.047)] 
                         focus:border-[oklch(79.5%_0.184_86.047)] transition bg-white text-black"
            />
          </div>

          {/* Contraseña con ojito */}
          <div>
            <label className="block text-sm font-medium mb-1 text-black">Contraseña</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={pass}
                onChange={(e) => setPass(e.target.value)}
                placeholder="********"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-xl 
                           focus:ring-2 focus:ring-[oklch(79.5%_0.184_86.047)] 
                           focus:border-[oklch(79.5%_0.184_86.047)] transition pr-10 bg-white text-black"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-[oklch(79.5%_0.184_86.047)] focus:outline-none"
              >
                👁️
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
        <div className="mt-6 text-center text-sm text-gray-700 space-y-2">
          <p>
            <span className="font-bold text-[oklch(79.5%_0.184_86.047)]">
              Admin demo:
            </span>{" "}
            <span className="font-medium">admin@hotel.com / 123456</span>
          </p>
          <p>
            <span className="font-bold text-[oklch(79.5%_0.184_86.047)]">
              Operador demo:
            </span>{" "}
            <span className="font-medium">operador@hotel.com / 123456</span>
          </p>
        </div>
      </div>
    </div>
  );
}