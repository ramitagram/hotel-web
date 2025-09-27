import { Helmet } from 'react-helmet';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import Hero from './components/Hero/Hero';

function App() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Helmet>
        <title>Hotel Hilton - Tu escapada de lujo</title>
        <meta name="description" content="Disfruta de una experiencia única en Hotel Hilton" />
      </Helmet>

      <Header />
      
      <main className="flex-grow">
        <Hero />
        {/* abajo iran las otras secciones de la Homepage */}
        <div className="container mx-auto p-4">
        <h2 className="text-3xl font-blod text -center my-10"> Otras secciones...</h2>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}

export default App;