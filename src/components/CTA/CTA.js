import { Link } from 'react-router-dom';

function CTA(){
    return(
        <section className='bg-gradient-to-r from-blue-800 text-white'>
            <div className='container mx-auto px-4 py-16 text-center'>
            <h2 className='text-4xl font-extrabold mb-4'>
                La Habitacion Perfecta te Espera!
            </h2>
            <p className='text-lg mb-8 max/w/2xl mx-auto'>
                Explora nuestra variedad de habitaciones diseñadas para tu maximo confort. Encuentra el espacio ideal para tu proxima visita.
            </p>
            <Link
                to='/habitaciones' //link de pag de habitaciones ...
                className="bg-white text-blue-700 font-bold py-3 px-8 rounded-lg text-lg transition duration-300 ease-in-out transform hover:bg-gray-200">
                Explorar Habitaciones
            </Link>
            </div>
        </section>
        );
}

export default CTA;