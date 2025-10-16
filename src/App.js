import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login.jsx";
import AdminLayout from "./pages/admin/AdminLayout.jsx";
import OperatorLayout from "./pages/operator/OperatorLayout.jsx";
import MapaHabitaciones from "./pages/operator/MapaHabitaciones.jsx";
import Registro from "./pages/Registro.jsx";
import ProcesarPago from "./pages/operator/ProcesarPago.jsx";
import ConsultasMails from "./pages/operator/ConsultasMails.jsx";

function App() {
  return (
    <Router>
      <Routes>
        {/* Página de Login */}
        <Route path="/" element={<Login />} />

        {/* Página de Registro */}
        <Route path="/registro" element={<Registro />} />

        {/* Panel del Administrador */}
        <Route path="/admin/*" element={<AdminLayout />} />

        {/* Panel del Operador */}
        <Route path="/operator/*" element={<OperatorLayout />}>
          <Route path="mapa" element={<MapaHabitaciones />} />
          <Route path="pagos" element={<ProcesarPago />} />
          <Route path="consultas" element={<ConsultasMails />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;