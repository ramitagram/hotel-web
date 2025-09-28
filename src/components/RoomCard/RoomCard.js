import { Link } from 'react-router-dom';

//Este componente recibe informacion de una habitacion a traves de 'props'
function RoomCard({ room }) {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300">
      <img 
        src={room.imageUrl} 
        alt={room.name}
        className="w-full h-56 object-cover"
      />
      <div className="p-6">
        <h3 className="text-2xl font-semibold mb-2 text-gray-800">{room.name}</h3>
        <p className="text-gray-600 mb-4">{room.description}</p>
        <div className="flex justify-between items-center">
          <span className="text-xl font-bold text-blue-600">{`Desde $${room.price}/noche`}</span>
          {/* Este enlace más adelante nos llevará a la página de detalle de esta habitación */}
          <Link
            to={`/habitaciones/${room.id}`}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
            Ver Detalles
          </Link>
        </div>
      </div>
    </div>
  );
}

export default RoomCard;