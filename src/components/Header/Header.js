
function Header() {
    return (
        <header className="bg-white shadow-md sticky top-0 z-50">
            <div className='container mx-auto flex justify-between items-center p-4'>
                <div className='text-2xl font-bold text-gray-800'>
                    <a href="/">Hotel Hilton</a>
            </div>
            <nav>
                <ul className="flex space-x-6">
                    <li><a href="/" className="text-gray-600 hover:text-blue-500 front-medium">Inicio</a></li>
                    <li><a href="/habitaciones" className="text-gray-600 hover:text-blue-500 front-medium">Habitaciones</a></li>
                    <li><a href="/servicios" className="text-gray-600 hover:text-blue-500 front-medium">Servicios</a></li>
                    <li><a href="/contacto" className="text-gray-600 hover:text-blue-500 front-medium">Contacto</a></li>
                </ul>
            </nav>
            </div>
        </header>
    );
}
export default Header;
