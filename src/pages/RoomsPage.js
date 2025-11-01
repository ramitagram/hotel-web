import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useLocation } from 'react-router-dom';
import RoomCard from '../components/RoomCard/RoomCard';
import { roomsData } from '../data/roomsData';
// Esta página mostrará una lista de habitaciones disponibles
// Datos de ejemplo. luego agregarlos mediante la BD

function RoomsPage() {
  const location = useLocation();
  const searchData = location.state;
  console.log('Datos de búsqueda recibidos:', searchData);

  const [categoryFilter, setCategoryFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredRooms, setFilteredRooms] = useState(roomsData);

  const categories = ['all', ...new Set(roomsData.map(room => room.category))];

  useEffect(() => {
    let currentRooms = [...roomsData];

    if (searchData?.guests) {
      const totalGuests = searchData.guests.adults + searchData.guests.children;
      currentRooms = currentRooms.filter(room => room.capacity >= totalGuests);
    }

    if (categoryFilter !== 'all') {
      currentRooms = currentRooms.filter(room => room.category === categoryFilter);
    }

    if (searchTerm.trim() !== '') {
      currentRooms = currentRooms.filter(room =>
        room.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredRooms(currentRooms);

  }, [categoryFilter, searchTerm, searchData]);

  const handleCategoryChange = (category) => {
    setCategoryFilter(category);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className="container mx-auto p-4 py-8">
      <Helmet>
        <title>Resultados de Búsqueda - Hotel Hilton</title>
      </Helmet>

      {/* --- INICIO CORRECCIÓN: Se añade sección de filtros --- */}
      <div className="mb-8 p-6 bg-gray-100 rounded-lg shadow sticky top-[75px] z-40">
          <h2 className="text-xl font-bold mb-4 text-gray-800">Filtrar Resultados</h2>
          <div className="flex flex-col md:flex-row gap-4">
               {/* Input de búsqueda */}
              <div className="flex-grow">
                  <label htmlFor="search" className="sr-only">Buscar por nombre</label>
                  <input
                      type="text"
                      id="search"
                      placeholder="Buscar por nombre..."
                      value={searchTerm}
                      onChange={handleSearchChange}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm"
                  />
              </div>
               {/* Botones de categoría */}
              <div className="flex flex-wrap gap-2 items-center">
                  <span className='text-sm font-medium text-gray-600 mr-2'>Categoría:</span>
                  {categories.map(category => (
                      <button key={category} onClick={() => handleCategoryChange(category)}
                          className={`px-4 py-2 rounded-md text-sm font-medium transition duration-200 shadow-sm ${
                              categoryFilter === category
                              ? 'bg-blue-600 text-white ring-2 ring-blue-300'
                              : 'bg-white text-gray-700 hover:bg-gray-200 border border-gray-300'
                          }`}>
                          {category === 'all' ? 'Todas' : category}
                      </button>
                  ))}
              </div>
          </div>
      </div>
      <div className="text-center mb-12 mt-8">
        <h1 className="text-4xl font-bold text-gray-800">Resultados de Búsqueda</h1>
        <p className="text-gray-600 mt-2">
          {filteredRooms.length} {filteredRooms.length === 1 ? 'habitación encontrada' : 'habitaciones encontradas'} para tu selección.
        </p>
      </div>
      
      {filteredRooms.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredRooms.map(room => (
            <RoomCard key={room.id} room={room} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <h2 className="text-2xl font-bold text-gray-700">No se encontraron resultados</h2>
          <p className="text-gray-500 mt-2">Intenta modificar tus filtros o búsqueda.</p>
        </div>
      )}
    </div>
  );
}

export default RoomsPage;