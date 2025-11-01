// pages de reserva
import { getNameList } from 'country-list'; //lista-paises
import { differenceInDays, format } from 'date-fns';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useEffect, useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css'; //estilos
import { Helmet } from 'react-helmet';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { auth } from '../firebase/config';

function BookingPage(){
    const { currentUser } = useAuth();
    const countryOptions = getNameList(); //opciones de paises
    const location = useLocation();
    const navigate = useNavigate();
    const { room, tariff } = location.state || {};  //recibimos datos

    //estado para fechas y los datos del formulario
    const [step, setStep] = useState(1); //paso 1
    const [formData, setFormData] = useState({
    //datos personales
        firstName:currentUser?.displayName?.split(' ')[0] || '', // Toma el primer nombre si existe
        lastName: currentUser?.displayName?.split(' ').slice(1).join(' ') || '', // Toma el resto como apellido
        nationality: "",
        docType: "",
        docNumber: "",
        address: "",
        country: "", // Añadido pais de residencia
        //datos de contacto
        phone: "",
        email: currentUser?.email || '',
        confirmEmail: currentUser?.email || '',
        specialRequests: "",
        //datos de pago (se mantienen para el paso 3)
        cardType: "",
        cardNumber: "",
        cardExpiry: "",
        cardCVC: ""
    });
    // eslint-disable-next-line no-unused-vars
    const [startDate, setStartDate] = useState(location.state?.dates?.[0]?.startDate || new Date());
    const [endDate, setEndDate] = useState(location.state?.dates?.[0]?.endDate || new Date(new Date().setDate(new Date().getDate() + 1)));
    const [nights, setNights] = useState(1);
    const [totalPrice, setTotalPrice] = useState(0);
    const [createAccount, setCreateAccount] = useState(false);
    const [password, setPassword] = useState('');

    //navegacion segura
    useEffect(() => {
        if(!room || !tariff){
            navigate('/habitaciones');
        }
    }, [room, tariff, navigate]);

    //calculo de precio
    useEffect(() => {
        if (startDate && endDate && tariff?.price) {
            const numberOfNights = differenceInDays(endDate, startDate);
            if (numberOfNights > 0) {
                setNights(numberOfNights);
                setTotalPrice(numberOfNights * tariff.price);
            } else {
                //Si las fechas son invalidas, reseteamos a 1 noche
                const nextDay = new Date(startDate);
                nextDay.setDate(startDate.getDate() + 1);
                setEndDate(nextDay);
                setNights(1);
                setTotalPrice(tariff.price); //por noches
            }
        }
    }, [startDate, endDate, tariff]);

    //manejo de cambios en el formulario
    const handleChange = (e)=>{
        const {name, value}=e.target;
        setFormData(prev => ({...prev,[name]:value}));
    }

    //manejo del envio del formulario
    const handleSubmit = async (e)=>{
        e.preventDefault();
        if(step === 1){
            setStep(2);
        }else if(step ===2){
            // Validación de emails
            if (formData.email !== formData.confirmEmail) {
                alert('Los correos electrónicos no coinciden.');
                return;
            }

            if (!currentUser && createAccount) {
                if (password.length < 6) {
                    alert('La contraseña debe tener al menos 6 caracteres.');
                    return;
                }
                try {
                    console.log("Creando cuenta de invitado...");
                    await createUserWithEmailAndPassword(auth, formData.email, password);
                    console.log("¡Cuenta de invitado creada con éxito!");
                } catch (err) {
                    console.error("Error al crear cuenta de invitado:", err);
                    alert('Error al crear la cuenta: ' + err.message);
                    return;
                }
            }
            setStep(3); // Si todo fue bien (o si no se creó cuenta), avanzamos al paso 3
            
        }else if(step ===3){
            console.log("Datos Finales:", { room, tariff, formData, nights, totalPrice });
            alert('Reserva enviada con éxito (simulación). Revisa la consola para ver los datos.');
        }
    };

    // Si room o tariff no existen, mostramos un mensaje para evitar errores
    if (!room || !tariff) {
        return <div>Cargando selección...</div>;
    }

    return (
        <div className="container mx-auto p-4 py-12">
            <Helmet>
                <title>Confirmar Reserva - Hotel Hilton</title>
            </Helmet>

            <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">¡Último paso! Confirme su reserva ahora</h1>

            <div className="lg:flex lg:gap-8">
                {/* --- Columna Izquierda: FORMULARIO MULTI-PASO --- */}
                <div className="lg:w-2/3 bg-white p-8 rounded-lg shadow-lg">
                {/* Datos del Titular*/}
                {step === 1 && (
                    <section>
                        <h2 className="text-2xl font-bold mb-6 border-b pb-4"><i className="fas fa-user mr-2"></i> Datos del titular de la reserva</h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
                                    <input type="text" name="firstName" id="firstName" value={formData.firstName} onChange={handleChange} required className="w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500" placeholder="Ej. Juan" />
                                </div>
                                <div>
                                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">Apellido</label>
                                    <input type="text" name="lastName" id="lastName" value={formData.lastName} onChange={handleChange} required className="w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500" placeholder="Ej. Perez" />
                                </div>
                            </div>

                            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                                <div>
                                    <label htmlFor='nationality' className='block text-sm font-medium text-gray-700 mb-1'>Nacionalidad</label>
                                    <select name='nationality' id='nationality' value={formData.nationality} onChange={handleChange} required className='w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500'>
                                        <option value="">Seleccione un país</option>
                                        {Object.entries(countryOptions).map(([code, name]) => (
                                            <option key={code} value={code}>{name}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor="docType" className="block text-sm font-medium text-gray-700 mb-1">Tipo de documento</label>
                                        <select name="docType" id="docType" value={formData.docType} onChange={handleChange} required className="w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500">
                                            <option value="">Seleccione tipo</option>
                                            <option value="DNI">DNI</option>
                                            <option value="PAS">Pasaporte</option>
                                            <option value="CUIT/CUIL">CUIT/CUIL</option>
                                        </select>
                                </div>
                            </div>
                            <div>
                                <label htmlFor="docNumber" className="block text-sm font-medium text-gray-700 mb-1">Número de documento</label>
                                <input type="text" name="docNumber" id="docNumber" value={formData.docNumber} onChange={handleChange} required className="w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500" placeholder="Ej. 12345678" />
                            </div>
                            <div>
                                <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">Domicilio (opcional)</label>
                                <input type="text" name="address" id="address" value={formData.address} onChange={handleChange} className="w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500" placeholder="Ej. Calle Falsa 123" />
                            </div>
                            <div>
                                <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">País de residencia</label>
                                <select name="country" id="country" value={formData.country} onChange={handleChange} required className="w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500">
                                    <option value="">Seleccione un país</option>
                                    {Object.entries(countryOptions).map(([code, name]) => (
                                        <option key={code} value={code}>{name}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="text-right pt-4">
                                <button type="submit" className="bg-blue-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-blue-700">
                                    Siguiente: Datos de Contacto →
                                </button>
                            </div>
                        </form>
                    </section>
                )}
                {/* Datos de Contacto*/}
                {step === 2 &&(
                    <section>
                        <h2 className="text-2xl font-bold mb-6 border-b pb-4"><i className="fas fa-phone mr-2"></i> Datos de contacto</h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            
                            <div>
                                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Teléfono</label>
                                <input type="tel" name="phone" id="phone" value={formData.phone} onChange={handleChange} required className="w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500" placeholder="Ej. +5491112345678" />
                            </div>
                        
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">E-mail</label>
                                <input type="email" name="email" id="email" value={formData.email} onChange={handleChange} required className="w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500" placeholder="ejemplo@correo.com" />
                            </div>
                            <div>
                                <label htmlFor="confirmEmail" className="block text-sm font-medium text-gray-700 mb-1">Confirme su e-mail</label>
                                <input type="email" name="confirmEmail" id="confirmEmail" value={formData.confirmEmail} onChange={handleChange} required className="w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500" placeholder="Repita su e-mail" />
                            </div>
                            <div>
                                <label htmlFor="specialRequests" className="block text-sm font-medium text-gray-700 mb-1">Solicitudes especiales (opcional)</label>
                                <textarea name="specialRequests" id="specialRequests" value={formData.specialRequests} onChange={handleChange} rows="3" className="w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500" placeholder="Ej. Cama extra, habitación cerca del ascensor..."></textarea>
                                <p className="mt-1 text-xs text-gray-500">Las solicitudes especiales están sujetas a disponibilidad y pueden implicar cargos adicionales.</p>
                            </div>
                            
                            {!currentUser && (
                                <div className="border-t pt-4 space-y-4">
                                    {/* Checkbox crear cuenta */}
                                    <div className="flex items-center">
                                        <input
                                            id="createAccount"
                                            name="createAccount"
                                            type="checkbox"
                                            checked={createAccount}
                                            onChange={(e) => setCreateAccount(e.target.checked)}
                                            className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"/>
                                        <label htmlFor="createAccount" className="ml-3 block text-sm font-medium text-gray-700">
                                            Deseo crear una cuenta con estos datos
                                        </label>
                                    </div>
                                    {/* Campo de contraseña (solo si el checkbox esta marcado) */}
                                    {createAccount && (
                                        <div className="animate-fade-in"> {/* 'animate-fade-in' necesita definirse en tailwind.config.js o CSS */}
                                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Crear una contraseña</label>
                                            <input
                                                type="password"
                                                name="password"
                                                id="password"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                required
                                                className="w-full border border-gray-300 rounded-md shadow-sm p-2"
                                                placeholder="Mínimo 6 caracteres"
                                            />
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* Botones de Navegacion */}
                            <div className="flex justify-between pt-4">
                                <button type="button" onClick={() => setStep(1)} className="text-gray-600 hover:text-gray-900 font-medium py-2 px-4 rounded-lg">
                                    ← Volver
                                </button>
                                <button type="submit" className="bg-blue-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-blue-700">
                                    Siguiente: Información de Pago →
                                </button>
                            </div>
                        </form>
                    </section>
                )}
                {/* Info de pago*/}
                {step === 3 &&(
                    <section>
                        <h2 className="text-2xl font-bold mb-6 border-b pb-4"><i className="fas fa-credit-card mr-2"></i> Información de pago</h2>
                        <form onSubmit={handleSubmit} className="space-y-6">

                            {/* --- SECCIÓN PARA MERCADO PAGO --- */}
                            <div className="bg-blue-50 border border-blue-200 p-6 rounded-md text-center">
                                <img src="/img/mercado-pago.png" alt="Mercado Pago" className="h-8 mx-auto mb-3" />
                                <p className="text-gray-700 font-medium text-lg">Paga de forma segura con Mercado Pago</p>
                                <p className="text-sm text-gray-500 mt-2">
                                    Serás redirigido a Mercado Pago para completar tu compra de forma segura.
                                    <br />(La integración real requiere backend)
                                </p>
                                {/* Aquí se montaría el componente/botón de checkout de MP */}
                                <button
                                    type="button" onClick={() => alert('Redirigiendo a Mercado Pago (Simulación)')} // Acción simulada
                                    className="mt-4 bg-sky-500 text-white font-bold py-2 px-6 rounded-lg hover:bg-sky-600 transition duration-300">
                                    Pagar con Mercado Pago
                                </button>
                            </div>

                            <div className="flex items-center justify-center">
                                <span className="bg-gray-300 h-px flex-grow"></span>
                                <span className="px-4 text-sm text-gray-500">O ingresa los datos de tu tarjeta</span>
                                <span className="bg-gray-300 h-px flex-grow"></span>
                            </div>

                            {/* --- FORMULARIO BÁSICO DE TARJETA --- */}
                            <div className="space-y-4">
                                <div>
                                    <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-1">Número de tarjeta</label>
                                    <input type="text" name="cardNumber" id="cardNumber" /* value={formData.cardNumber} onChange={handleChange} */ required className="w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500" placeholder="•••• •••• •••• ••••" />
                                </div>
                                {/* Nombre del titular */}
                                <div>
                                    <label htmlFor="cardName" className="block text-sm font-medium text-gray-700 mb-1">Nombre del titular</label>
                                    <input type="text" name="cardName" id="cardName" /* value={...} onChange={...} */ required className="w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500" placeholder="Como aparece en la tarjeta" />
                                </div>
                                {/* Vencimiento y CVC */}
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div className="md:col-span-2 grid grid-cols-2 gap-4">
                                        <div>
                                            <label htmlFor="cardExpiryMonth" className="block text-sm font-medium text-gray-700 mb-1">Mes Exp.</label>
                                            <input type="text" name="cardExpiryMonth" id="cardExpiryMonth" /* value={...} onChange={...} */ required className="w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500" placeholder="MM" maxLength="2" /> {/* maxLength ayuda */}
                                        </div>
                                        <div>
                                            <label htmlFor="cardExpiryYear" className="block text-sm font-medium text-gray-700 mb-1">Año Exp.</label>
                                            <input type="text" name="cardExpiryYear" id="cardExpiryYear" /* value={...} onChange={...} */ required className="w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500" placeholder="AA" maxLength="2" />
                                        </div>
                                    </div>
                                    <div>
                                        <label htmlFor="cardCVC" className="block text-sm font-medium text-gray-700 mb-1">CVC</label>
                                        <input type="text" name="cardCVC" id="cardCVC" /* value={...} onChange={...} */ required className="w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500" placeholder="•••" maxLength="4" />
                                    </div>
                                </div>
                            </div>
                            {/* Botones de Navegación */}
                            <div className="flex justify-between pt-6 border-t mt-8">
                                <button type="button" onClick={() => setStep(2)} className="text-gray-600 hover:text-gray-900 font-medium py-2 px-4 rounded-lg">
                                    ← Volver
                                </button>
                                <button type="submit" className="bg-green-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-green-700 text-lg"> {/* Botón más grande */}
                                    Confirmar y Pagar
                                </button>
                            </div>
                        </form>
                </section>
                )}
                </div>
                
                {/* --- Columna Derecha: Resumen (Sidebar) --- */}
                <div className="lg:w-1/3 mt-8 lg:mt-0">
                    {/*(sidebar aca) */}
                    <div className="bg-white p-6 rounded-lg shadow-lg sticky top-24">
                        <img src={room.images[0]} alt={room.name} className="w-full h-40 object-cover rounded-md mb-4" />
                        <h3 className="text-xl font-bold">{room.name}</h3>
                        <p className="text-sm text-gray-500 mb-4">{tariff.name}</p>

                        <div className="border-t pt-4 space-y-2 text-sm">
                            <div className="flex justify-between">
                                <span className="text-gray-600">Ingreso:</span>
                                <span className="font-semibold">{format(startDate, 'dd/MM/yyyy')}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Salida:</span>
                                <span className="font-semibold">{format(endDate, 'dd/MM/yyyy')}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Noches:</span>
                                <span className="font-semibold">{nights}</span>
                            </div>
                            <div className="flex justify-between mt-4 pt-4 border-t">
                                <span className="text-lg font-bold">Total:</span>
                                <span className="text-2xl font-bold text-blue-600">${totalPrice}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BookingPage;