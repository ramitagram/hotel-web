
// Datos de ejemplo para los testimonios
const testimonialsData = [
    {
        id: 1,
        name: 'Ana García',
        location: 'Buenos Aires, Argentina',
        // Puedes usar una imagen genérica de avatar si quieres, o dejarlo sin imagen
        // avatarUrl: '/img/avatars/ana.jpg',
        quote: '¡Una experiencia inolvidable! La atención al detalle y la amabilidad del personal hicieron nuestra estadía perfecta. Las vistas desde la habitación eran impresionantes.'
    },
    {
        id: 2,
        name: 'Carlos Fernández',
        location: 'Santiago, Chile',
        quote: 'El hotel superó nuestras expectativas. Las instalaciones son modernas, la comida deliciosa y la ubicación es inmejorable. Definitivamente volveremos.'
    },
    {
        id: 3,
        name: 'Sofia Rossi',
        location: 'São Paulo, Brasil',
        quote: 'Perfecto para un viaje de negocios. El Wi-Fi era excelente, la habitación cómoda y el servicio a la habitación rápido y eficiente. Muy recomendable.'
    }
];

function Testimonials() {
    return (
        <section className="bg-gray-100 py-16">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Lo que dicen nuestros huéspedes</h2>
                
                {/* Usamos grid para las columnas */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {testimonialsData.map(testimonial => (
                        <div key={testimonial.id} className="bg-white p-8 rounded-lg shadow-lg flex flex-col">
                            <i className="fas fa-quote-left text-blue-500 text-3xl mb-4"></i>
                            <p className="text-gray-600 italic mb-6 flex-grow">"{testimonial.quote}"</p>
                            
                            {/* Nombre y ubicación */}
                            <div className="mt-auto border-t pt-4">
                                <p className="font-bold text-gray-800">{testimonial.name}</p>
                                <p className="text-sm text-gray-500">{testimonial.location}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Testimonials;