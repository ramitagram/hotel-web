// pages de detalles de habitaciones
import { Helmet } from 'react-helmet';
import { useParams } from 'react-router-dom';
import { roomsData } from '../data/roomsData';

function RoomDetailPage() {
    //uso hook userParams para obtener el id de la habitacion desde la URL
    const { id } = useParams();
    const room = roomsData.find(r => r.id === id);

    if (!room){
        return <div>Habitacion no encontrada.</div>; 
    }

    return(
        < div className="container mx-auto p-4 py-8">
            <Helmet>
                <title>{`${room.name} - Hotel Hilton`}</title>
            </Helmet>

            <img src={room.imageUrl} alt={room.name} calssName="w-full h-96 object-cover rounded-lg mb-8"/>

            <div className="bg--white p-8 rounded-lg shadow-md">
                <h1 className="text-4xl font-extrabold text-gray-800 mb-4">{room.name}</h1>
                <p className="text-xl text-gray-600 mb-6">{room.description}</p>
                <div className="text-3xl font-blod text-blue-600">
                    {`Desde $${room.price} por noche`}
                </div>
            </div>
        </div>
    );
}

export default RoomDetailPage;