import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center p-4">
        <div className="text-2xl font-bold text-gray-800">
          <Link to="/">Hotel Hilton</Link> {/* cambiamos <a> por link */}
        </div>
        <nav>
          <ul className="flex space-x-6">
            <li><Link to="/" className="text-gray-600 hover:text-blue-500 font-medium">Inicio</Link></li>
            <li><Link to="/habitaciones" className="text-gray-600 hover:text-blue-500 font-medium">Habitaciones</Link></li>
            <li><Link to="/servicios" className="text-gray-600 hover:text-blue-500 font-medium">Servicios</Link></li>
            <li><Link to="/contacto" className="text-gray-600 hover:text-blue-500 font-medium">Contacto</Link></li>
            <li><Link to="/sobre-nosotros" className="text-gray-600 hover:text-blue-500 font-medium">Sobre Nosotros</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;