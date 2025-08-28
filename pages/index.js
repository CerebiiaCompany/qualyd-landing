// pages/index.js (actualizado)
import Hero from '../components/Hero';
import Benefits from '../components/Benefits';
import Features from '../components/Features';
import Features2 from '../components/Features2';
import Pricing from '../components/Pricing';
import Whatsapp from '../components/Whatsapp';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <div>
      <section id="inicio">
        <Hero />
      </section>
      
      <section id="beneficios">
        <Benefits />
      </section>
      
      <section id="servicios">
        <Features />
        <Features2 />
      </section>
      
      <section id="precios">
        <Pricing />
      </section>
      
      <section id="contacto">
      <Footer />
      </section>
    </div>
  );
}
