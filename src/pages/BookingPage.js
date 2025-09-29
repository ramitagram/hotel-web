// pages de reserva
import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'; //estilos
import { Helmet } from 'react-helmet';


function BookingPage(){
    //estado para fechas y los datos del formulario
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(null);
    const [guests, setGuests] = useState(1);
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!endDate) {
        alert('Por favor, selecciona una fecha de salida.');
        return;
        }
        const bookingDetails = { fullName, email, guests, startDate, endDate };
        alert(`¡Reserva confirmada! Detalles: ${JSON.stringify(bookingDetails, null, 2)}`);
    };

    return (
        <div className="container mx-auto p-4 py-12">
        <Helmet>
            <title>Realizar Reserva - Hotel Hilton</title>
        </Helmet>
        <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-lg">
            <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">Completa tu Reserva</h1>
            
            <form onSubmit={handleSubmit}>
            {/* Selector de Fechas */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                <label className="block text-gray-700 font-medium mb-2">Llegada</label>
                <DatePicker
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    selectsStart
                    startDate={startDate}
                    endDate={endDate}
                    minDate={new Date()}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    dateFormat="dd/MM/yyyy"
                />
                </div>
                <div>
                <label className="block text-gray-700 font-medium mb-2">Salida</label>
                <DatePicker
                    selected={endDate}
                    onChange={(date) => setEndDate(date)}
                    selectsEnd
                    startDate={startDate}
                    endDate={endDate}
                    minDate={startDate}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    dateFormat="dd/MM/yyyy"
                    placeholderText="Selecciona una fecha"
                />
                </div>
            </div>

            {/* Otros Campos */}
            <div className="mb-4">
                <label htmlFor="guests" className="block text-gray-700 font-medium mb-2">Huéspedes</label>
                <input type="number" id="guests" min="1" value={guests} onChange={(e) => setGuests(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg" required />
            </div>
            <div className="mb-4">
                <label htmlFor="fullName" className="block text-gray-700 font-medium mb-2">Nombre Completo</label>
                <input type="text" id="fullName" value={fullName} onChange={(e) => setFullName(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg" required />
            </div>
            <div className="mb-4">
                <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Correo Electrónico</label>
                <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg" required />
            </div>

            <div className="text-center mt-8">
                <button type="submit" className="bg-blue-600 text-white font-bold py-3 px-12 rounded-lg hover:bg-blue-700 transition duration-300">
                Confirmar Reserva
                </button>
            </div>
            </form>
        </div>
        </div>
    );
}

export default BookingPage;