// pages de detalles de habitaciones
import { useState } from 'react';
import { Helmet } from 'react-helmet';
import { useParams } from 'react-router-dom';
import RoomDetailModal from '../components/Modal/RoomDetailModal';
import TariffCard from '../components/TariffCard/TariffCard';
import { roomsData } from '../data/roomsData';

function RoomDetailPage() {
    const { id } = useParams();
    const room = roomsData.find(r => r.id === id);

    const [isModalOpen, setIsModalOpen] = useState(false);

    if (!room) {
        return <div>Habitación no encontrada.</div>;
    }

    return (
        <div className="container mx-auto p-4 py-8">
            <Helmet>
                <title>{`${room.name} - Hotel Hilton`}</title>
            </Helmet>

            <div className="lg:flex lg:gap-8">
                {/* --- Columna Principal (2/3 del ancho) --- */}
                <div className="lg:w-2/3">
                    {/* Contenedor de la Imagen Principal */}
                    <div className="mb-8">
                        <img src={room.images[0]} alt={room.name} className="w-full h-auto object-cover rounded-lg shadow-lg" />
                    </div>
                    {/* Contenedor de la Información y Tarifas */}
                    <div className="bg-white p-8 rounded-lg shadow-md">
                        <h1 className="text-3xl font-extrabold text-gray-800 mb-2">{room.name}</h1>
                        <p className="text-lg text-gray-600 mb-4">{room.description}</p>

                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="text-blue-600 hover:text-blue-800 font-semibold mb-6 text-sm">
                            Ver más detalles de la habitación →
                        </button>

                        <div className="border-t pt-6">
                            <h2 className="text-2xl font-bold mb-4">Elige tu tarifa</h2>

                            <div className="space-y-4">
                                {room.tariffs.map(tariff => (
                                    <TariffCard key={tariff.id} room={room} tariff={tariff} />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* --- Columna Lateral (Sidebar - 1/3 del ancho) --- */}
                <div className="lg:w-1/3 mt-8 lg:mt-0">
                    {/* Por ahora, es un placeholder. Más adelante aquí irá el resumen de la reserva */}
                    <div className="bg-white p-6 rounded-lg shadow-md sticky top-24">
                        <h3 className="text-xl font-bold mb-4">Detalles de tu reserva</h3>
                        <p className="text-gray-500 text-sm">
                            Cuando selecciones una tarifa, los detalles de tu reserva aparecerán aquí.
                        </p>
                    </div>
                </div>

            </div>

            {isModalOpen && (
                <RoomDetailModal
                    room={room}
                    onClose={() => setIsModalOpen(false)}
                />
            )}
        </div>
    );
}

export default RoomDetailPage;