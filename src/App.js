// 1. Corregido: 'Route' ya no está duplicado.
import { Helmet } from 'react-helmet';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

// Layout Components
// 2. Corregido: Rutas apuntan al archivo JS dentro de su carpeta.
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';

// Page Components
import HomePage from './pages/HomePage';
import RoomDetailPage from './pages/RoomDetailPage';
import RoomsPage from './pages/RoomsPage';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-gray-100">
        <Helmet>
          <title>Hotel Hilton - Tu escapada de lujo</title>
          <meta name="description" content="Disfruta de una experiencia única en Hotel Hilton" />
        </Helmet>
        
        <Header />

        <main className="flex-grow">
          <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/Habitaciones" element={<RoomsPage />} />
          <Route path="/Habitaciones/:id" element={<RoomDetailPage />}/>
          {/* Rutas adicionales para futuras paginas
          <Route path="/Servicios" element={<ServicesPage />} />
          <Route path="/Reservas" element={<BookingPage />} />
          <Route path="/Contacto" element={<ContactPage />} />
          <Route path="*" element={<NotFoundPage />} />
          */}
        </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;