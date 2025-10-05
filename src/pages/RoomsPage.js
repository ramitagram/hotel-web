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
  
  //filtrado
  let displayedRooms = roomsData; //todas las habitaciones: por defecto

  if (searchData && searchData.guests){
    const totalGuests = searchData.guests.adults + searchData.guests.children;
    displayedRooms = roomsData.filter(room => room.capacity >= totalGuests);
  }


    return (
    <div className="container mx-auto p-4 py-8">
      <Helmet>
        <title>Resultados de Búsqueda - Hotel Hilton</title>
      </Helmet>
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800">Resultados de Búsqueda</h1>
        <p className="text-gray-600 mt-2">
          {displayedRooms.length} habitaciones encontradas para tu selección.
        </p>
      </div>

      {displayedRooms.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayedRooms.map(room => (
            <RoomCard key={room.id} room={room} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <h2 className="text-2xl font-bold text-gray-700">No se encontraron resultados</h2>
          <p className="text-gray-500 mt-2">Intenta modificar tu búsqueda.</p>
        </div>
      )}
    </div>
  );
}

export default RoomsPage;