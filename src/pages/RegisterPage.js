import { createUserWithEmailAndPassword } from 'firebase/auth'; //Firebase
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../firebase/config'; //configuracion 'auth'

function RegisterPage() {
    const navigate = useNavigate();
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState(''); //msj de error

    const handleSubmit = async (e) =>{
        e.preventDefault();
        setError(''); //limpiar msj de error
        
        if(password !== confirmPassword){
            setError('La contraseña no coincide');
            return;
        }

        if(password.length < 6){
            setError('La contraseña debe tener al menos 6 caracteres.');
        }

        try{
            //Llamamos a Firebase para crear el user
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            console.log('Usuario registrado:', userCredential.user);
            alert('¡Registro exitoso! Ahora puedes iniciar sesión.');
            navigate('/login'); // Redirigimos al usuario a la página de Login
        
        } catch (err) {
            //Manejo Errores de Firebase
            console.error("Error de registro:", err.code, err.message);
            if (err.code === 'auth/email-already-in-use') {
                setError('El correo electrónico ya está registrado.');
            } else if (err.code === 'auth/invalid-email') {
                setError('El formato del correo electrónico no es válido.');
            } else {
                setError('Ocurrió un error durante el registro. Inténtalo de nuevo.');
            }
        }
    };

    return(
        <div className='container mx-auto p-4 py-12 flex justify-center'>
            <Helmet>
                <title>Registro - Hotel Hilton</title>
            </Helmet>
            <div className='w-full max-w-md bg-sky-200 p-8 rounded-lg shadow-lg'>
                <h1 className='text-3xl font-bold text-center text-gray-800 mb-6'>Crear Cuenta</h1>

                {error && <p className='bg=red-100 text-red-700 p-3 rounded-md mb-4 text-sm'>{error}</p>}
                <form onSubmit={handleSubmit} className='space-y-4'>
                    <div>
                        <label htmlFor='email' className='block text-sm font-medium text-gray-700 mb-1'>Correo Electrónico</label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="tu@correo.com"
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Contraseña</label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Mínimo 6 caracteres"
                        />
                    </div>
                    <div>
                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">Confirmar Contraseña</label>
                        <input
                            type="password"
                            name="confirmPassword"
                            id="confirmPassword"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                            className="w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Repite tu contraseña"
                        />
                    </div>
                    <div className="pt-2">
                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700 transition duration-300">
                            Registrarse
                        </button>
                    </div>
                </form>
                <p className="text-center text-sm text-gray-600 mt-6">
                    ¿Ya tienes una cuenta?{' '}
                    <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500">
                        Inicia sesión aquí
                    </Link>
                </p>
            </div>
        </div>
    );
}

export default RegisterPage;