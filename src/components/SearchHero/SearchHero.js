import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { useState } from 'react';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css'; //estilos principales
import 'react-date-range/dist/theme/default.css'; //colores theme
import { useNavigate } from 'react-router-dom';

function SearchHero() {
    const navigate = useNavigate();
    const [showCalendar, setShowCalendar] = useState(false);
    const [showGuestSelector, setShowGuestSelector] = useState(false);
    const [dates, setDates] = useState([
        {
            startDate: new Date(),
            endDate: new Date(),
            key: 'selection'
        }
    ]);
    const [guests, setGuests] = useState({
        adults: 2,
        children: 0,
        rooms: 1,
    });

    const handleGuestChange = (type, operation) => {
        setGuests(prev => ({
            ...prev,
            [type]: operation === 'increase' ? prev[type] + 1 : prev[type] - 1,
        }));
    };

    const handleSearch = () => {
        navigate('/habitaciones', { state: { dates, guests } });
    };

    const guestText = `${guests.adults} Adultos, ${guests.children} Niños, ${guests.rooms} Hab.`;

    return (
        <div
            className="relative h-[60vh] bg-cover bg-center flex flex-col items-center justify-center text-white"
            style={{ backgroundImage: `url('/img/hero-background.jpg')` }}>

            <div className="absolute inset-0 bg-black opacity-50"></div>
            <div className="relative z-10 text-center p-4 mb-8">
                <h1 className="text-5xl font-extrabold mb-4">Encuentre tu Estadia Perfecta</h1>
                <p className="text-xl">Reserva las mejores habitaciones al mejor precio.</p>
            </div>

            <div className="relative max-w-4xl w-full">

                {/* Search Bar */}
                <div className="bg-white p-3 rounded-full shadow-lg flex items-center space-x-4 text-gray-800">
                    <input type="text" value="Hotel Hilton" readOnly className="p-2 font-semibold bg-transparent outline-none flex-grow" />

                    {/* calendario / oculta huesp. */}
                    <div className="cursor-pointer" onClick={() => { setShowCalendar(!showCalendar); setShowGuestSelector(false); }}>
                        <span className="text-gray-500">Entrada - Salida</span>
                        <p className="font-bold">
                        {`${format(dates[0].startDate, "dd/MM/yy")} - ${format(dates[0].endDate, "dd/MM/yy")}`}
                        </p>
                    </div>

                    {/* muestra sector huespedes / oculta el calendario */}
                    <div className='cursor-pointer' onClick={() => { setShowGuestSelector(!showGuestSelector); setShowCalendar(false); }}>
                        <span className="text-gray-500">Huéspedes</span>
                        <p className="font-bold">{guestText}</p>
                    </div>

                    <button onClick={handleSearch} className="bg-blue-600 text-white font-bold px-8 py-3 rounded-full hover:bg-blue-700">
                        Buscar
                    </button>
                </div>

                {/* Calendario flotante */}
                {showCalendar && (
                    <div className="absolute top-full mt-2 w-auto left-1/2 -translate-x-1/2 z-20">
                        <DateRange
                            editableDateInputs={true}
                            onChange={item => setDates([item.selection])}
                            moveRangeOnFirstSelection={false}
                            ranges={dates}
                            rangeColors={["#3b82f6"]}
                            locale={es}
                            months={2}
                            direction="horizontal"
                        />
                    </div>
                )}

                {/* Nuevo menu flotante */}

                {showGuestSelector && (
                    <div className="absolute top-full mt-2 bg-white rounded-lg shadow-lg p-6 w-80 right-0 z-20 text-gray-800">
                        <div className="flex justify-between items-center mb-4">
                            <span className="font-semibold">Adultos</span>
                            <div className="flex items-center gap-4">
                                <button disabled={guests.adults <= 1} onClick={() => handleGuestChange('adults', 'decrease')} className="w-8 h-8 border rounded-full text-lg disabled:opacity-50">-</button>
                                <span>{guests.adults}</span>
                                <button onClick={() => handleGuestChange('adults', 'increase')} className="w-8 h-8 border rounded-full text-lg">+</button>
                            </div>
                        </div>
                        <div className="flex justify-between items-center mb-4">
                            <span className="font-semibold">Niños</span>
                            <div className="flex items-center gap-4">
                                <button disabled={guests.children <= 0} onClick={() => handleGuestChange('children', 'decrease')} className="w-8 h-8 border rounded-full text-lg disabled:opacity-50">-</button>
                                <span>{guests.children}</span>
                                <button onClick={() => handleGuestChange('children', 'increase')} className="w-8 h-8 border rounded-full text-lg">+</button>
                            </div>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="font-semibold">Habitaciones</span>
                            <div className="flex items-center gap-4">
                                <button disabled={guests.rooms <= 1} onClick={() => handleGuestChange('rooms', 'decrease')} className="w-8 h-8 border rounded-full text-lg disabled:opacity-50">-</button>
                                <span>{guests.rooms}</span>
                                <button onClick={() => handleGuestChange('rooms', 'increase')} className="w-8 h-8 border rounded-full text-lg">+</button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default SearchHero;