import { Helmet } from 'react-helmet';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import BookingPage from './pages/BookingPage';
import ServicesPage from './pages/ServicesPage';

// Page Components
import ContactPage from './pages/ContactPage';
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
          <Route path="/habitaciones" element={<RoomsPage />} />
          <Route path="/habitaciones/:id" element={<RoomDetailPage />}/>
          <Route path="/reservar" element={<BookingPage />} />
          <Route path="/contacto" element={<ContactPage />} />
          <Route path="/servicios" element={<ServicesPage />} />
          {/* Rutas adicionales para futuras paginas
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