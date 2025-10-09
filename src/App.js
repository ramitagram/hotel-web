import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import AdminLayout from "./pages/admin/AdminLayout";
import OperatorLayout from "./pages/operator/OperatorLayout";
import MapaHabitaciones from "./pages/operator/MapaHabitaciones";
import Registro from "./pages/Registro"; // 👈 Asegurate que esta ruta sea correcta

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
        </Route>
      </Routes>
    </Router>
  );
}

export default App;