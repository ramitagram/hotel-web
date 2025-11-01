import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { useState } from 'react';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { useNavigate } from 'react-router-dom';

function SearchHero() {
    const navigate = useNavigate();
    const [showCalendar, setShowCalendar] = useState(false);
    const [showGuestSelector, setShowGuestSelector] = useState(false);
    const [dates, setDates] = useState([
        {
            startDate: new Date(),
            endDate: null,
            key: 'selection'
        }
    ]);
    const [guests, setGuests] = useState({
        adults: 2,
        children: 0,
        rooms: 1,
    });

    const handleGuestChange = (type, operation) => {
        setGuests(prev => {
            const newValue = operation === 'increase' ? prev[type] + 1 : prev[type] - 1;
            // Asegura mínimos (1 adulto, 0 niños, 1 habitación)
            if (type === 'adults' && newValue < 1) return prev;
            if (type === 'children' && newValue < 0) return prev;
            if (type === 'rooms' && newValue < 1) return prev;
            return { ...prev, [type]: newValue };
        });
    };

    const handleSearch = () => {
        let finalDates = dates;
        // Si no se seleccionó fecha de salida, asigna 1 noche por defecto
        if (!dates[0].endDate) {
            const nextDay = new Date(dates[0].startDate);
            nextDay.setDate(dates[0].startDate.getDate() + 1);
            finalDates = [{ ...dates[0], endDate: nextDay }];
            // Actualiza el estado también para consistencia visual si el usuario reabre el calendario
            setDates(finalDates);
        }
        navigate('/habitaciones', { state: { dates: finalDates, guests } });
        setShowCalendar(false); // Cerramos menús al buscar
        setShowGuestSelector(false);
    };

    const guestText = `${guests.adults} Adultos, ${guests.children} Niños, ${guests.rooms} Hab.`;

    return (
        <div
            className="relative h-[70vh] bg-cover bg-center flex flex-col items-center justify-center text-white px-4"
            style={{ backgroundImage: `url('/img/hero-background.jpg')` }}>

            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            <div className="relative z-10 text-center mb-10">
                {/* Asegúrate de tener estas clases 'text-shadow-...' definidas en tu CSS global si usas Tailwind < v3 */}
                <h1 className="text-5xl md:text-6xl font-extrabold mb-4 drop-shadow-lg">Encuentre tu Estadia Perfecta</h1>
                <p className="text-xl md:text-2xl drop-shadow-md">Reserva las mejores habitaciones al mejor precio.</p>
            </div>

            <div className="relative max-w-5xl w-full">

                {/* Search Bar */}
                <div className="bg-white p-4 rounded-lg shadow-2xl flex flex-col md:flex-row items-stretch md:items-center md:space-x-2 text-gray-800">
                    <div className="flex items-center border-b md:border-b-0 md:border-r border-gray-200 px-3 py-3 md:py-2 w-full md:flex-grow-[2]">
                        <i className="fas fa-hotel text-gray-400 mr-3 text-lg"></i>
                        {/* --- MODIFICACIÓN AQUÍ --- */}
                        <input
                            type="text"
                            value="Hotel Hilton"
                            readOnly
                            className="font-semibold bg-transparent outline-none w-full font-serif text-lg" // <-- Añadido font-serif y text-lg
                        />
                    </div>
                    {/* calendario / oculta huesp. */}
                    <div className="cursor-pointer px-3 py-3 md:py-2 border-b md:border-b-0 md:border-r border-gray-200 w-full md:flex-grow text-center md:text-left" onClick={() => { setShowCalendar(!showCalendar); setShowGuestSelector(false); }}>
                        <span className="text-xs text-gray-500 font-medium uppercase tracking-wider">Entrada - Salida</span>
                        <p className="font-bold text-sm mt-1">
                            {`${format(dates[0].startDate, "dd MMM yy", { locale: es })} - ${dates[0].endDate ? format(dates[0].endDate, "dd MMM yy", { locale: es }) : 'Seleccionar'}`}
                        </p>
                    </div>

                    {/* muestra sector huespedes / oculta el calendario */}
                    <div className='cursor-pointer px-3 py-3 md:py-2 w-full md:flex-grow text-center md:text-left' onClick={() => { setShowGuestSelector(!showGuestSelector); setShowCalendar(false); }}>
                        <span className="text-xs text-gray-500 font-medium uppercase tracking-wider">Huéspedes</span>
                        <p className="font-bold text-sm mt-1">{guestText}</p>
                    </div>

                    <button onClick={handleSearch} className="bg-blue-600 text-white font-bold px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-300 w-full md:w-auto mt-3 md:mt-0 flex items-center justify-center gap-2">
                        <i className="fas fa-search"></i> Buscar
                    </button>
                </div>

                {/* Calendario flotante */}
                {showCalendar && (
                    <div className="absolute top-full mt-2 w-auto left-1/2 md:left-auto md:right-1/2 transform -translate-x-1/2 md:translate-x-0 z-20 shadow-2xl rounded-lg overflow-hidden bg-white">
                        <DateRange
                            editableDateInputs={true}
                            onChange={item => setDates([item.selection])}
                            moveRangeOnFirstSelection={false}
                            ranges={dates}
                            rangeColors={["#3b82f6"]}
                            locale={es}
                            months={2}
                            direction="horizontal"
                            minDate={new Date()}
                        />
                    </div>
                )}

                {/* Nuevo menu flotante */}
                {showGuestSelector && (
                    <div className="absolute top-full mt-2 bg-white rounded-lg shadow-2xl p-6 w-80 right-0 z-20 text-gray-800">
                        <div className="flex justify-between items-center mb-4">
                            <span className="font-semibold">Adultos</span>
                            <div className="flex items-center gap-4">
                                <button disabled={guests.adults <= 1} onClick={() => handleGuestChange('adults', 'decrease')} className="w-8 h-8 border rounded-full text-lg disabled:opacity-50 hover:bg-gray-100">-</button>
                                <span>{guests.adults}</span>
                                <button onClick={() => handleGuestChange('adults', 'increase')} className="w-8 h-8 border rounded-full text-lg hover:bg-gray-100">+</button>
                            </div>
                        </div>
                        <div className="flex justify-between items-center mb-4">
                            <span className="font-semibold">Niños</span>
                            <div className="flex items-center gap-4">
                                <button disabled={guests.children <= 0} onClick={() => handleGuestChange('children', 'decrease')} className="w-8 h-8 border rounded-full text-lg disabled:opacity-50 hover:bg-gray-100">-</button>
                                <span>{guests.children}</span>
                                <button onClick={() => handleGuestChange('children', 'increase')} className="w-8 h-8 border rounded-full text-lg hover:bg-gray-100">+</button>
                            </div>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="font-semibold">Habitaciones</span>
                            <div className="flex items-center gap-4">
                                <button disabled={guests.rooms <= 1} onClick={() => handleGuestChange('rooms', 'decrease')} className="w-8 h-8 border rounded-full text-lg disabled:opacity-50 hover:bg-gray-100">-</button>
                                <span>{guests.rooms}</span>
                                <button onClick={() => handleGuestChange('rooms', 'increase')} className="w-8 h-8 border rounded-full text-lg hover:bg-gray-100">+</button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default SearchHero;