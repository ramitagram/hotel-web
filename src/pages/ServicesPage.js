import { Helmet } from 'react-helmet';

//Datos de ejemplo para los servicios
const servicesData = [
    { id: 1,
        title: 'Piscina y Solarium',
        description: 'Relajate en nuesta piscina climatizada con vistas paronamicas y disfruta del sol en nuestro espacioso solarium.',
        icon: 'fas fa-swimming-pool' // Usaremos Font Awesome
    },
    {
    id: 2,
    title: 'Restaurante Gourmet',
    description: 'Una experiencia culinaria inolvidable con platos regionales e internacionales preparados por nuestros chefs expertos.',
    icon: 'fas fa-utensils'
    },
    {
    id: 3,
    title: 'Wi-Fi de Alta Velocidad',
    description: 'Mantente siempre conectado con nuestro servicio de internet de alta velocidad gratuito, disponible en todas las áreas del hotel.',
    icon: 'fas fa-wifi'
    },
    {
    id: 4,
    title: 'Gimnasio Moderno',
    description: 'Nuestro gimnasio está equipado con la última tecnología para que no interrumpas tu rutina de ejercicios durante tu estadía.',
    icon: 'fas fa-dumbbell'
    },
    {
    id: 5,
    title: 'Servicio a la Habitación 24/7',
    description: 'Disfruta de nuestra deliciosa comida y bebidas en la comodidad de tu habitación, a cualquier hora del día o de la noche.',
    icon: 'fas fa-concierge-bell'
    },
    {
    id: 6,
    title: 'Estacionamiento Privado',
    description: 'Ofrecemos estacionamiento seguro y privado para todos nuestros huéspedes, para tu total tranquilidad.',
    icon: 'fas fa-car'
    }
];

function ServicesPage() {
    return(
        <div className="container mx-auto p-4 py-12">
            <Helmet>
                <title>Nuestros Servicios - Hotel Hilton</title>
            </Helmet>
        <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-800">Servicios Exclusivo</h1>
            <p className="text-gray-600 mt-2">Todo lo que necesitas para una experiencia perfecta.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {servicesData.map(service => (
                <div key={service.id} className="bg-white p-8 rounded-lg text-center transform hover:-translate-y-2 transition-transform duration 300">
                    <i className={`${service.icon} text-4xl text-blue-600 mb-4`}></i>
                    <h3 className="text-2xl font-bold text-grayh-800 mb-2">{service.title}</h3>
                    <p className="text-gray-600">{service.description}</p>
                </div>
            ))}
            </div>
            </div>
    );
}

export default ServicesPage;