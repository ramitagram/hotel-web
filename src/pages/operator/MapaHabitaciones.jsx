import React, { useState, useEffect } from "react";

export default function MapaHabitaciones() {
  // Función para generar habitaciones
  const generarHabitaciones = () => {
    let lista = [];
    for (let piso = 1; piso <= 8; piso++) {
      for (let hab = 1; hab <= 11; hab++) {
        const num = piso * 100 + hab;
        lista.push({ id: num, estado: "libre" });
      }
    }
    return lista;
  };

  // Estado inicial: intentar leer del localStorage
  const [habitaciones, setHabitaciones] = useState(() => {
    const guardado = localStorage.getItem("habitaciones");
    return guardado ? JSON.parse(guardado) : generarHabitaciones();
  });

  // Guardar cambios en localStorage cuando se actualiza el estado
  useEffect(() => {
    localStorage.setItem("habitaciones", JSON.stringify(habitaciones));
  }, [habitaciones]);

  // Colores según estado
  const colores = {
    libre: "bg-green-500",
    ocupada: "bg-red-500",
    limpieza: "bg-yellow-400",
    servicio: "bg-gray-400",
  };

  // Cambiar estado de una habitación
  const cambiarEstado = (id, nuevoEstado) => {
    setHabitaciones((prev) =>
      prev.map((hab) =>
        hab.id === id ? { ...hab, estado: nuevoEstado } : hab
      )
    );
  };

  // Agrupar habitaciones por piso
  const pisos = [];
  for (let piso = 1; piso <= 8; piso++) {
    pisos.push(habitaciones.filter((h) => Math.floor(h.id / 100) === piso));
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Mapa de Habitaciones</h1>

      {/* Render pisos */}
      {pisos.map((piso, i) => (
        <div key={i} className="mb-6">
          <h2 className="text-lg font-semibold mb-2">Piso {i + 1}</h2>
          <div className="grid grid-cols-11 gap-2">
            {piso.map((hab) => (
              <div
                key={hab.id}
                className={`p-4 rounded-lg shadow text-white font-bold text-center cursor-pointer ${colores[hab.estado]}`}
              >
                {hab.id}
                <div className="mt-2 space-x-1">
                  <button
                    onClick={() => cambiarEstado(hab.id, "libre")}
                    className="px-2 py-1 text-xs bg-green-600 rounded"
                  >
                    L
                  </button>
                  <button
                    onClick={() => cambiarEstado(hab.id, "ocupada")}
                    className="px-2 py-1 text-xs bg-red-600 rounded"
                  >
                    O
                  </button>
                  <button
                    onClick={() => cambiarEstado(hab.id, "limpieza")}
                    className="px-2 py-1 text-xs bg-yellow-500 text-black rounded"
                  >
                    Limp
                  </button>
                  <button
                    onClick={() => cambiarEstado(hab.id, "servicio")}
                    className="px-2 py-1 text-xs bg-gray-600 rounded"
                  >
                    FS
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Leyenda */}
      <div className="mt-6">
        <h2 className="font-semibold mb-2">Leyenda:</h2>
        <div className="flex gap-4">
          <span className="flex items-center gap-2">
            <div className="w-4 h-4 bg-green-500 rounded"></div> Libre
          </span>
          <span className="flex items-center gap-2">
            <div className="w-4 h-4 bg-red-500 rounded"></div> Ocupada
          </span>
          <span className="flex items-center gap-2">
            <div className="w-4 h-4 bg-yellow-400 rounded"></div> Limpieza
          </span>
          <span className="flex items-center gap-2">
            <div className="w-4 h-4 bg-gray-400 rounded"></div> Fuera de servicio
          </span>
        </div>
      </div>
    </div>
  );
}