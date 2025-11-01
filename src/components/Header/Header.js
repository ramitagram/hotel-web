import { signOut } from 'firebase/auth';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { auth } from '../../firebase/config';

function Header() {
  const { currentUser } = useAuth();
  console.log('Usuario actual en Header:', currentUser);
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setIsMenuOpen(false);
      navigate('/');
      alert('Has cerrado sesión.');
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
      alert('Error al cerrar sesión.');
    }
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center p-4">
        <div className="text-2xl font-bold text-gray-800">
            <Link to="/"><span className="font-serif">Hotel Hilton</span></Link>
        </div>
        <nav>
           {/* CORRECCIÓN: Añadido items-center para alinear verticalmente */}
          <ul className="flex items-center space-x-6">
            <li><Link to="/" className="text-gray-600 hover:text-blue-500 font-medium">Inicio</Link></li>
            <li><Link to="/habitaciones" className="text-gray-600 hover:text-blue-500 font-medium">Habitaciones</Link></li>
            <li><Link to="/servicios" className="text-gray-600 hover:text-blue-500 font-medium">Servicios</Link></li>
            <li><Link to="/contacto" className="text-gray-600 hover:text-blue-500 font-medium">Contacto</Link></li>
            <li><Link to="/sobre-nosotros" className="text-gray-600 hover:text-blue-500 font-medium">Sobre Nosotros</Link></li>
            {/* menu de user*/}
            <li className="relative">
              {currentUser?(
                <>
                  <button onClick={()=> setIsMenuOpen(!isMenuOpen)} className="flex items-center focus:outline-none"> {/* abre/cerrar menu */}
                      <div className="w-8 h-8 rounded-full bg-purple-600 text-white flex items-center justify-center font-bold text-sm mr-2">
                        {currentUser.email ? currentUser.email[0].toUpperCase() : 'U'}
                      </div>
                      <span className="text-sm font-medium text-gray-700 hidden md:block">
                        {currentUser.email}
                      </span>
                      <i className={`fas fa-chevron-down ml-1 text-xs transition-transform duration-200 ${isMenuOpen ? "rotate-180": ""}`}></i>
                    </button>
                    {/* Menu despegable*/}
                    {isMenuOpen &&(
                      <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                        <Link
                          to="/mi-cuenta"
                          onClick={() => setIsMenuOpen(false)}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                          <span> {/* Mantenemos el span */}
                            <i className="fas fa-user mr-2"></i> Mi Cuenta
                          </span>
                        </Link>
                          <button onClick={handleLogout} className="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                            <i className="fas fa-sign-out-alt mr-2"></i> Cerrar Sesión
                          </button>
                      </div>
                    )}
                </>
              ):(
                <Link to="/login" className="text-blue-600 border border-blue-600 px-4 py-2 rounded-lg font-bold hover:bg-blue-50 transition duration-300 text-sm">
                  Iniciar Sesión
                </Link>
              )}
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;