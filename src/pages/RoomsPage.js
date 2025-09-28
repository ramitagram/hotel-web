import { Helmet } from 'react-helmet';
import RoomCard from '../components/RoomCard/RoomCard';
import { roomsData } from '../data/roomsData';

// Esta página mostrará una lista de habitaciones disponibles
// Datos de ejemplo. luego agregarlos mediante la BD

function RoomsPage() {
    return (
    <div className="container mx-auto p-4 py-8">
      <Helmet>
        <title>Nuestras Habitaciones | Hotel Hilton</title>
      </Helmet>
      <div className="text-center mb-12">
      <h1 className="text-4xl font-bold text-center text-gray-800">
        Explora Nuestras Habitaciones
      </h1>
      <p className="text-center text-gray-600 mt-2">
        Encuentra el espacio perfecto para tu estadía.
      </p>
      </div>
      {/* uso de .map para crear una tarjeta por cada habitacion*/}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap8">
        {roomsData.map(room=>(
          <RoomCard key={room.id} room={room} />
        ))}
      </div>
    </div>
  );
}

export default RoomsPage;