import React from "react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

export default function Dashboard() {
  // 📊 Datos simulados de ocupación (6 habitaciones)
  const habitaciones = [
    { numero: "101", estado: "Ocupada" },
    { numero: "102", estado: "Libre" },
    { numero: "103", estado: "Limpieza" },
    { numero: "104", estado: "Ocupada" },
    { numero: "105", estado: "Libre" },
    { numero: "106", estado: "Fuera de servicio" },
  ];

  // 🎯 Contar estados
  const estados = habitaciones.reduce((acc, h) => {
    acc[h.estado] = (acc[h.estado] || 0) + 1;
    return acc;
  }, {});

  const dataOcupacion = [
    { name: "Ocupadas", value: estados["Ocupada"] || 0 },
    { name: "Libres", value: estados["Libre"] || 0 },
    { name: "Limpieza", value: estados["Limpieza"] || 0 },
    { name: "Fuera de servicio", value: estados["Fuera de servicio"] || 0 },
  ];

  const COLORS = ["#2563eb", "#16a34a", "#facc15", "#9ca3af"];

  const dataIngresos = [
    { habitacion: "101", ingresos: 80000 },
    { habitacion: "102", ingresos: 40000 },
    { habitacion: "103", ingresos: 20000 },
    { habitacion: "104", ingresos: 90000 },
    { habitacion: "105", ingresos: 0 },
    { habitacion: "106", ingresos: 0 },
  ];

  const dataSemanal = [
    { dia: "Lun", ocupacion: 80 },
    { dia: "Mar", ocupacion: 70 },
    { dia: "Mié", ocupacion: 90 },
    { dia: "Jue", ocupacion: 85 },
    { dia: "Vie", ocupacion: 95 },
    { dia: "Sáb", ocupacion: 100 },
    { dia: "Dom", ocupacion: 88 },
  ];

  return (
    <div>
      {/* TARJETAS DE MÉTRICAS */}
      <div className="grid grid-cols-3 gap-6 mb-10">
        <div className="bg-white shadow-md rounded-2xl p-5 border-l-4 border-blue-600">
          <p className="text-gray-500 text-sm">Total Habitaciones</p>
          <h3 className="text-2xl font-bold text-blue-700">6</h3>
          <p className="text-xs text-gray-400 mt-1">Distribuidas en 3 pisos</p>
        </div>

        <div className="bg-white shadow-md rounded-2xl p-5 border-l-4 border-green-600">
          <p className="text-gray-500 text-sm">Ocupación Actual</p>
          <h3 className="text-2xl font-bold text-green-700">
            {((estados["Ocupada"] / 6) * 100).toFixed(0)}%
          </h3>
          <p className="text-xs text-gray-400 mt-1">Basado en habitaciones activas</p>
        </div>

        <div className="bg-white shadow-md rounded-2xl p-5 border-l-4 border-rose-600">
          <p className="text-gray-500 text-sm">Ingresos Totales</p>
          <h3 className="text-2xl font-bold text-rose-700">$230,000</h3>
          <p className="text-xs text-gray-400 mt-1">Último período</p>
        </div>
      </div>

      {/* === GRÁFICOS === */}
      <div className="grid grid-cols-2 gap-10">
        {/* Gráfico de ingresos */}
        <div className="bg-white rounded-2xl shadow-md p-6">
          <h2 className="text-lg font-semibold text-gray-700 mb-3">
            Ingresos por Habitación
          </h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={dataIngresos}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="habitacion" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="ingresos" fill="#2563eb" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Gráfico circular */}
        <div className="bg-white rounded-2xl shadow-md p-6">
          <h2 className="text-lg font-semibold text-gray-700 mb-3">
            🏨 Estado de Habitaciones
          </h2>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={dataOcupacion}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) =>
                  `${name} ${(percent * 100).toFixed(0)}%`
                }
                outerRadius={90}
                fill="#8884d8"
                dataKey="value"
              >
                {dataOcupacion.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* === Ocupación semanal === */}
      <div className="mt-10 bg-white rounded-2xl shadow-md p-6">
        <h2 className="text-lg font-semibold text-gray-700 mb-3">
          Ocupación Semanal
        </h2>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={dataSemanal}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="dia" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="ocupacion"
              stroke="#16a34a"
              strokeWidth={3}
              dot={{ r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
