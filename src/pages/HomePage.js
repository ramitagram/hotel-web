//Seccion main
import CTA from '../components/CTA/CTA';
import Features from '../components/Features/Features';
import SearchHero from '../components/SearchHero/SearchHero';

function HomePage(){
    return(
        <>
        <SearchHero />
        <Features />
        <CTA />
        </>
    );
}

export default HomePage;