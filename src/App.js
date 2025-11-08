import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Registro from "./pages/Registro.jsx";

// === ADMIN ===
import AdminLayout from "./pages/admin/AdminLayout.jsx";
import Dashboard from "./pages/admin/Dashboard.jsx";
import CrudHabitaciones from "./pages/admin/CrudHabitaciones.jsx";
import CrudOperadores from "./pages/admin/CrudOperadores.jsx";

// === OPERADOR ===
import OperatorLayout from "./pages/operator/OperatorLayout.jsx";
import MapaHabitaciones from "./pages/operator/MapaHabitaciones.jsx";
import ProcesarPago from "./pages/operator/ProcesarPago.jsx";
import ConsultasMails from "./pages/operator/ConsultasMails.jsx";

function App() {
  return (
    <Router>
      <Routes>
        {/* === PÚBLICAS === */}
        <Route path="/" element={<Login />} />
        <Route path="/registro" element={<Registro />} />

        {/* === ADMIN === */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} /> {/* Dashboard por defecto */}
          <Route path="habitaciones" element={<CrudHabitaciones />} />
          <Route path="operadores" element={<CrudOperadores />} />
        </Route>

        {/* === OPERADOR === */}
        <Route path="/operator" element={<OperatorLayout />}>
          <Route index element={<MapaHabitaciones />} />
          <Route path="mapa" element={<MapaHabitaciones />} />
          <Route path="pagos" element={<ProcesarPago />} />
          <Route path="consultas" element={<ConsultasMails />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
