import { GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth'; //LOGIN
import { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link, useNavigate } from 'react-router-dom';
import PasswordResetModal from '../components/Modal/PasswordReset';
import { auth } from '../firebase/config';

function LoginPage() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [showResetModal, setShowResetModal] = useState(false); // Corregido nombre de estado

    const handleEmailSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            //login firebase
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            console.log('Usuario inició sesión:', userCredential.user);
            alert('¡Inicio de sesión exitoso!');
            navigate('/'); //Redirigimos a la página de inicio
            
        } catch (err) {
            //login
            console.error("Error de login:", err.code, err.message);
            if (err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password' || err.code === 'auth/invalid-credential') {
                setError('Correo electrónico o contraseña incorrectos.');
            } else if (err.code === 'auth/invalid-email') {
                setError('El formato del correo electrónico no es válido.');
            } else {
                setError('Ocurrió un error al iniciar sesión. Inténtalo de nuevo.');
            }
        }
    };

    const handleGoogleSignIn = async () => {
        setError(''); // Limpia errores previos
        const provider = new GoogleAuthProvider();

        try {
            // signInWithPopup abre la ventana emergente de Google
            const result = await signInWithPopup(auth, provider);
            console.log('Usuario inició sesión (Google):', result.user);
            alert('¡Inicio de sesión con Google exitoso!');
            navigate('/');
        } catch (err) {
            console.error("Error de login (Google):", err.code, err.message);
            if (err.code === 'auth/popup-closed-by-user') {
                setError('Has cerrado la ventana de inicio de sesión de Google.');
            } else {
                setError('Ocurrió un error al iniciar sesión con Google. Inténtalo de nuevo.');
            }
        }
    };

    
    return (
        <div className="container mx-auto p-4 py-12 flex justify-center">
            <Helmet>
                <title>Iniciar Sesión - Hotel Hilton</title>
            </Helmet>
            <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
                <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Iniciar Sesión</h1>
                {error && <p className="bg-red-100 text-red-700 p-3 rounded-md mb-4 text-sm">{error}</p>}
                
                <form onSubmit={handleEmailSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Correo Electrónico</label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500" //inputs con styles
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
                            placeholder="Tu contraseña"
                        />
                    </div>

                    <div className="pt-2">
                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700 transition duration-300">
                            Ingresar
                        </button>
                    </div>

                    <div className="flex items-center justify-center text-right text-sm mt-2">
                        <button type="button" onClick={() => setShowResetModal(true)} className="font-medium text-blue-600 hover:text-blue-500">
                            ¿Olvidaste tu contraseña?
                        </button>
                    </div>
                </form>

                <div className="my-6 flex items-center justify-center">
                    <span className="bg-gray-300 h-px flex-grow"></span>
                    <span className="px-4 text-sm text-gray-500">O</span>
                    <span className="bg-gray-300 h-px flex-grow"></span>
                </div>
                

                <button onClick={handleGoogleSignIn} className="w-full flex items-center justify-center gap-2 border border-gray-300 text-gray-700 font-medium py-3 px-4 rounded-lg hover:bg-gray-50 transition duration-300"> {/* Corregido hover:bg-gray-50 */}
                    <img src="/img/integrations-logo-google.webp" alt="Google Logo" className="h-5 w-5"/>
                    Continuar con Google
                </button>

                <p className="text-center text-sm text-gray-600 mt-6">
                    ¿No tienes una cuenta?{' '}
                    <Link to="/registrar" className="font-medium text-blue-600 hover:text-blue-500">
                        Regístrate aquí
                    </Link>
                </p>
            </div>

            {showResetModal && <PasswordResetModal onClose={() => setShowResetModal(false)} />} 

        </div>
    );
}

export default LoginPage;