import { Helmet } from 'react-helmet';
import RoomCard from '../components/RoomCard/RoomCard';

// Esta página mostrará una lista de habitaciones disponibles
// Datos de ejemplo. luego agregarlos mediante la BD
const roomsData = [

  {
    id: 'suite-deluxe',
    name: 'Suite Deluxe',
    description: 'Una lujosa suite con vistas panorámicas a la ciudad y todas las comodidades modernas.',
    price: 199,
    imageUrl: '/img/habitacion3.jpg' // Asegúrate de tener esta imagen en la carpeta `public/img`
  },
  {
    id: 'habitacion-doble',
    name: 'Habitación Doble',
    description: 'Espaciosa y confortable, perfecta para parejas o amigos que viajan juntos.',
    price: 129,
    imageUrl: '/img/habitacion2.jpg' // Y esta también
  },
  {
    id: 'habitacion-simple',
    name: 'Habitación Simple',
    description: 'Acogedora y funcional, ideal para viajeros solitarios que buscan confort y tranquilidad.',
    price: 89,
    imageUrl: '/img/habitacion1.jpg' // Y esta
  },
];


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