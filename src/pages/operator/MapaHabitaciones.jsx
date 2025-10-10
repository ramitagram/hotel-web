import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./mapa.css"; // puedes crear este archivo para estilos extra

export default function MapaHabitaciones() {
  // Generar 3 pisos con 2 habitaciones cada uno
  const generarHabitaciones = () => {
    const lista = [];
    for (let piso = 1; piso <= 3; piso++) {
      for (let hab = 1; hab <= 2; hab++) {
        const num = piso * 100 + hab;
        lista.push({
          id: num,
          piso,
          estado: "libre",
          fechaInicio: null,
          fechaFin: null,
        });
      }
    }
    return lista;
  };

  // Estado con persistencia en localStorage
  const [habitaciones, setHabitaciones] = useState(() => {
    const guardado = localStorage.getItem("habitaciones");
    return guardado ? JSON.parse(guardado) : generarHabitaciones();
  });

  // Guardar cambios
  useEffect(() => {
    localStorage.setItem("habitaciones", JSON.stringify(habitaciones));
  }, [habitaciones]);

  // Cambiar estado manualmente
  const cambiarEstado = (id, nuevoEstado) => {
    setHabitaciones((prev) =>
      prev.map((hab) =>
        hab.id === id ? { ...hab, estado: nuevoEstado } : hab
      )
    );
  };

  // Asignar fechas de reserva
  const actualizarFechas = (id, campo, valor) => {
    setHabitaciones((prev) =>
      prev.map((hab) =>
        hab.id === id ? { ...hab, [campo]: valor } : hab
      )
    );
  };

  // Colores para estados
  const colores = {
    libre: "bg-green-100 border-green-400",
    ocupada: "bg-red-100 border-red-400",
    limpieza: "bg-yellow-100 border-yellow-400",
    servicio: "bg-gray-100 border-gray-400",
  };

  // Agrupar por piso
  const pisos = [1, 2, 3].map((piso) =>
    habitaciones.filter((h) => h.piso === piso)
  );

  // Función para resaltar días en el calendario
  const tileClassName = ({ date }, hab) => {
    if (hab.fechaInicio && hab.fechaFin) {
      const inicio = new Date(hab.fechaInicio);
      const fin = new Date(hab.fechaFin);
      if (date >= inicio && date <= fin) {
        return "ocupado"; // clase CSS personalizada
      }
    }
    return "libre";
  };

  return (
    <div className="p-6 bg-stone-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center text-rose-900">
        Mapa de Habitaciones
      </h1>

      {pisos.map((habitacionesPiso, i) => (
        <div key={i} className="mb-10">
          <h2 className="text-xl font-semibold mb-4 text-rose-700">
            Piso {i + 1}
          </h2>
          <div className="grid grid-cols-2 gap-6">
            {habitacionesPiso.map((hab) => (
              <div
                key={hab.id}
                className={`p-4 rounded-2xl border-2 shadow-md ${colores[hab.estado]} transition`}
              >
                <h3 className="text-lg font-bold text-gray-800 mb-2">
                  Habitación {hab.id}
                </h3>
                <p className="text-sm text-gray-600 mb-2">
                  Estado:{" "}
                  <span className="font-semibold capitalize">
                    {hab.estado}
                  </span>
                </p>

                {/* Botones de estado */}
                <div className="flex flex-wrap gap-2 mb-4">
                  <button
                    onClick={() => cambiarEstado(hab.id, "libre")}
                    className="px-3 py-1 bg-green-500 text-white rounded text-sm"
                  >
                    Liberar
                  </button>
                  <button
                    onClick={() => cambiarEstado(hab.id, "ocupada")}
                    className="px-3 py-1 bg-red-500 text-white rounded text-sm"
                  >
                    Ocupar
                  </button>
                  <button
                    onClick={() => cambiarEstado(hab.id, "limpieza")}
                    className="px-3 py-1 bg-yellow-400 text-black rounded text-sm"
                  >
                    Limpieza
                  </button>
                  <button
                    onClick={() => cambiarEstado(hab.id, "servicio")}
                    className="px-3 py-1 bg-gray-500 text-white rounded text-sm"
                  >
                    F/S
                  </button>
                </div>

                {/* Fechas */}
                <div className="flex flex-col gap-2 mb-4">
                  <label className="text-sm font-semibold text-gray-700">
                    Fecha inicio:
                    <input
                      type="date"
                      value={hab.fechaInicio || ""}
                      onChange={(e) =>
                        actualizarFechas(hab.id, "fechaInicio", e.target.value)
                      }
                      className="ml-2 border p-1 rounded"
                    />
                  </label>
                  <label className="text-sm font-semibold text-gray-700">
                    Fecha fin:
                    <input
                      type="date"
                      value={hab.fechaFin || ""}
                      onChange={(e) =>
                        actualizarFechas(hab.id, "fechaFin", e.target.value)
                      }
                      className="ml-2 border p-1 rounded"
                    />
                  </label>
                </div>

                {/* Calendario */}
                <div className="border rounded-lg overflow-hidden">
                  <Calendar
                    tileClassName={(props) => tileClassName(props, hab)}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Leyenda */}
      <div className="mt-10">
        <h2 className="font-semibold mb-2 text-rose-800">Leyenda:</h2>
        <div className="flex gap-6 text-sm">
          <span className="flex items-center gap-2">
            <div className="w-4 h-4 bg-green-400 rounded"></div> Libre
          </span>
          <span className="flex items-center gap-2">
            <div className="w-4 h-4 bg-red-400 rounded"></div> Ocupada
          </span>
          <span className="flex items-center gap-2">
            <div className="w-4 h-4 bg-yellow-300 rounded"></div> Limpieza
          </span>
          <span className="flex items-center gap-2">
            <div className="w-4 h-4 bg-gray-300 rounded"></div> Fuera de servicio
          </span>
        </div>
      </div>
    </div>
  );
}