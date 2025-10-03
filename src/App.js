import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import AdminLayout from "./pages/admin/AdminLayout";
import OperatorLayout from "./pages/operator/OperatorLayout";
import MapaHabitaciones from "./pages/operator/MapaHabitaciones";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/admin/*" element={<AdminLayout />} />
        <Route path="/operator/*" element={<OperatorLayout />}>
          <Route path="mapa" element={<MapaHabitaciones />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;