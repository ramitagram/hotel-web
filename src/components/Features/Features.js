
//iconos SVG simples para cada caracteristica
const WifiIcon = () => (
  <svg className="w-12 h-12 text-blue-600 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071a10 10 0 0114.142 0M1.394 8.536a15 15 0 0121.212 0"></path></svg>
);
const PoolIcon = () => (
  <svg className="w-12 h-12 text-blue-600 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2h1a2 2 0 002-2v-1a2 2 0 012-2h1.945M7.881 15.119A5.002 5.002 0 0012 17a5 5 0 004.119-1.881M17.881 12.119A5.002 5.002 0 0012 10a5 5 0 00-4.119 1.881"></path></svg>
);
const RestaurantIcon = () => (
  <svg className="w-12 h-12 text-blue-600 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4m16 0l-3-4m0 0l-3 4m3-4v4M6 15v4a2 2 0 002 2h1m-1-4l3-4m0 0l3 4m-3-4v4"></path></svg>
);


function Features() {
  return (
    <section className="bg-white py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800">Nuestros Servicios Principales</h2>
            <p className="text-gray-600 mt-2">Comodidades pensadas para una estadía inolvidable.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
          
          <div className="feature-item p-6">
            <WifiIcon />
            <h3 className="text-xl font-bold mt-4 mb-2">Wi-Fi de Alta Velocidad</h3>
            <p className="text-gray-600">Conexión gratuita y confiable en todas las áreas del hotel para que no te pierdas de nada.</p>
          </div>

          <div className="feature-item p-6">
            <PoolIcon />
            <h3 className="text-xl font-bold mt-4 mb-2">Piscina Climatizada</h3>
            <p className="text-gray-600">Relájate en nuestra piscina con vistas panorámicas, ideal para cualquier momento del día.</p>
          </div>

          <div className="feature-item p-6">
            <RestaurantIcon />
            <h3 className="text-xl font-bold mt-4 mb-2">Restaurante Gourmet</h3>
            <p className="text-gray-600">Una experiencia culinaria única con los mejores ingredientes de la región.</p>
          </div>

        </div>
      </div>
    </section>
  );
}

export default Features;