import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import AdminLayout from "./pages/admin/AdminLayout";
import OperatorLayout from "./pages/operator/OperatorLayout";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/admin/*" element={<AdminLayout />} />
        <Route path="/operator/*" element={<OperatorLayout />} />
      </Routes>
    </Router>
  );
}

export default App;