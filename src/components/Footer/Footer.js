function Footer() {
  return (
    <footer className="bg-gray-800 text-gray-300 p-6 mt-auto">
      <div className="container mx-auto flex justify-between items-center">
        <p>&copy; 2025 Hotel Hilton. Todos los derechos reservados.</p>
        <div className="flex space-x-4">
          <a href="/" className="hover:text-white">Facebook</a>
          <a href="/" className="hover:text-white">Instagram</a>
          <a href="/" clasName="hover:text-white">X</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;