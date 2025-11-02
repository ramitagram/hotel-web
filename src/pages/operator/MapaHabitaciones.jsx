import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./mapa.css";

/**
 * MapaHabitaciones (compacto, 5 hab en una sola fila)
 * - 5 pisos, 1 habitación por piso (101..501)
 * - Tarjetas limpias, botones claros
 * - Carrusel horizontal (no quedan una debajo de otra)
 * - Persistencia en localStorage
 */

export default function MapaHabitaciones() {
  const generarHabitaciones = () =>
    Array.from({ length: 5 }, (_, i) => {
      const piso = i + 1;
      return { id: piso * 100 + 1, piso, estado: "libre", fechaInicio: "", fechaFin: "" };
    });

  const [habitaciones, setHabitaciones] = useState(() => {
    try {
      const guardado = JSON.parse(localStorage.getItem("habitaciones") || "null");
      if (
        guardado &&
        Array.isArray(guardado) &&
        guardado.length === 5 &&
        guardado.every((h, i) => h.piso === i + 1)
      )
        return guardado;
    } catch {}
    return generarHabitaciones();
  });

  useEffect(() => {
    localStorage.setItem("habitaciones", JSON.stringify(habitaciones));
  }, [habitaciones]);

  const cambiarEstado = (id, estado) =>
    setHabitaciones((prev) => prev.map((h) => (h.id === id ? { ...h, estado } : h)));

  const actualizarFechas = (id, campo, valor) =>
    setHabitaciones((prev) => prev.map((h) => (h.id === id ? { ...h, [campo]: valor } : h)));

  const colores = {
    libre: "bg-emerald-50 border-emerald-300",
    ocupada: "bg-rose-50 border-rose-300",
    limpieza: "bg-amber-50 border-amber-300",
    servicio: "bg-slate-50 border-slate-300",
  };

  const tileClassName = ({ date }, hab) => {
    if (hab.fechaInicio && hab.fechaFin) {
      const ini = new Date(hab.fechaInicio);
      const fin = new Date(hab.fechaFin);
      if (date >= ini && date <= fin) return "tile-ocupado";
    }
    return undefined;
  };

  return (
    <div className="min-h-screen bg-white">
      <header className="px-4 sm:px-6 py-4 border-b border-slate-200">
        <h1 className="text-2xl font-bold text-slate-900">Mapa de Habitaciones</h1>
      </header>

      {/* Carrusel horizontal */}
      <div className="px-4 sm:px-6 py-6">
        <div className="overflow-x-auto">
          <div className="inline-flex gap-4 md:gap-6 pb-2 min-w-full">
            {habitaciones.map((hab) => (
              <div
                key={hab.id}
                className={`w-[320px] shrink-0 border-2 rounded-2xl p-4 shadow-sm ${colores[hab.estado]}`}
              >
                <div className="mb-3">
                  <div className="text-xs text-slate-500">Piso {hab.piso}</div>
                  <h3 className="text-lg font-semibold text-slate-900">Habitación {hab.id}</h3>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  <EstadoBtn onClick={() => cambiarEstado(hab.id, "libre")} label="Libre" className="bg-emerald-600 hover:bg-emerald-700 text-white" />
                  <EstadoBtn onClick={() => cambiarEstado(hab.id, "ocupada")} label="Ocupar" className="bg-rose-600 hover:bg-rose-700 text-white" />
                  <EstadoBtn onClick={() => cambiarEstado(hab.id, "limpieza")} label="Limpieza" className="bg-amber-400 hover:bg-amber-500 text-amber-900" />
                  <EstadoBtn onClick={() => cambiarEstado(hab.id, "servicio")} label="F/S" className="bg-slate-600 hover:bg-slate-700 text-white" />
                </div>

                <div className="grid grid-cols-2 gap-3 mb-4">
                  <DateField
                    label="Inicio"
                    value={hab.fechaInicio}
                    onChange={(v) => actualizarFechas(hab.id, "fechaInicio", v)}
                  />
                  <DateField
                    label="Fin"
                    value={hab.fechaFin}
                    onChange={(v) => actualizarFechas(hab.id, "fechaFin", v)}
                  />
                </div>

                <div className="border rounded-xl overflow-hidden bg-white">
                  <Calendar tileClassName={(props) => tileClassName(props, hab)} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Leyenda compacta */}
        <div className="mt-6 flex flex-wrap gap-4 text-sm">
          <LegendDot color="bg-emerald-500" text="Libre" />
          <LegendDot color="bg-rose-500" text="Ocupada" />
          <LegendDot color="bg-amber-500" text="Limpieza" />
          <LegendDot color="bg-slate-500" text="F/S" />
        </div>
      </div>

      {/* Estilo mínimo para resaltar días reservados */}
      <style>{`
        .tile-ocupado { background: rgba(16,185,129,0.15) !important; position: relative; }
        .tile-ocupado::after { content:''; position:absolute; inset:0; outline:2px solid rgba(16,185,129,0.35); outline-offset:-2px; border-radius:6px; }
      `}</style>
    </div>
  );
}

function EstadoBtn({ onClick, label, className = "" }) {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-1.5 text-xs rounded-xl active:scale-[0.98] transition ${className}`}
    >
      {label}
    </button>
  );
}

function DateField({ label, value, onChange }) {
  return (
    <label className="text-sm text-slate-700 flex flex-col">
      {label}
      <input
        type="date"
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1 border rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white"
      />
    </label>
  );
}

function LegendDot({ color, text }) {
  return (
    <span className="inline-flex items-center gap-2">
      <span className={`w-3 h-3 rounded-full ${color}`} />
      <span className="text-slate-600">{text}</span>
    </span>
  );
}