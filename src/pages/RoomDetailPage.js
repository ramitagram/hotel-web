// pages de detalles de habitaciones
import { Helmet } from 'react-helmet';
import { Link, useParams } from 'react-router-dom';
import { roomsData } from '../data/roomsData';

function RoomDetailPage() {
    //uso hook userParams para obtener el id de la habitacion desde la URL
    const { id } = useParams();
    const room = roomsData.find(r => r.id === id);

    if (!room){
        return <div>Habitacion no encontrada.</div>;
    }

    return (
        <div className="container mx-auto p-4 py-8">
            <Helmet>
                <title>{`${room.name} - Hotel Hilton`}</title>
            </Helmet>

            <img src={room.imageUrl} alt={room.name} className="w-full h-96 object-cover rounded-lg shadow-lg mb-8" />

            <div className="bg-white p-8 rounded-lg shadow-md">
                <h1 className="text-4xl font-extrabold text-gray-800 mb-4">{room.name}</h1>
                <p className="text-xl text-gray-600 mb-6">{room.description}</p>

                <div className="flex justify-between items-center mt-8">
                    <span className="text-3xl font-bold text-gray-800">
                        {`Desde $${room.price} por noche`}
                    </span>
                    <Link
                        to="/reservar"
                        className="bg-blue-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-blue-700 transition duration-300"
                    >
                        Reservar Ahora
                    </Link>
                </div>
            </div>
        </div>
    );
}


export default RoomDetailPage;